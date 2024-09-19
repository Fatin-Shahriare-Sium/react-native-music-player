import { StyleSheet, Text, View ,Image, Pressable, Dimensions,ToastAndroid} from 'react-native'
import React, { useEffect, useState,useRef } from 'react'
import musicLogo from "../assets/music.png"
import TextTicker from 'react-native-text-ticker'
import playIcon from "../assets/play-w.png"
import pauseIcon from "../assets/pause-w.png"
import loveIcon from "../assets/love.png" 
import loveRedIcon from "../assets/love-red.png" 
import * as Progress from 'react-native-progress';
import AudioPlayer from './audioPlayer'
import { useMusicProvider } from '../context/musicProvider'
import useUpdateCurrentAudioFile from '../hooks/useUpdateCurrentAudioFile'
import useStoreCurrentAudioFile from '../hooks/useStoreCurrentAudioFile'
const MiniAudioBox = () => {
  let {currentAudioFile,audioQueue,isplaying,setIsPlaying,willSuffle,isLoopSingle,isLoopingAll,handlePlayOnec,handleSuffle,soundx,handleSingleLoop,handleLoopAll,isFav,setAudioAsFav,deleteAudioAsFav}=useMusicProvider()
  let audioUri=currentAudioFile.uri
  let audioTitle=currentAudioFile.title
  let audioId=currentAudioFile.id
  let audioIndex=currentAudioFile.index
 
    let [audioCurrentStatus,setAudioCurrentStatus]=useState({currentDuration:currentAudioFile.activeDuration,totalDuration:currentAudioFile.totalDuration})
    let intervalRef=useRef(null)
    let [showModal,setShowModal]=useState(false)
    let [currentAudioQueue,setCurrentAudioQueue]=useState([...audioQueue])
    let [currentAudioObj,setCurrentAudioObj]=useState({index:audioIndex,uri:audioUri,filename:audioTitle,audioId:audioId})
    let [audioHasRecentlyFinisedCalledTimes,setAudioHasRecentlyFinishedCalledTimes]=useState(0)
    

    //hanlde audioplayer modal
     let handleModal=()=>{
      return setShowModal(!showModal)
    }
    useEffect(()=>{
      setCurrentAudioObj({index:currentAudioFile.index,uri:currentAudioFile.uri,audioId:currentAudioFile.id,filename:currentAudioFile.title})
    },[currentAudioFile])
    useEffect(()=>{
      // console.log("audio queue in miniAudioBox",audioQueue);
      setCurrentAudioQueue([...audioQueue])
    },[audioQueue])


 //PLAY next Audio
        let playNext=async()=>{
        let randomIndex=Math.floor(Math.random()*currentAudioQueue.length)
       
          let changeCurrentAudioObj=currentAudioQueue[willSuffle?randomIndex:currentAudioObj.index+1]
          console.log("changeCurrentAudioObj= in playnext func",changeCurrentAudioObj);
          let indexOfQueue=currentAudioObj.index+1;
          if(!changeCurrentAudioObj){
            changeCurrentAudioObj=currentAudioQueue[0]
            indexOfQueue=0
          }
          setCurrentAudioObj({index:indexOfQueue,uri:changeCurrentAudioObj.uri,filename:changeCurrentAudioObj.filename,audioId:changeCurrentAudioObj.id})
         //updating currentAudioFile in storage when next song play
          useStoreCurrentAudioFile({title:changeCurrentAudioObj.filename,uri:changeCurrentAudioObj.uri,id:changeCurrentAudioObj.id,index:indexOfQueue,activeDuration:0,totalDuration:0})
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
     
      setAudioHasRecentlyFinishedCalledTimes(0)
      console.log("upper code interval");
      
          if(isplaying==true){
         
                intervalRef.current=setInterval(()=>{
                  soundx.current.getStatusAsync().then((res)=>{
                    if(res.positionMillis>0 && res.positionMillis==res.durationMillis){
                       setAudioHasRecentlyFinishedCalledTimes(audioHasRecentlyFinisedCalledTimes+1)
                        setIsPlaying(false)
                      console.log(res.positionMillis,res.durationMillis);
                    }else{
                 
                        setAudioCurrentStatus({currentDuration:res.positionMillis/1000,totalDuration:res.durationMillis/1000})
                    }
            
                  })
                },100 )
           }
       
        return ()=>{clearInterval(intervalRef.current)}
      },[isplaying])

//setting which will happens (suffle,loopall,one loop) after audio has finished
    useEffect(()=>{
      console.log("audioHasRecentlyFinisedCalledTimes",audioHasRecentlyFinisedCalledTimes,isLoopingAll);
      if(audioHasRecentlyFinisedCalledTimes==1 && willSuffle==true){
        console.log("wil shuffle checking",willSuffle);
       playNext()
      }else if(audioHasRecentlyFinisedCalledTimes==1 && isLoopingAll==true){
        playNext()
      }else if(audioHasRecentlyFinisedCalledTimes==1 && willSuffle==false && isLoopingAll==false && isLoopSingle==false){
        pauseSound()
      }
    },[audioHasRecentlyFinisedCalledTimes])



    useEffect(()=>{
      console.log("currentAudioObj",currentAudioObj);
      
    },[currentAudioObj])
  

    //handle seek audio in slider
     let syncWithAudio=async (syncPosition)=>{
      console.log("syncWithAudio",(audioCurrentStatus.totalDuration*1000)*syncPosition,audioCurrentStatus.totalDuration*1000);
      if(!isplaying){
        setIsPlaying(true)
      }
  
        await soundx.current.setPositionAsync((audioCurrentStatus.totalDuration*1000)*syncPosition)
    
     }

        //play Auido
      async function playSound() {

       await soundx.current.playAsync()
       setIsPlaying(true)
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
      let indexOfQueue=currentAudioObj.index-1;
      if(!changeCurrentAudioObj){
        changeCurrentAudioObj=currentAudioQueue[0]
        indexOfQueue=0
      }
      console.log("currentAudioQueue[audioIndex+1].uri",changeCurrentAudioObj);
      setCurrentAudioObj({index:indexOfQueue,uri:changeCurrentAudioObj.uri,filename:changeCurrentAudioObj.filename,audioId:changeCurrentAudioObj.id})
      //update stirage when previous button press
      useStoreCurrentAudioFile({title:changeCurrentAudioObj.filename,uri:changeCurrentAudioObj.uri,id:changeCurrentAudioObj.id,index:indexOfQueue,activeDuration:0,totalDuration:0})
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

 

  return (
    <View style={{backgroundColor:"black",height:Dimensions.get("window").height*.1,width:Dimensions.get("window").width}}>
 <AudioPlayer  isFav={isFav} setAudioAsFav={setAudioAsFav} deleteAudioAsFav={deleteAudioAsFav} playOnceFunc={handlePlayOnec} suffleFunc={handleSuffle} loopAllFunc={handleLoopAll} singleLoopFunc={handleSingleLoop} playPreFuc={playPrevious} handleSeek={syncWithAudio} modalFuc={handleModal} isModalShow={showModal} playFuc={playSound} pauseFuc={pauseSound} audioUpdateStatus={audioCurrentStatus} playNextFunc={playNext} isPlaying={isplaying} audioTitle={currentAudioObj.filename}></AudioPlayer>
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
                <Pressable onPress={isFav==true?deleteAudioAsFav:setAudioAsFav} >
                    <Image style={{width:20,height:20}} source={isFav==true?loveRedIcon:loveIcon}/>
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