import { Alert, ToastAndroid } from "react-native";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStoreCurrentAudioFile from "../hooks/useStoreCurrentAudioFile";
import useUpdateAudioCommand from "../hooks/useUpdateAudioCommand";
import useGetAudioCommand from "../hooks/useGetAudioCommand";
import useUpdateAudioQueue from "../hooks/useUpdateAudioQueue";
import useUpdateAllAudioFiles from "../hooks/useUpdateAllAudioFiles";
import useGetAudioQueue from "../hooks/useGetAudioQueue";
import {
  useGetPlayList,
  useRemoveAudioFromPlaylist,
  useSetPlayingPlaylistQueue,
} from "../hooks/usePlayList";
let GloblaMusicProvider = createContext();
export let useMusicProvider = () => useContext(GloblaMusicProvider);

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("AllAudioFiles", jsonValue);
  } catch (e) {
    // saving error
  }
};

let MusicProvider = ({ children }) => {
  let [allAudioFiles, setAllAudioFiles] = useState([]);
  let [audioQueue, setAudioQueue] = useState([]);
  let [willSuffle, setWillSuffle] = useState(false);
  let [isLoopSingle, setIsLoopSingle] = useState(false);
  let [currentAudioFile, setCurrentAudioFile] = useState({
    title: "",
    id: "",
    uri: "",
    index: "",
    activeDuration: 0,
    totalDuration: 0,
  });
  let [isLoopingAll, setIsLoopingAll] = useState(false);
  let [isPlayOnce, setIsPlayOnce] = useState(true);
  let [isFav, setIsFav] = useState(false);
  let [isPlayingPlaylist, setIsPlayingPlaylist] = useState(false);
  let [refreshLibraryPage, setRefreshLibraryPage] = useState(false);
  let [activeAudioId, setActiveAudioId] = useState("");
  const soundx = useRef(new Audio.Sound());

  let handleAudioSelect = async (audioId, audioUri, audioTitle, index) => {
    setActiveAudioId(audioId);
    setIsPlayingPlaylist(false);
    if (isPlayingPlaylist == true) {
      setAudioQueue([...allAudioFiles]);
    }
    if (soundx.current._loaded == true) {
      await soundx.current.pauseAsync();
      await soundx.current.unloadAsync();
      await soundx.current.loadAsync(
        { uri: audioUri },
        { isLooping: isLoopSingle, shouldPlay: true }
      );
    } else {
      await soundx.current.loadAsync(
        { uri: audioUri },
        { isLooping: isLoopSingle, shouldPlay: true }
      );
    }
    setIsFav(false);
    setCurrentAudioFile({
      title: audioTitle,
      uri: audioUri,
      id: audioId,
      index,
      activeDuration: 0,
      totalDuration: 0,
    });
    useStoreCurrentAudioFile({
      title: audioTitle,
      uri: audioUri,
      id: audioId,
      index,
      activeDuration: 0,
      totalDuration: 0,
    });
    AsyncStorage.removeItem("playListPlaying");
  };

  //handle audio play when user plays from playlist

  let handleAudioSelectFromPlaylist = async (
    playListAudioArray,
    playListId,
    audioId,
    audioUri,
    audioTitle,
    index
  ) => {
    setActiveAudioId(audioId);
    setIsPlayingPlaylist(true);

    if (soundx.current._loaded == true) {
      await soundx.current.pauseAsync();
      await soundx.current.unloadAsync();
      await soundx.current.loadAsync(
        { uri: audioUri },
        { isLooping: isLoopSingle, shouldPlay: true }
      );
    } else {
      await soundx.current.loadAsync(
        { uri: audioUri },
        { isLooping: isLoopSingle, shouldPlay: true }
      );
    }
    setAudioQueue(playListAudioArray);
    setIsFav(false);
    setCurrentAudioFile({
      title: audioTitle,
      uri: audioUri,
      id: audioId,
      index,
      activeDuration: 0,
      totalDuration: 0,
    });
    useStoreCurrentAudioFile({
      title: audioTitle,
      uri: audioUri,
      id: audioId,
      index,
      activeDuration: 0,
      totalDuration: 0,
    });
    useSetPlayingPlaylistQueue(true, playListId);
  };

  let getAudioFiles = async () => {
    await MediaLibrary.requestPermissionsAsync();
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.audio,
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.audio,
      first: media.totalCount,
    });

    await storeData(media.assets);
    return media.assets;
    // console.log(media.assets)
  };

  useEffect(() => {
    AsyncStorage.getItem("AllAudioFiles").then((res) => {
      if (res) {
        let allAudioFilesParsed = JSON.parse(res);
        setAllAudioFiles([...allAudioFilesParsed]);
      } else {
        getAudioFiles().then((res) => {
          setAllAudioFiles(res);
        });
      }
    });
  }, []);
  useEffect(() => {
    AsyncStorage.getItem("currentAudioFile").then((res) => {
      if (res !== null) {
        let currentAudioObjParsed = JSON.parse(res);
        setIsFav(false);
        soundx.current.loadAsync(
          { uri: currentAudioObjParsed.uri },
          {
            shouldPlay: false,
            isLooping: isLoopSingle,
            positionMillis: currentAudioObjParsed.activeDuration * 1000,
          }
        );
        setActiveAudioId(currentAudioObjParsed.id);
        setCurrentAudioFile(currentAudioObjParsed);
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("playListPlaying").then((result) => {
      if (result !== null) {
        let resultParsed = JSON.parse(result);
        if (resultParsed.isPlayingPlayList == true) {
          setIsPlayingPlaylist(true);
          useGetPlayList(resultParsed.playListId).then((res) => {
            console.log("res[0].audios", res[0].audios);

            setAudioQueue(res[0].audios);
          });
        }
      } else {
        setIsPlayingPlaylist(false);
        useGetAudioQueue().then((res) => {
          if (res.length == 0) {
            setAudioQueue([...allAudioFiles]);
          } else {
            setAudioQueue([...res]);
          }
        });
      }
    });
  }, [allAudioFiles]);

  useEffect(() => {
    useGetAudioCommand().then((res) => {
      console.log("res in MUSIC PROVIDER", res);
      if (res.willLoopAllAudio) {
        setIsLoopingAll(true);
      } else if (res.willLoopOneAudio) {
        setIsLoopSingle(true);
      } else if (res.willShuffleAudio) {
        setWillSuffle(true);
      } else {
        setIsPlayOnce(true);
      }
    });
  }, []);
  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
    });
  }, []);

  //single song loop
  let handleSingleLoop = async () => {
    setIsPlayOnce(false);
    setIsLoopingAll(false);
    setIsLoopSingle(true);
    setWillSuffle(false);
    useUpdateAudioCommand(false, true, false);
    await soundx.current.setIsLoopingAsync(true);
    ToastAndroid.show("Loop", ToastAndroid.SHORT);
  };
  //loop all audio
  let handleLoopAll = async () => {
    setIsPlayOnce(false);
    setWillSuffle(false);
    setIsLoopSingle(false);
    setIsLoopingAll(true);
    useUpdateAudioCommand(false, false, true);
    await soundx.current.setIsLoopingAsync(false);
    ToastAndroid.show("Loop All", ToastAndroid.SHORT);
  };
  //suffle all audio
  let handleSuffle = async () => {
    setIsPlayOnce(false);
    setIsLoopSingle(false);
    setIsLoopingAll(false);
    setWillSuffle(true);
    useUpdateAudioCommand(true, false, false);
    await soundx.current.setIsLoopingAsync(false);
    ToastAndroid.show("Suffle All", ToastAndroid.SHORT);
  };

  //handle play once
  let handlePlayOnec = () => {
    console.log("handlePlayOnec");

    setIsPlayOnce(true);
    setIsLoopSingle(false);
    setIsLoopingAll(false);
    setWillSuffle(false);
    useUpdateAudioCommand(false, false, false);
    ToastAndroid.show("Play Onec", ToastAndroid.SHORT);
  };

  // handleing audio to next in queue
  let handleAddAudioToImmediateNextOfTheAudioQueue = (audioIdOfNext) => {
    console.log("pressn  next play button", currentAudioFile.index);

    allAudioFiles.map((sig, index) => {
      if (sig.id == audioIdOfNext) {
        let newAudioQueue = [
          ...audioQueue.slice(0, currentAudioFile.index + 1),
          sig,
          ...audioQueue.slice(currentAudioFile.index + 1),
        ];
        console.log("newAudioQueue", newAudioQueue);
        setAudioQueue([...newAudioQueue]);
        useUpdateAudioQueue(newAudioQueue);
        handleLoopAll();
        ToastAndroid.show("This audio will play next", ToastAndroid.SHORT);
      }
    });
  };

  // handle remove audio from queue
  let removeAudioFromQueue = (audioId) => {
    let newAudioQueue = audioQueue.filter((sig) => sig.id !== audioId);
    let newAllAudioFiles = audioQueue.filter((sig) => sig.id !== audioId);
    console.log("removeAudioFromQueue", newAudioQueue);
    Alert.alert(
      "Remove",
      "This song will remove from this music app,Are you sure??",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "OK",
          onPress: () => {
            setAudioQueue([...newAudioQueue]);
            setAllAudioFiles([...newAllAudioFiles]);
            useUpdateAudioQueue([...newAudioQueue]);
            useUpdateAllAudioFiles([...newAllAudioFiles]);
            ToastAndroid.show(
              "Audio is removed from this app",
              ToastAndroid.SHORT
            );
          },
        },
      ]
    );
  };

  let handleRemoveAudioFromPlaylsit = (playListId, audioId) => {
    let newAudioQueue = audioQueue.filter((sig) => sig.id !== audioId);
    setAudioQueue([...newAudioQueue]);
    useUpdateAudioQueue([...newAudioQueue]);
    useRemoveAudioFromPlaylist(playListId, audioId);
    ToastAndroid.show(
      "Audio is removed from this playlist",
      ToastAndroid.SHORT
    );
  };
  let handleRefreshLibraryPage = () => {
    return setRefreshLibraryPage(!refreshLibraryPage);
  };
  //refresh all audioes file

  let handleRefreshAllAudiosFiles = () => {
    getAudioFiles().then((res) => {
      setAllAudioFiles(res);
    });
  };
  return (
    <GloblaMusicProvider.Provider
      value={{
        allAudioFiles,
        audioQueue,
        currentAudioFile,
        handleAudioSelect,
        handleAudioSelectFromPlaylist,
        willSuffle,
        handleSuffle,
        soundx,
        handleSingleLoop,
        isLoopingAll,
        handleLoopAll,
        handlePlayOnec,
        handleAddAudioToImmediateNextOfTheAudioQueue,
        removeAudioFromQueue,
        handleRemoveAudioFromPlaylsit,
        isPlayingPlaylist,
        activeAudioId,
        setActiveAudioId,
        refreshLibraryPage,
        handleRefreshLibraryPage,
        handleRefreshAllAudiosFiles,
      }}
    >
      {children}
    </GloblaMusicProvider.Provider>
  );
};

export default MusicProvider;
