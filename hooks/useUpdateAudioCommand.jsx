import AsyncStorage from "@react-native-async-storage/async-storage";
let useUpdateAudioCommand=async (willShuffle,willLoopOne,willLoopAll)=>{
    let audioCommandObj={
        willShuffleAudio:willShuffle,
        willLoopOneAudio:willLoopOne,
        willLoopAllAudio:willLoopAll
    }
  let result=await  AsyncStorage.getItem("AudioCommand")
       if(result==null){
        AsyncStorage.setItem("AudioCommand",JSON.stringify(audioCommandObj))
       }else{
        AsyncStorage.mergeItem("AudioCommand",JSON.stringify(audioCommandObj))
       }
   
    console.log("useUpdateAudioCommand",audioCommandObj);
    
    
   
}

export default useUpdateAudioCommand;