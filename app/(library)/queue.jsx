import { StyleSheet, Text, View ,FlatList, ScrollView,Image,Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useMusicProvider } from '../../context/musicProvider'
import AudioSingleList from '../../components/audioSingleList'
import CustomScreenTitle from '../../components/customScreenTitle'
import musicIcon from "../../assets/music.png"
const Queue = () => {
    let {audioQueue,handleAudioSelect,activeAudioId}=useMusicProvider()
    let [x,setX]=useState([])
    useEffect(()=>{
        setX([...audioQueue])
    },[audioQueue])
  return (
    <View style={{backgroundColor:"black",height:Dimensions.get("window").height}}>
        <CustomScreenTitle title={"Your Audio Queue"}/>
          <ScrollView>
              <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                      {x.map((sig,index)=>{

                        return(
                            <View style={styles.singleQueueWrapper} key={index}>
                              <Image source={musicIcon} />
                              <Text numberOfLines={1} style={{color:activeAudioId==sig.id?"#08a9ee":"white",marginLeft:"1%",fontSize:15}}>{sig.filename}</Text>
                            </View>

                        )

                    })}
              </View>
          </ScrollView>
              
    </View>
  )
}

export default Queue

const styles = StyleSheet.create({
  singleQueueWrapper:{
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"center",
    flexDirection:"row",
    width:Dimensions.get("window").width*.9,
    margin:"1%"
  }
})