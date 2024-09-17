import AsyncStorage from "@react-native-async-storage/async-storage";
let useGetAudioQueue=async()=>{
    let result=await AsyncStorage.getItem("AudioQueue")
    if(!result){
        return [];
    }else{
        let audioQueueParsed=JSON.parse(result);
        return audioQueueParsed;
    }
}

export default useGetAudioQueue;