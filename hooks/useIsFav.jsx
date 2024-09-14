import AsyncStorage from "@react-native-async-storage/async-storage"

let useIsFav=async(audioFileId)=>{
    let res=await AsyncStorage.getItem("fav",audioFileId)
    console.log("useIsFav",res);
    
}
export default useIsFav;