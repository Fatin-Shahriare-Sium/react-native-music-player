import { ScrollView, StyleSheet, Text, View ,FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import useGetFav from '../../hooks/useGetFav'
import { useMusicProvider } from '../../context/musicProvider'
import AudioSingleList from '../../components/audioSingleList'

const FavouritePage = () => {
    let [allFavAudioArary,setALLFavAudioArray]=useState([])
    let {allAudioFiles,handleAudioSelect}=useMusicProvider()
    useEffect(()=>{
        useGetFav().then((res)=>{
            console.log("useGetFav",res);
            let x=[]
            res.map((sigId)=>{
                let filterdArray=allAudioFiles.filter((sig)=>sig.id==sigId)
                    x.push(...filterdArray)
                    
                
            })
            setALLFavAudioArray(x)
                
            
        })
    },[])
    useEffect(()=>{
        console.log("filterdArray in favourites page",allFavAudioArary);    
        
    },[allFavAudioArary])
  return (
    <>
      <ScrollView>
                <FlatList
                data={allFavAudioArary}
                key={(item)=>item.id}
                keyExtractor={(item) => item.id}
                 renderItem={(sig)=>{return (<AudioSingleList key={sig.index} audioTitle={sig.item.filename} indexOfAudioFiles={sig.index} audioId={sig.item.id} audioUri={sig.item.uri} handleTitleSelect={handleAudioSelect}></AudioSingleList>)}}
                 maxToRenderPerBatch={5}
              />
      </ScrollView>
    </>
  )
}

export default FavouritePage

const styles = StyleSheet.create({})