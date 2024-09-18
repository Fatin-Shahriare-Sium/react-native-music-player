import { Dimensions, StyleSheet, Text, TextInput, View,Image } from 'react-native'
import React from 'react'
import { useMusicProvider } from '../context/musicProvider'
import searchIcon from "../assets/search.png"
const AddAudioInPlaylist = () => {
    let {allAudioFiles}=useMusicProvider()
  return (
         <View>
                <View style={styles.inputBoxWrapper}>
                <Image  style={styles.searchIconPosition} source={searchIcon}/>
                    <TextInput placeholderTextColor={"white"} style={styles.inputBoxPlaylist} placeholder='serach'></TextInput>
                    
                </View>
         </View>
  )
}

export default AddAudioInPlaylist

const styles = StyleSheet.create({
    inputBoxWrapper:{
        position:"relative",
        backgroundColor:"#232323",
        padding:15,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
    
    },
    inputBoxPlaylist:{
        borderBottomColor:"green",
        borderBottomWidth:1,
        width:"70%",
        marginLeft:"10%",
            color:"white"
    
     
    },
    searchIconPosition:{
        position:"absolute",
        left:"10%",
        top:"60%"
    }
})