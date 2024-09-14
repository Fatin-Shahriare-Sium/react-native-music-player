import AsyncStorage from "@react-native-async-storage/async-storage";

let useAudioFav=async (audioFileId)=>{

    await AsyncStorage.setItem("fav",audioFileId)
}
export default useAudioFav;