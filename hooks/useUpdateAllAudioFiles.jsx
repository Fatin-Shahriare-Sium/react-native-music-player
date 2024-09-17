import AsyncStorage from "@react-native-async-storage/async-storage";

let useUpdateAllAudioFiles=async (updatedArrayOfAllAudioFiles)=>{
    await AsyncStorage.removeItem("AllAudioFiles")
    let result=await AsyncStorage.setItem("AllAudioFiles",JSON.stringify(updatedArrayOfAllAudioFiles))
    return updatedArrayOfAllAudioFiles;
}

export default useUpdateAllAudioFiles;