import AsyncStorage from "@react-native-async-storage/async-storage";
let useUpdateAudioQueue=async(newAudioArray)=>{
    let result=await AsyncStorage.getItem("AudioQueue")
    if(result){
        await AsyncStorage.removeItem("AudioQueue")
        await AsyncStorage.setItem("AudioQueue",JSON.stringify(newAudioArray))
        return newAudioArray
    }else{
        return newAudioArray
    }
    
   
    
}

export default useUpdateAudioQueue;