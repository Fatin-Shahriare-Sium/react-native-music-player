import { StyleSheet, Text, View,Image,Pressable,TouchableOpacity } from 'react-native'
import React from 'react'
import musicLogo from "../assets/music.png"
import addLogo from "../assets/add-playlist.png"
const SingleAudioOfPlaylist = ({audioTitle,audioId,handleAddBtn}) => {
  return (
            <View style={styles.audioSingleListWrapper}>
                        
            <View>
                <Image source={musicLogo}/>
            </View>

            <View style={{width:"70%",marginLeft:"3%"}} >
            <Pressable >
            <Text  numberOfLines={1} style={{color:"white"}}>{audioTitle}</Text>
            </Pressable>
            </View>
            <View style={{marginLeft:"3%"}}>
                <TouchableOpacity onPress={()=>handleAddBtn(audioId)}>
                <Image source={addLogo}/>
                </TouchableOpacity>
            </View>
        </View>
  )
}

export default SingleAudioOfPlaylist

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