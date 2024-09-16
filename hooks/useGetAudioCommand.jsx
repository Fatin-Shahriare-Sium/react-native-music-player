import AsyncStorage from "@react-native-async-storage/async-storage";
let useGetAudioCommand=async ()=>{
    let audioCommandObj={
        willShuffleAudio:false,
        willLoopOneAudio:false,
        willLoopAllAudio:false
    }
  let result=await  AsyncStorage.getItem("AudioCommand")

  if(!result){

    console.log("return audioCommandObj");
    await AsyncStorage.setItem("AudioCommand",JSON.stringify(audioCommandObj))
    return audioCommandObj;
  }else{
    let parshedResult=JSON.parse(result)
    return parshedResult;
  }
}

export default useGetAudioCommand;