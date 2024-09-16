import AsyncStorage from "@react-native-async-storage/async-storage";

let useSetAsFav=async (audioFileId)=>{
   
    let result=await AsyncStorage.getItem("favArray")
    if(!result){
        await AsyncStorage.setItem("favArray",JSON.stringify([audioFileId]))
        result [audioFileId]
    }else{
        let arrayOfFavAudioId=JSON.parse(result)
        await AsyncStorage.removeItem("favArray")
        let newArrayOfFavAudioId=await AsyncStorage.setItem("favArray",JSON.stringify([...arrayOfFavAudioId,audioFileId]))
        console.log("newArrayOfFavAudioId",newArrayOfFavAudioId);
        
        return newArrayOfFavAudioId;
    }
}
export default useSetAsFav;