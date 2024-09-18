import AsyncStorage from "@react-native-async-storage/async-storage"

export let useCreatePlaylist=async (nameOfPlayList)=>{
    let res=await AsyncStorage.getItem("allPlaylists")
    let id=Math.floor(Math.random()*433)

    let playList={
        id,
        name:nameOfPlayList,
        audios:[]
    }
    if(!res){
   
       await AsyncStorage.setItem("allPlaylists",JSON.stringify([playList]))
       return [playList];
    }else{
        await AsyncStorage.removeItem("allPlaylists")
        let oldArray=JSON.parse(res)
        oldArray.push(playList)
        await AsyncStorage.setItem("allPlaylists",JSON.stringify(oldArray))
        console.log("new array of playlsits",oldArray);
        
        return oldArray;

    }
   
    

   
}

export let useGetPlayList=async (idOfPlaylists)=>{
    let result=await AsyncStorage.getItem("allPlaylists")
    let filterdArray=JSON.parse(result).filter((sig)=>sig.id==idOfPlaylists)
    return filterdArray;
}   

export let useGetAllPlayLists=async ()=>{
    let result=await AsyncStorage.getItem("allPlaylists")
    console.log("useGetAllPlayLists",result);
    
    return JSON.parse(result)
}

export let useAddAudioToPlaylist=async(playlistId,audioId)=>{
    let result=await AsyncStorage.getItem("allPlaylists")
    let filterdArray=JSON.parse(result).filter((sig)=>sig.id==playlistId)
    let withoutFilterArray=JSON.parse(result).filter((sig)=>sig.id!==playlistId)
    filterdArray[0].audios.push(audioId)
    withoutFilterArray.push(filterdArray)
    console.log("AddAudioToPlaylist",filterdArray);
}