import { StyleSheet, Text, TextInput, View,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useAddAudioToPlaylist, useGetPlayList } from '../../hooks/usePlayList'
import AddAudioInPlaylist from '../../components/addAudioInPlaylist'
import AudioSingleList from '../../components/audioSingleList'
import { useMusicProvider } from '../../context/musicProvider'

const OnePlayList = () => {
   let {onePlayListId}= useLocalSearchParams()
   let {handleAudioSelect,allAudioFiles}=useMusicProvider()
   let [singlePlayListObj,setSinglePlayListObj]=useState({name:"",id:"",audios:[]})
   useEffect(()=>{
    useGetPlayList(onePlayListId).then((result)=>{
      console.log("useGetPlayList",result);
      
      setSinglePlayListObj(...result)
    })
   },[])
  let handleAddAudioToPlaylist=async (audioId)=>{
    let filteredArray=allAudioFiles.filter((sig)=>sig.id==audioId)
    setSinglePlayListObj({...singlePlayListObj,audios:[...singlePlayListObj.audios,...filteredArray]})
    console.log("handleAddAudioToPlaylist",filteredArray);
    useAddAudioToPlaylist(onePlayListId,...filteredArray).then((res)=>{
      
      
    })
  }
  useEffect(()=>{
    console.log("singlePlayListObj",singlePlayListObj);
    
  },[singlePlayListObj])
  return (
    <View>
      <Text>{singlePlayListObj.name}</Text>
      <TextInput keyboardType="number-pad">DW</TextInput>
      <View>
              <FlatList
                data={singlePlayListObj.audios}
                key={(item)=>item.id}
                keyExtractor={(item) => item.id}
              renderItem={(sig)=>{return (<AudioSingleList  audioUri={sig.item.uri} audioTitle={sig.item.filename} audioId={sig.item.id} handleTitleSelect={handleAudioSelect}  ></AudioSingleList>)}}
              refreshing={singlePlayListObj}
              />
     
      </View>
      <AddAudioInPlaylist handleAddAudioToPlaylist={handleAddAudioToPlaylist}></AddAudioInPlaylist>
    </View>
  )
}

export default OnePlayList

const styles = StyleSheet.create({})