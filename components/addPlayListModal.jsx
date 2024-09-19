import { FlatList, Modal, StyleSheet, Image, TouchableOpacity, View ,Text, ToastAndroid} from 'react-native'
import React,{useState,useEffect} from 'react'
import { useAddAudioToPlaylist, useGetAllPlayLists } from '../hooks/usePlayList'
import musicLogo from "../assets/music.png"
import { useMusicProvider } from '../context/musicProvider'
import { router } from 'expo-router'
const AddPlayListModal = ({audioId}) => {
    let [allPlayLists,setAllPlaylists]=useState([])
    let {allAudioFiles}=useMusicProvider()
    useEffect(()=>{
        useGetAllPlayLists().then((res)=>{
            console.log("AllPlaylists in useeefect",res);
            setAllPlaylists([...res])
        })
    },[])

    let handleAddAudioToPlayList=(playListId,playListName,audioId)=>{
        let filterdArray=allAudioFiles.filter((sig)=>sig.id==audioId)
        useAddAudioToPlaylist(playListId,...filterdArray)
        ToastAndroid.show(`This audio is added to ${playListName} `,ToastAndroid.SHORT)
    }
  return (
    <Modal onRequestClose={()=>router.push('/')} visible={true}>
        <View style={{backgroundColor:"red"}}>
            <Text>AWHBDIUA</Text>
            <FlatList
             data={allPlayLists}
             key={(item)=>item.id}
             keyExtractor={(item) => item.id}
           renderItem={(sig)=>{
            return(
                <TouchableOpacity onPressOut={()=>router.push("/")} onPress={()=>{handleAddAudioToPlayList(sig.item.id,sig.item.name,audioId)}}>
                    <Image source={musicLogo}/>
                    <Text>{sig.item.name}</Text>
                </TouchableOpacity>
                
            )
           }}
           refreshing={allPlayLists}
            
            />
        </View>
    </Modal>
  )
}

export default AddPlayListModal

const styles = StyleSheet.create({})