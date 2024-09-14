import {Pressable,Text} from "react-native"
import React, { createContext, useContext, useEffect, useState } from 'react'
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
            console.log("allfiles",allAudioFilesParsed.length);
            
            setAllAudioFiles([...allAudioFilesParsed])
            
        })
      },[])

  return (
   <GloblaMusicProvider.Provider value={{allAudioFiles}} >
    <Pressable onPress={()=>getAudioFiles()}>
        <Text>Check</Text>
    </Pressable>
      {children}
   </GloblaMusicProvider.Provider>
  )
}

export default MusicProvider;