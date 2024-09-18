import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useGetPlayList } from '../../hooks/usePlayList'
import AddAudioInPlaylist from '../../components/addAudioInPlaylist'

const OnePlayList = () => {
   let {onePlayListId}= useLocalSearchParams()
   let [singlePlayListObj,setSinglePlayListObj]=useState({name:"",id:"",audios:[]})
   useEffect(()=>{
    useGetPlayList(onePlayListId).then((result)=>{
      setSinglePlayListObj(...result)
    })
   },[])
  return (
    <View>
      <Text>{singlePlayListObj.name}</Text>
      <TextInput keyboardType="number-pad">DW</TextInput>
      <AddAudioInPlaylist></AddAudioInPlaylist>
    </View>
  )
}

export default OnePlayList

const styles = StyleSheet.create({})