import AsyncStorage from "@react-native-async-storage/async-storage"
let useDeleteFav=async(audioFileId)=>{
   await AsyncStorage.removeItem("fav",audioFileId)

}
export default useDeleteFav;