import AsyncStorage from "@react-native-async-storage/async-storage"
import uuid from 'react-native-uuid';
export let useCreatePlaylist=async (nameOfPlayList)=>{
    let res=await AsyncStorage.getItem("allPlaylists")
    let id=uuid.v4();

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
    console.log("useGetPlayList one",filterdArray);
    
    return filterdArray;
}   

export let useGetAllPlayLists=async ()=>{
    let result=await AsyncStorage.getItem("allPlaylists")
    console.log("useGetAllPlayLists",result);
    
    return JSON.parse(result)
}

export let useAddAudioToPlaylist=async(playlistId,audioObj)=>{
    if(audioObj==null){
        throw Error;
    }
    let result=await AsyncStorage.getItem("allPlaylists")
    let filterdArray=JSON.parse(result).filter((sig)=>sig.id==playlistId)
    let withoutFilterArray=JSON.parse(result).filter((sig)=>sig.id!==playlistId)
    filterdArray[0].audios.push(audioObj)
    withoutFilterArray.push(filterdArray[0])
    await AsyncStorage.removeItem("allPlaylists")
    await AsyncStorage.setItem("allPlaylists",JSON.stringify(withoutFilterArray))
    console.log("AddAudioToPlaylist",withoutFilterArray[2]);
}

export let useRemoveAudioFromPlaylist=async(playlistId,audioId)=>{
    let result=await AsyncStorage.getItem("allPlaylists")
    let filterdArray=JSON.parse(result).filter((sig)=>sig.id==playlistId)
    let withoutFilterArray=JSON.parse(result).filter((sig)=>sig.id!==playlistId)
    let afterRemovedArray=filterdArray[0].audios.filter((sig)=>sig.id!==audioId)
    filterdArray[0].audios=afterRemovedArray
    withoutFilterArray.push(filterdArray[0])
    await AsyncStorage.removeItem("allPlaylists")
    await AsyncStorage.setItem("allPlaylists",JSON.stringify(withoutFilterArray))
    console.log("RemoveAudioFromPlaylist",filterdArray[0]);
    
}

export let useSetPlayingPlaylistQueue=async(boolean,playlistId)=>{
    let playingPlayListDeterminer={
        isPlayingPlayList:boolean,
        playListId:playlistId
    }
    await AsyncStorage.removeItem("playListPlaying")
    await AsyncStorage.setItem("playListPlaying",JSON.stringify(playingPlayListDeterminer))
}