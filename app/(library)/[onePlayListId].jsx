import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Image,
  Dimensions,
  Text,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  useAddAudioToPlaylist,
  useGetPlayList,
  useRenameThePlayList,
} from "../../hooks/usePlayList";
import AddAudioInPlaylist from "../../components/addAudioInPlaylist";
import AudioSingleList from "../../components/audioSingleList";
import { useMusicProvider } from "../../context/musicProvider";
import playlistCoverPic from "../../assets/playlist-cover.png";
import { LinearGradient } from "expo-linear-gradient";
import CustomPlayListTab from "../../components/customPlayListTab";
import { TouchableOpacity } from "react-native";
import plusIcon from "../../assets/plus.png";
const OnePlayList = () => {
  let { onePlayListId } = useLocalSearchParams();
  let {
    handleAudioSelectFromPlaylist,
    allAudioFiles,
    handleRefreshLibraryPage,
  } = useMusicProvider();
  let [singlePlayListObj, setSinglePlayListObj] = useState({
    name: "",
    id: "",
    audios: [],
  });
  let [showModal, setShowModal] = useState(false);
  let [newName, setNewName] = useState("");
  useEffect(() => {
    useGetPlayList(onePlayListId).then((result) => {
      console.log("useGetPlayList", result);
      setSinglePlayListObj(...result);
    });
  }, []);
  let needRefresh = (audioId) => {
    let filterdArray = singlePlayListObj.audios.filter(
      (sig) => sig.id !== audioId
    );
    setSinglePlayListObj({ ...singlePlayListObj, audios: filterdArray });
  };

  let handleModal = () => {
    setShowModal(!showModal);
  };
  let handleAddAudioToPlaylist = async (audioId) => {
    let filteredArray = allAudioFiles.filter((sig) => sig.id == audioId);
    let gettingSameFileArray = singlePlayListObj.audios.filter(
      (sig) => sig.id == audioId
    );
    if (gettingSameFileArray.length > 0) {
      setShowModal(!showModal);
      return ToastAndroid.show(
        "Already Added to this playlsit",
        ToastAndroid.SHORT
      );
    } else {
      setSinglePlayListObj({
        ...singlePlayListObj,
        audios: [...singlePlayListObj.audios, ...filteredArray],
      });
      console.log("handleAddAudioToPlaylist", filteredArray);
      setShowModal(!showModal);
      useAddAudioToPlaylist(onePlayListId, ...filteredArray);
    }
  };

  let renameThePlaylist = async (newNamex) => {
    await useRenameThePlayList(onePlayListId, newNamex);
    setNewName(newNamex);
    handleRefreshLibraryPage();
  };

  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <ScrollView>
        <LinearGradient
          style={styles.gradientWrapper}
          colors={["#f89ef6", "black"]}
        >
          <Image
            style={{ width: "70%", height: "70%" }}
            source={playlistCoverPic}
          />
          <Text
            style={{
              color: "white",
              fontSize: 30,
              fontWeight: 700,
              padding: 5,
              textAlign: "center",
            }}
          >
            {newName ? newName : singlePlayListObj.name}
          </Text>
        </LinearGradient>
        <View>
          <CustomPlayListTab
            playlistName={singlePlayListObj.name}
            renamePlaylistFunc={renameThePlaylist}
            playlistAudioArray={singlePlayListObj.audios}
            playlistId={onePlayListId}
          />
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1%",
          }}
        >
          <TouchableOpacity
            style={styles.libraryBtn}
            onPress={() => handleModal()}
          >
            <Image style={{ width: 20, height: 20 }} source={plusIcon} />
            <Text
              style={{
                color: "white",
                fontSize: 17,
                fontWeight: "bold",
                marginLeft: "5%",
              }}
            >
              Add Songs
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: "1%" }}>
          <FlatList
            data={singlePlayListObj.audios}
            key={(item) => item.id}
            keyExtractor={(item) => item.id}
            renderItem={(sig) => {
              return (
                <AudioSingleList
                  handleRefreshPlaylsit={needRefresh}
                  isPlayingFromPlaylist={true}
                  playListId={singlePlayListObj.id}
                  playListAudioQueue={singlePlayListObj.audios}
                  indexOfAudioFiles={sig.index}
                  audioUri={sig.item.uri}
                  audioTitle={sig.item.filename}
                  audioId={sig.item.id}
                  handleTitleSelect={handleAudioSelectFromPlaylist}
                ></AudioSingleList>
              );
            }}
            refreshing={singlePlayListObj}
          />
        </View>
      </ScrollView>
      <AddAudioInPlaylist
        handleModal={handleModal}
        isModalShow={showModal}
        handleAddAudioToPlaylist={handleAddAudioToPlaylist}
      ></AddAudioInPlaylist>
    </View>
  );
};

export default OnePlayList;

const styles = StyleSheet.create({
  gradientWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.4,
    width: Dimensions.get("window").width,
  },
  libraryBtn: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.1,
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "#222221",
    padding: 7,
    borderRadius: 9,
    margin: 3,
  },
});

//
