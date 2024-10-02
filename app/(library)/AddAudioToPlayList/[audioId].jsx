import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useMusicProvider } from "../../../context/musicProvider";
import {
  useAddAudioToPlaylist,
  useGetAllPlayLists,
} from "../../../hooks/usePlayList";
import musicLogo from "../../../assets/music.png";
import backIcon from "../../../assets/back.png";
import CustomScreenTitle from "../../../components/customScreenTitle";
import EmptyComponet from "../../../components/emptyComponent";
const AddToPlayListRepo = () => {
  let { audioId } = useLocalSearchParams();
  let [allPlayLists, setAllPlaylists] = useState([]);
  let [refreshPage, setRefreshPage] = useState(false);
  let { allAudioFiles } = useMusicProvider();

  useEffect(() => {
    useGetAllPlayLists().then((res) => {
      console.log("AllPlaylists in useeefect", res);
      if (res) {
        setAllPlaylists([...res]);
      }
    });
  }, [refreshPage]);

  let handleAddAudioToPlayList = async (playListId, playListName, audioId) => {
    let filterdArray = allAudioFiles.filter((sig) => sig.id == audioId);
    let filterdArrayOfPlaylist = allPlayLists.filter(
      (sig) => sig.id == playListId
    );
    let getExsitenceArray = filterdArrayOfPlaylist[0].audios.filter(
      (sig) => sig.id == audioId
    );
    console.log("getExsitenceArray.length>", getExsitenceArray.length);

    if (getExsitenceArray.length > 0) {
      setRefreshPage(!refreshPage);
      return ToastAndroid.show(
        "This song is alraedy added",
        ToastAndroid.SHORT
      );
    } else {
      await useAddAudioToPlaylist(playListId, ...filterdArray);
      ToastAndroid.show(
        `This audio is added to ${playListName}`,
        ToastAndroid.SHORT
      );
      setRefreshPage(!refreshPage);
    }
  };
  return (
    <View style={styles.addPlayListWrapper}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => router.push("/libHome")}>
          <Image source={backIcon} />
        </TouchableOpacity>
        <CustomScreenTitle title={"Add to your playlists"} />
      </View>
      <FlatList
        data={allPlayLists}
        key={(item) => item.id}
        keyExtractor={(item) => item.id}
        renderItem={(sig) => {
          return (
            <TouchableOpacity
              style={styles.addPlaylistBtn}
              onPressOut={() => router.push("/")}
              onPress={() => {
                handleAddAudioToPlayList(sig.item.id, sig.item.name, audioId);
              }}
            >
              <Image source={musicLogo} />
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  fontWeight: "bold",
                  marginLeft: "2%",
                }}
              >
                {sig.item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={() => (
          <EmptyComponet message={"You have no playlist 😥"} />
        )}
        refreshing={allPlayLists}
      />
    </View>
  );
};

export default AddToPlayListRepo;

const styles = StyleSheet.create({
  addPlayListWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    flex: 1,
  },
  addPlaylistBtn: {
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
