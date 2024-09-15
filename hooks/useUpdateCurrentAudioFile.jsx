import AsyncStorage from "@react-native-async-storage/async-storage"

let useUpdateCurrentAudioFile=async(currentAudioFileObj)=>{
    let parsedObj=JSON.stringify(currentAudioFileObj)
    await AsyncStorage.mergeItem("currentAudioFile",parsedObj)
    console.log("useUpdateCurrentAudioFile",currentAudioFileObj);
    
}

export default useUpdateCurrentAudioFile;