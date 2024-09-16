import {Pressable,Text, ToastAndroid} from "react-native"
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import * as MediaLibrary from "expo-media-library";
import { Audio } from 'expo-av';
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStoreCurrentAudioFile from "../hooks/useStoreCurrentAudioFile";
import useUpdateAudioCommand from "../hooks/useUpdateAudioCommand";
import useGetAudioCommand from "../hooks/useGetAudioCommand";
import useSetAsFav from "../hooks/useSetAsFav";
import useDeleteFav from "../hooks/useDeleteFav";
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
    let [isLoopSingle,setIsLoopSingle]=useState(false)
    let [currentAudioFile,setCurrentAudioFile]=useState({title:"",id:"",uri:"",index:"",activeDuration:0,totalDuration:0});
    let [isLoopingAll,setIsLoopingAll]=useState(false)
    let [isPlayOnce,setIsPlayOnce]=useState(true)
    let [isFav,setIsFav]=useState(false)
    const soundx =useRef(new Audio.Sound());
    
    let handleAudioSelect=async (audioId,audioUri,audioTitle,index)=>{
      console.log("handleAudioIndex in indexjs",index);
      setIsPlaying(true)
       
      if(soundx.current._loaded==true){
        await soundx.current.pauseAsync()
        await soundx.current.unloadAsync()
        await soundx.current.loadAsync({uri:audioUri},{isLooping:isLoopSingle,shouldPlay:true});
      }else{
       await soundx.current.loadAsync({uri:audioUri},{isLooping:isLoopSingle,shouldPlay:true});
    
      }
      setIsFav(false)
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
            // console.log("allfiles",allAudioFilesParsed);
            setAllAudioFiles([...allAudioFilesParsed])
            setAudioQueue([...allAudioFilesParsed])
        })
     
      },[])
      useEffect(()=>{
        AsyncStorage.getItem("currentAudioFile").then((res)=>{
          console.log("currentAudioFile from local storage",res);
          if(res!==null){
          let currentAudioObjParsed=JSON.parse(res)
          console.log("currentAudioObjParsed",currentAudioObjParsed);
          setIsFav(false)
          soundx.current.loadAsync({uri:currentAudioObjParsed.uri},{shouldPlay:false,isLooping:isLoopSingle,positionMillis:currentAudioObjParsed.activeDuration*1000})
          setCurrentAudioFile(currentAudioObjParsed)
     
          }
          
        })
      },[])

      useEffect(()=>{
        AsyncStorage.getItem("favArray").then((res)=>{
          console.log("Fav Array in useffect to get all audio id",JSON.parse(res));
          let paredArray=JSON.parse(res)
          paredArray.map((sig)=>{
            console.log("sig",sig);
           if (sig==currentAudioFile.id) {
            console.log("matched",sig,currentAudioFile.id);
            setIsFav(true)
           }
          })
        })
      },[currentAudioFile])

      useEffect(()=>{
        useGetAudioCommand().then((res)=>{
          console.log("res in MUSIC PROVIDER",res);
          if(res.willLoopAllAudio){
            setIsLoopingAll(true)
          }else if(res.willLoopOneAudio){
              setIsLoopSingle(true)
          }else if(res.willShuffleAudio){
            setWillSuffle(true)
          }else{
            setIsPlayOnce(true)
          }
      })
      },[])
      useEffect(()=>{
        Audio.setAudioModeAsync({
            staysActiveInBackground: true,
          });

    },[])


      let handlePlayAudio=(boolean)=>{
        setIsPlaying(boolean);
      }

           //single song loop
     let handleSingleLoop=async()=>{
      setIsPlayOnce(false)
      setIsLoopingAll(false)
      setIsLoopSingle(true)
      setWillSuffle(false)
      useUpdateAudioCommand(false,true,false)
     await soundx.current.setIsLoopingAsync(true)
     ToastAndroid.show("Loop",ToastAndroid.SHORT)

     }
     //loop all audio
     let handleLoopAll=async ()=>{
      setIsPlayOnce(false)
      setWillSuffle(false)
      setIsLoopSingle(false)
      setIsLoopingAll(true)
      useUpdateAudioCommand(false,false,true)
      await soundx.current.setIsLoopingAsync(false)
      ToastAndroid.show("Loop All",ToastAndroid.SHORT)
     }
     //suffle all audio
     let handleSuffle=async ()=>{
      setIsPlayOnce(false)
      setIsLoopSingle(false)
      setIsLoopingAll(false)
      setWillSuffle(true)
      useUpdateAudioCommand(true,false,false)
      await soundx.current.setIsLoopingAsync(false)
      ToastAndroid.show("Suffle All",ToastAndroid.SHORT)
     }

//handle play once
      let handlePlayOnec=()=>{
        console.log("handlePlayOnec");
        
        setIsPlayOnce(true)
        setIsLoopSingle(false)
        setIsLoopingAll(false)
        setWillSuffle(false)
        useUpdateAudioCommand(false,false,false)
        ToastAndroid.show("Play Onec",ToastAndroid.SHORT)

      }

      //hanlde to set audio as favourite
    
      let setAudioAsFav=()=>{
        setIsFav(true)
        useSetAsFav(currentAudioFile.id)
        ToastAndroid.show("Favourite",ToastAndroid.SHORT)
      }

      let deleteAudioAsFav=()=>{
        setIsFav(false)
        useDeleteFav(currentAudioFile.id)
        ToastAndroid.show("Unfavourite",ToastAndroid.SHORT)
      }
  return (
   <GloblaMusicProvider.Provider value={{allAudioFiles,audioQueue,setAudioAsFav,deleteAudioAsFav,isFav,currentAudioFile,handleAudioSelect,isplaying,willSuffle,setIsPlaying:handlePlayAudio,handleSuffle,soundx,handleSingleLoop,isLoopingAll,handleLoopAll,handlePlayOnec}} >
    {/* <Pressable onPress={()=>getAudioFiles()}>
        <Text>Check</Text>
    </Pressable> */}
      {children}
   </GloblaMusicProvider.Provider>
  )
}

export default MusicProvider;