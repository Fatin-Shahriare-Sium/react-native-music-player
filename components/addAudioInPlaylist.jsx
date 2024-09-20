import { Dimensions, StyleSheet, Text, TextInput, View,Image, Modal, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useMusicProvider } from '../context/musicProvider'
import searchIcon from "../assets/search.png"
import SingleAudioOfPlaylist from './singleAudioOfPlaylist'
const AddAudioInPlaylist = ({handleAddAudioToPlaylist,isModalShow,handleModal}) => {
    let {allAudioFiles}=useMusicProvider()
    let [seachedAudio,setSearchedAudio]=useState(allAudioFiles)
    let handleSearchBar=(text)=>{
        console.log(allAudioFiles);
        
        let filteredArray=allAudioFiles.filter((sig)=>sig.filename.match(text))
        console.log("filter in search bar",filteredArray);
        
        setSearchedAudio([...filteredArray])
    }
  return (
         <Modal onRequestClose={()=>handleModal()} visible={isModalShow}>
                <View style={styles.inputBoxWrapper}>
                <Image  style={styles.searchIconPosition} source={searchIcon}/>
                    <TextInput onChangeText={(e)=>handleSearchBar(e)} placeholderTextColor={"white"} style={styles.inputBoxPlaylist} placeholder='serach'></TextInput>
                    
                </View>
               <ScrollView>
               <View>
                    {seachedAudio.map((sig,index)=>{
                        return(
                            <SingleAudioOfPlaylist key={index} handleAddBtn={handleAddAudioToPlaylist} audioTitle={sig.filename} audioId={sig.id}></SingleAudioOfPlaylist>
                        )
                    })}
                </View>
               </ScrollView>
         </Modal>
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