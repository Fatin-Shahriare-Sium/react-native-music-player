import { StyleSheet, Text, View ,FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useMusicProvider } from '../../context/musicProvider'
import AudioSingleList from '../../components/audioSingleList'

const Queue = () => {
    let {audioQueue,handleAudioSelect}=useMusicProvider()
    let [x,setX]=useState([])
    useEffect(()=>{
        console.log("audio queue in queue",audioQueue);
        setX([...audioQueue])
    },[audioQueue])
  return (
    <View>
        <Text>queue</Text>
  
              {x.map((sig,index)=>{

                    return(
                        
                  <AudioSingleList isPlayingFromPlaylist={false} playListId={''} handleRefreshPlaylsit={()=>{}} playListAudioQueue={[]} key={index} audioTitle={sig.filename} indexOfAudioFiles={index} audioId={sig.id} audioUri={sig.uri} handleTitleSelect={handleAudioSelect}></AudioSingleList>
                    )
                
              })}
    </View>
  )
}

export default Queue

const styles = StyleSheet.create({})