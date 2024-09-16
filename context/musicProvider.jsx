import {Pressable,Text} from "react-native"
import React, { createContext, useContext, useEffect, useState } from 'react'
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStoreCurrentAudioFile from "../hooks/useStoreCurrentAudioFile";
let GloblaMusicProvider=createContext();
export let useMusicProvider=()=>useContext(GloblaMusicProvider);
 
const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('AllAudioFiles', jsonValue);
    } catch (e) {
      // saving error
    }
  };

let MusicProvider=({children})=> {
    let [allAudioFiles,setAllAudioFiles]=useState([]);
    let [audioQueue,setAudioQueue]=useState([])
    let [isplaying,setIsPlaying]=useState(false)
    let [willSuffle,setWillSuffle]=useState(false)
    let [currentAudioFile,setCurrentAudioFile]=useState({title:"",id:"",uri:"",index:"",activeDuration:0,totalDuration:0});

    let handleAudioSelect=(audioId,audioUri,audioTitle,index)=>{
      console.log("handleAudioIndex in indexjs",index);
      setIsPlaying(true)
      setCurrentAudioFile({title:audioTitle,uri:audioUri,id:audioId,index,activeDuration:0,totalDuration:0})
      useStoreCurrentAudioFile({title:audioTitle,uri:audioUri,id:audioId,index,activeDuration:0,totalDuration:0})
    }

    let getAudioFiles = async () => {
        await MediaLibrary.requestPermissionsAsync()
        let media = await MediaLibrary.getAssetsAsync({
          mediaType:MediaLibrary.MediaType.audio,
         
          
        });
        media = await MediaLibrary.getAssetsAsync({
            mediaType:MediaLibrary.MediaType.audio,
            first: media.totalCount,
          })
        await storeData(media.assets);
        // console.log(media.assets)

      }

      useEffect(()=>{
      
        AsyncStorage.getItem("AllAudioFiles").then((res)=>{
            let allAudioFilesParsed=JSON.parse(res)
            console.log("allfiles",allAudioFilesParsed);
            setAllAudioFiles([...allAudioFilesParsed])
            setAudioQueue([...allAudioFilesParsed])
        })
     
      },[])
      useEffect(()=>{
        AsyncStorage.getItem("currentAudioFile").then((res)=>{
          console.log("currentAudioFile from local storage",res);
          if(res!==null){
          
            setCurrentAudioFile(JSON.parse(res))
          }
          
        })
      },[])

      let handlePlayAudio=(boolean)=>{
        setIsPlaying(boolean);
      }
      let handleSuffle=(boolean)=>{
        setWillSuffle(boolean);
      }

  return (
   <GloblaMusicProvider.Provider value={{allAudioFiles,audioQueue,currentAudioFile,handleAudioSelect,isplaying,willSuffle,setIsPlaying:handlePlayAudio,setWillSuffle:handleSuffle}} >
    {/* <Pressable onPress={()=>getAudioFiles()}>
        <Text>Check</Text>
    </Pressable> */}
      {children}
   </GloblaMusicProvider.Provider>
  )
}

export default MusicProvider;