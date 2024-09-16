import { StyleSheet, Text, View ,Image, Pressable, Dimensions,ToastAndroid} from 'react-native'
import React, { useEffect, useState,useRef } from 'react'
import musicLogo from "../assets/music.png"
import TextTicker from 'react-native-text-ticker'
import playIcon from "../assets/play-w.png"
import pauseIcon from "../assets/pause-w.png"
import loveIcon from "../assets/love.png" 
import loveRedIcon from "../assets/love-red.png" 
import * as Progress from 'react-native-progress';
import { Audio } from 'expo-av';
import AudioPlayer from './audioPlayer'
import { useMusicProvider } from '../context/musicProvider'
import useUpdateCurrentAudioFile from '../hooks/useUpdateCurrentAudioFile'
import useStoreCurrentAudioFile from '../hooks/useStoreCurrentAudioFile'
const MiniAudioBox = () => {
  let {currentAudioFile,audioQueue,isplaying,setIsPlaying,willSuffle,setWillSuffle}=useMusicProvider()
  let audioUri=currentAudioFile.uri
  let audioTitle=currentAudioFile.title
  let audioId=currentAudioFile.id
  let audioIndex=currentAudioFile.index
 
    let [audioCurrentStatus,setAudioCurrentStatus]=useState({currentDuration:currentAudioFile.activeDuration,totalDuration:0})
    let [isFav,setIsFav]=useState(false)
    let [isLoopSingle,setIsLoopSingle]=useState(false)
    let intervalRef=useRef(null)
    let [showModal,setShowModal]=useState(false)
    const soundx =useRef(new Audio.Sound());
    let [currentAudioQueue,setCurrentAudioQueue]=useState([...audioQueue])
    let [currentAudioObj,setCurrentAudioObj]=useState({index:audioIndex,uri:audioUri,filename:audioTitle,audioId:audioId})
    let [isLoopingAll,setIsLoopingAll]=useState(false)
  
    
    
    //hanlde audioplayer modal
     let handleModal=()=>{
      return setShowModal(!showModal)
    }
    useEffect(()=>{
      console.log("audio queue in miniAudioBox",audioQueue);
      setCurrentAudioQueue([...audioQueue])
    },[audioQueue])

    //update currentAudio file if it is stored
    useEffect(()=>{

    },[])
 //PLAY next Audio
        let playNext=async()=>{
        let randomIndex=Math.floor(Math.random()*currentAudioQueue.length)
       
          let changeCurrentAudioObj=currentAudioQueue[willSuffle?randomIndex:currentAudioObj.index+1]
          console.log("currentAudioQueue[audioIndex+1].uri",currentAudioQueue);
          setCurrentAudioObj({index:currentAudioObj.index+1,uri:changeCurrentAudioObj.uri,filename:changeCurrentAudioObj.filename,audioId:changeCurrentAudioObj.id})
         //updating currentAudioFile in storage when next song play
          useStoreCurrentAudioFile({title:changeCurrentAudioObj.filename,uri:changeCurrentAudioObj.uri,id:changeCurrentAudioObj.id,index:currentAudioObj.index+1,activeDuration:0,totalDuration:0})
          if(soundx.current._loaded==true){
            await soundx.current.pauseAsync()
            await soundx.current.unloadAsync();
            await soundx.current.loadAsync({uri:changeCurrentAudioObj.uri},{shouldPlay:true,isLooping:isLoopSingle})
            setAudioCurrentStatus({currentDuration:0,totalDuration:0})
          }else{
            await soundx.current.loadAsync({uri: changeCurrentAudioObj.uri},{shouldPlay:true,isLooping:isLoopSingle})
          }
          setIsPlaying(true)
          ToastAndroid.show('Next Song', ToastAndroid.SHORT);
         
        
        }

  //getting current duration fo music
    
    useEffect(()=>{
     
        
          if(isplaying==true){
                intervalRef.current=setInterval(()=>{
                  soundx.current.getStatusAsync().then((res)=>{
            
                
                    if(res.isPlaying==false){
                      console.log("shuffflw staet when res.isPLaying falsae",willSuffle);
                      if(willSuffle){
                        playNext()
                      }else{
                        setIsPlaying(false)
                      }
                     
                    }else{
                 
                        setAudioCurrentStatus({currentDuration:res.positionMillis/1000,totalDuration:res.durationMillis/1000})
                    }
            
                  })
                },100 )
           }
       
        return ()=>{clearInterval(intervalRef.current)}
      },[isplaying])


    // useEffect(()=>{
    //   if(isLoopingAll || willSuffle){
    //     console.log("wil shuffle checking",willSuffle);
    
    //    playNext()
    //   }
    // },[isplaying])

      //handle set audio when user click audioSingelList
      let handleAudioSelect=async (audioId,audioUri,audioTitle,audioIndex,activeDuration,totalDuration)=>{
        console.log("setect audio uri",audioUri);
        console.log("soundx.current._loaded",soundx.current._loaded);
        console.log("handle set audio when user click audioSingelList",audioIndex,audioUri);
        
        if(soundx.current._loaded==true){
          await soundx.current.pauseAsync()
          await soundx.current.unloadAsync()
          await soundx.current.loadAsync({uri:audioUri},{isLooping:isLoopSingle,shouldPlay:isplaying,positionMillis:activeDuration*1000});
        }else{
         await soundx.current.loadAsync({uri:audioUri},{isLooping:isLoopSingle,shouldPlay:isplaying,positionMillis:activeDuration*1000});
      
        }

        setCurrentAudioObj({uri:audioUri,index:audioIndex,filename:audioTitle,audioId})

 }

      useEffect(()=>{
        Audio.setAudioModeAsync({
            staysActiveInBackground: true,
          });
        handleAudioSelect(audioId,audioUri,audioTitle,audioIndex,currentAudioFile.activeDuration,currentAudioFile.totalDuration)
    },[currentAudioFile])
    useEffect(()=>{
      console.log("currentAudioObj",currentAudioObj);
      
    },[currentAudioObj])

    //sync the duration and seekbar when audio pasue


    //handle seek audio in slider
     let syncWithAudio=async (syncPosition)=>{
      console.log("syncWithAudio",syncPosition);
      
        await soundx.current.setPositionAsync((audioCurrentStatus.totalDuration*1000)*syncPosition)
     
     }

        //play Auido
      async function playSound() {

        await Audio.requestPermissionsAsync()
        setIsPlaying(true)
       await soundx.current.playAsync()
       ToastAndroid.show('Play Song', ToastAndroid.SHORT);
       
      }
    //pause audio
      async function pauseSound() {
        setIsPlaying(false)
       await soundx.current.pauseAsync()
       await useUpdateCurrentAudioFile({title:currentAudioObj.filename,uri:currentAudioObj.uri,id:currentAudioObj.audioId,index:currentAudioObj.index,activeDuration:audioCurrentStatus.currentDuration,totalDuration:audioCurrentStatus.totalDuration})
       ToastAndroid.show('Pause Song', ToastAndroid.SHORT);
    
      }
    //play Audio Prevoius
    let playPrevious=async()=>{
   
      let changeCurrentAudioObj=currentAudioQueue[currentAudioObj.index-1]
      console.log("currentAudioQueue[audioIndex+1].uri",changeCurrentAudioObj);
      setCurrentAudioObj({index:currentAudioObj.index-1,uri:changeCurrentAudioObj.uri,filename:changeCurrentAudioObj.filename,audioId:changeCurrentAudioObj.id})
      //update stirage when previous button press
      useStoreCurrentAudioFile({title:changeCurrentAudioObj.filename,uri:changeCurrentAudioObj.uri,id:changeCurrentAudioObj.id,index:currentAudioObj.index-1,activeDuration:0,totalDuration:0})
      if(soundx.current._loaded==true){
        await soundx.current.pauseAsync()
        await soundx.current.unloadAsync();
        await soundx.current.loadAsync({uri:changeCurrentAudioObj.uri},{shouldPlay:true,isLooping:isLoopSingle})
        setAudioCurrentStatus({currentDuration:0,totalDuration:0})
      }else{
        await soundx.current.loadAsync({uri: changeCurrentAudioObj.uri},{shouldPlay:true,isLooping:isLoopSingle})
      }
      setIsPlaying(true)
      ToastAndroid.show('Previous Song', ToastAndroid.SHORT);  
    }

    

     //single song loop
     let handleSingleLoop=async()=>{
      setIsLoopingAll(false)
      setIsLoopSingle(true)
      setWillSuffle(false)
     await soundx.current.setIsLoopingAsync(true)
     ToastAndroid.show("Loop",ToastAndroid.SHORT)
     }
     //loop all audio
     let handleLoopAll=async ()=>{
      setWillSuffle(false)
      setIsLoopSingle(false)
      setIsLoopingAll(true)
      await soundx.current.setIsLoopingAsync(false)
      ToastAndroid.show("Loop All",ToastAndroid.SHORT)
     }
     //suffle all audio
     let handleSuffle=async ()=>{
      setIsLoopSingle(false)
      setIsLoopingAll(false)
      setWillSuffle(true)
      await soundx.current.setIsLoopingAsync(false)
      ToastAndroid.show("Suffle All",ToastAndroid.SHORT)
     }
      let handleFav=async (audioFileId)=>{
        setIsFav(true)
    
      }
      let handleRemoveFav=async (audioFileId)=>{
        setIsFav(false)
     
      }
  return (
    <View style={{backgroundColor:"black",height:Dimensions.get("window").height*.1,width:Dimensions.get("window").width}}>
 <AudioPlayer suffleFunc={handleSuffle} loopAllFunc={handleLoopAll} singleLoopFunc={handleSingleLoop} playPreFuc={playPrevious} handleSeek={syncWithAudio} modalFuc={handleModal} isModalShow={showModal} playFuc={playSound} pauseFuc={pauseSound} audioUpdateStatus={audioCurrentStatus} playNextFunc={playNext} isPlaying={isplaying} audioTitle={currentAudioObj.filename}></AudioPlayer>
        <View>
       {audioCurrentStatus.currentDuration>0 &&  <Progress.Bar progress={audioCurrentStatus.currentDuration/audioCurrentStatus.totalDuration}  color={"black"} unfilledColor={"white"} width={Dimensions.get("window").width} height={1} />}
        </View>
       

        <View style={styles.miniAudioBoxContentWrapper}>
            <View style={styles.miniAudioImgWrapper}>
                <Image  source={musicLogo}/>
            </View>

            <View style={{width:"60%"}}>
                 <TextTicker
                 style={{ fontSize: 20 ,color:"white",margin:9,fontWeight:"700"}}
                loop={true}
                duration={10000}
                bounce
                onPress={handleModal}
                repeatSpacer={0}
                marqueeDelay={1000}>
                 {currentAudioObj.filename}
                 </TextTicker>

            </View>
            <View style={styles.miniAudioController} >
                <Pressable onPress={isplaying==true?pauseSound:playSound}>
                    <Image style={{width:20,height:20}} source={isplaying==true?pauseIcon:playIcon}/>
                </Pressable>
                <Pressable >
                    <Image style={{width:20,height:20}} source={loveIcon}/>
                    </Pressable>
            </View>
        </View>
    </View>
  )
}

export default MiniAudioBox;

const styles = StyleSheet.create({
    miniAudioBoxContentWrapper:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        width:"100%"
    },
    miniAudioController:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        width:"15%"
    },
    miniAudioImgWrapper:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        padding:10,
        width:"15%"
    }
})