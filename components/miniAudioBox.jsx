import { StyleSheet, Text, View ,Image, Pressable, Dimensions} from 'react-native'
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
const MiniAudioBox = ({audioUri,audioTitle,audioId,audioIndex}) => {
    let [audioCurrentStatus,setAudioCurrentStatus]=useState({currentDuration:0,totalDuration:0})
    let {audioQueue}=useMusicProvider()
    let [isFav,setIsFav]=useState(false)
    let [isplaying,setIsPlaying]=useState(false)
    let intervalRef=useRef(null)
    let [showModal,setShowModal]=useState(false)
    const soundx =useRef(new Audio.Sound());
    let [currentAudioQueue,setCurrentAudioQueue]=useState([...audioQueue])
    let [currentAudioObj,setCurrentAudioObj]=useState({index:audioIndex,uri:audioUri,filename:audioTitle,audioId:audioId})
       
     //hanlde audioplayer modal
     let handleModal=()=>{
      return setShowModal(!showModal)
    }
 //PLAY next Audio
        let playNext=async()=>{
        
          setIsPlaying(false)
          let changeCurrentAudioObj=currentAudioQueue[currentAudioObj.index+1]
          console.log("currentAudioQueue[audioIndex+1].uri",changeCurrentAudioObj);
          setCurrentAudioObj({index:currentAudioObj.index+1,uri:changeCurrentAudioObj.uri,filename:changeCurrentAudioObj.filename,audioId:changeCurrentAudioObj.id})
         
          if(soundx.current._loaded==true){
            await soundx.current.pauseAsync()
            await soundx.current.unloadAsync();
            await soundx.current.loadAsync({uri:changeCurrentAudioObj.uri},{shouldPlay:true,isLooping:false})
            setAudioCurrentStatus({currentDuration:0,totalDuration:0})
          }else{
            await soundx.current.loadAsync({uri: changeCurrentAudioObj.uri},{shouldPlay:true,isLooping:false})
          }
          setIsPlaying(true)
       
          
        
        }
    
    useEffect(()=>{
      //getting current duration fo music
        
          if(isplaying==true){
                intervalRef.current=setInterval(()=>{
                  soundx.current.getStatusAsync().then((res)=>{
            
                
                    if(res.isPlaying==false){
                        console.log("set audio url",res);
                       
                        return ()=>{clearInterval(intervalRef.current)}
                    }else{
                 
                        setAudioCurrentStatus({currentDuration:res.positionMillis/1000,totalDuration:res.durationMillis/1000})
                    }
            
            })
        },100 )
          }
       
        return ()=>{clearInterval(intervalRef.current)}
      },[isplaying])

      useEffect(()=>{
        Audio.setAudioModeAsync({
            staysActiveInBackground: true,
          });
        handleAudioSelect(audioId,audioUri,audioTitle,audioIndex)
    },[audioId])
    useEffect(()=>{
      console.log("currentAudioObj",currentAudioObj);
      
    },[currentAudioObj])

    //handle seek audio in slider
     let syncWithAudio=async (syncPosition)=>{
        await soundx.current.setPositionAsync(audioCurrentStatus.totalDuration*syncPosition*1000)
     }

        //play Auido
      async function playSound() {

        await Audio.requestPermissionsAsync()
        setIsPlaying(true)
       await soundx.current.playAsync()
        
       
      }
    //pause audio
      async function pauseSound() {
        setIsPlaying(false)
       await soundx.current.pauseAsync()
    
      }
    //play Audio Prevoius
    let playPrevious=async()=>{
        
      setIsPlaying(false)
      let changeCurrentAudioObj=currentAudioQueue[currentAudioObj.index-1]
      console.log("currentAudioQueue[audioIndex+1].uri",changeCurrentAudioObj);
      setCurrentAudioObj({index:currentAudioObj.index-1,uri:changeCurrentAudioObj.uri,filename:changeCurrentAudioObj.filename,audioId:changeCurrentAudioObj.id})
     
      if(soundx.current._loaded==true){
        await soundx.current.pauseAsync()
        await soundx.current.unloadAsync();
        await soundx.current.loadAsync({uri:changeCurrentAudioObj.uri},{shouldPlay:true,isLooping:false})
        setAudioCurrentStatus({currentDuration:0,totalDuration:0})
      }else{
        await soundx.current.loadAsync({uri: changeCurrentAudioObj.uri},{shouldPlay:true,isLooping:false})
      }
      setIsPlaying(true)
   
      
    
    }

    
      //handle set audio when user click audioSingelList
        let handleAudioSelect=async (audioId,audioUri,audioTitle,audioIndex)=>{
            console.log("setect audio uri",audioUri);
            console.log("soundx.current._loaded",soundx.current._loaded);
            console.log("handle set audio when user click audioSingelList",audioIndex,audioUri);
            
            setIsPlaying(false)
            
            if(soundx.current._loaded==true){
              await soundx.current.pauseAsync()
              await soundx.current.unloadAsync()
              await soundx.current.loadAsync({uri:audioUri},{isLooping:false,shouldPlay:true});
            }else{
             await soundx.current.loadAsync({uri:audioUri},{isLooping:false,shouldPlay:true});
            }
            setCurrentAudioObj({uri:audioUri,index:audioIndex,filename:audioTitle,audioId})
            setIsPlaying(true)
     }
      let handleFav=async (audioFileId)=>{
        setIsFav(true)
    
      }
      let handleRemoveFav=async (audioFileId)=>{
        setIsFav(false)
     
      }
  return (
    <View style={{backgroundColor:"black",height:Dimensions.get("window").height*.1,width:Dimensions.get("window").width}}>
 <AudioPlayer playPreFuc={playPrevious} handleSeek={syncWithAudio} modalFuc={handleModal} isModalShow={showModal} playFuc={playSound} pauseFuc={pauseSound} audioUpdateStatus={audioCurrentStatus} playNextFunc={playNext} isPlaying={isplaying} audioTitle={currentAudioObj.filename}></AudioPlayer>
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