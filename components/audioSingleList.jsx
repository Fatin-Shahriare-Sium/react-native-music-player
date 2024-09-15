import { StyleSheet, Text, View,Image, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import musicLogo from "../assets/music.png"
import threeDotsIcon from "../assets/threeDots.png"
const AudioSingleList = ({audioTitle,audioUri,audioId,handleTitleSelect,indexOfAudioFiles}) => {
  useEffect(()=>{
console.log("indexOfAudioFiles",indexOfAudioFiles);

  },[indexOfAudioFiles])
  return (
    <View style={styles.audioSingleListWrapper}>
       
            <View>
                <Image source={musicLogo}/>
            </View>
            <View style={{width:"70%",marginLeft:"3%"}} >
               <Pressable onPress={()=>handleTitleSelect(audioId,audioUri,audioTitle,indexOfAudioFiles)}>
               <Text  numberOfLines={1} style={{color:"white"}}> {audioTitle}</Text>
               </Pressable>
            </View>
            <View style={{marginLeft:"3%"}}>
                <Image source={threeDotsIcon}/>
            </View>
   
    </View>
  )
}

export default AudioSingleList;

const styles = StyleSheet.create({
    audioSingleListWrapper:{
        width:"100%",
        backgroundColor:"black",
        color:"white",
        fontWeight:"300",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        padding:9,
    }
})
// #35555f