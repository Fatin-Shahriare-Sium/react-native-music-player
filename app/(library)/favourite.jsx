import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import useGetFav from "../../hooks/useGetFav";
import { useMusicProvider } from "../../context/musicProvider";
import AudioSingleList from "../../components/audioSingleList";
import { LinearGradient } from "expo-linear-gradient";
import favCoverPic from "../../assets/fav-cover.jpg";
import EmptyComponet from "../../components/emptyComponent";
const FavouritePage = () => {
  let [allFavAudioArary, setALLFavAudioArray] = useState([]);
  let { allAudioFiles, handleAudioSelect } = useMusicProvider();
  useEffect(() => {
    useGetFav().then((res) => {
      console.log("useGetFav", res);
      let x = [];
      if (res) {
        res.map((sigId) => {
          let filterdArray = allAudioFiles.filter((sig) => sig.id == sigId);
          x.push(...filterdArray);
        });
        setALLFavAudioArray(x);
      }
    });
  }, []);
  useEffect(() => {
    console.log("filterdArray in favourites page", allFavAudioArary);
  }, [allFavAudioArary]);
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <LinearGradient start={{ x: 0.2, y: 0 }} colors={["white", "black"]}>
        <View
          style={{
            height: Dimensions.get("window").height * 0.4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ resizeMode: "contain", width: "70%", height: "70%" }}
            source={favCoverPic}
          />
          <Text
            style={{
              color: "white",
              fontSize: 30,
              fontWeight: 700,
              padding: 5,
            }}
          >
            Favourite Songs
          </Text>
        </View>
      </LinearGradient>
      <View style={{ marginTop: "3%", flex: 1, backgroundColor: "black" }}>
        <ScrollView>
          <FlatList
            data={allFavAudioArary}
            key={(item) => item.id}
            keyExtractor={(item) => item.id}
            renderItem={(sig) => {
              return (
                <AudioSingleList
                  key={sig.index}
                  isPlayingFromPlaylist={false}
                  playListId={""}
                  playListAudioQueue={[]}
                  handleRefreshPlaylsit={() => {}}
                  audioTitle={sig.item.filename}
                  indexOfAudioFiles={sig.index}
                  audioId={sig.item.id}
                  audioUri={sig.item.uri}
                  handleTitleSelect={handleAudioSelect}
                ></AudioSingleList>
              );
            }}
            contentContainerStyle={{ flex: 1, backgroundColor: "black" }}
            ListEmptyComponent={() => (
              <EmptyComponet message={"You have no favourite songs 😥"} />
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default FavouritePage;

const styles = StyleSheet.create({});
