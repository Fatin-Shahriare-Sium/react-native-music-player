import AsyncStorage from "@react-native-async-storage/async-storage"

let useStoreCurrentAudioFile=async(currentAudioFileObj)=>{
    await AsyncStorage.removeItem("currentAudioFile");
    let parsedObj=JSON.stringify(currentAudioFileObj)
    await AsyncStorage.setItem("currentAudioFile",parsedObj)
    console.log("useStoreCurrentAudioFile",currentAudioFileObj);
    
}

export default useStoreCurrentAudioFile;