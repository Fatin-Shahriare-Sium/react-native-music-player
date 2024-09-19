import { StyleSheet, Text, View,ScrollView ,Image,TextInput,FlatList } from 'react-native'
import React, { useState } from 'react'
import searchIcon from "../assets/search.png"
import { useMusicProvider } from '../context/musicProvider'
import AudioSingleList from '../components/audioSingleList'


const Serach = () => {
  let {allAudioFiles,handleAudioSelect}=useMusicProvider()
  let [seachedAudio,setSearchedAudio]=useState(allAudioFiles)
  let handleSearchBar=(text)=>{
      console.log(allAudioFiles);
      
      let filteredArray=allAudioFiles.filter((sig)=>sig.filename.match(text))
      console.log("filter in search bar",filteredArray);
      
      setSearchedAudio([...filteredArray])
  }
  return (
      <View>
        <Text>Search</Text>
        <View style={styles.inputBoxWrapper}>
                <Image  style={styles.searchIconPosition} source={searchIcon}/>
                    <TextInput onChangeText={(e)=>handleSearchBar(e)} placeholderTextColor={"white"} style={styles.inputBoxPlaylist} placeholder='serach'></TextInput>
                    
        </View>
        <ScrollView>
        <FlatList
                data={seachedAudio}
                key={(item)=>item.id}
                keyExtractor={(item) => item.id}
              renderItem={(sig)=>{return (<AudioSingleList isPlayingFromPlaylist={false} playListId={''} handleRefreshPlaylsit={()=>{}} playListAudioQueue={[]} key={sig.index} audioTitle={sig.item.filename} indexOfAudioFiles={sig.index} audioId={sig.item.id} audioUri={sig.item.uri} handleTitleSelect={handleAudioSelect}></AudioSingleList>)}}
              refreshing={seachedAudio}
          />
        </ScrollView>
      </View>
  )
}

export default Serach;

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