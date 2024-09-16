import AsyncStorage from "@react-native-async-storage/async-storage"
let useDeleteFav=async(audioFileId)=>{
   let result=await AsyncStorage.getItem("favArray")
   let arrayOfFavAudioId=JSON.parse(result)
   let fillterdArray=arrayOfFavAudioId.filter((id)=>id!==audioFileId)
   await AsyncStorage.removeItem("favArray")
   await AsyncStorage.setItem("favArray",JSON.stringify(fillterdArray))
   console.log("filterd in use delete fav",fillterdArray);
   
}
export default useDeleteFav;