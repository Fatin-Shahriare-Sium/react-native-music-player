import { StyleSheet, Text, View,ScrollView ,Image,TextInput,FlatList, Dimensions } from 'react-native'
import React, { useState } from 'react'
import searchIcon from "../assets/search.png"
import { useMusicProvider } from '../context/musicProvider'
import AudioSingleList from '../components/audioSingleList'
import CustomScreenTitle from '../components/customScreenTitle'
import EmptyComponet from '../components/emptyComponent'


const Serach = () => {
  let {allAudioFiles,handleAudioSelect}=useMusicProvider()
  let [seachedAudio,setSearchedAudio]=useState([])
  let handleSearchBar=(text)=>{
      console.log(allAudioFiles);
      
      let filteredArray=allAudioFiles.filter((sig)=>sig.filename.match(text))
      console.log("filter in search bar",filteredArray);
      if(text==""){
        setSearchedAudio([])
      }else{
        setSearchedAudio([...filteredArray])
      }
      
  }
  return (
      <View style={{backgroundColor:"black",height:Dimensions.get("window").height*.8}}>
        <CustomScreenTitle title={"Search"}/>
          <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <View style={styles.inputBoxWrapper}>
                      <Image  style={styles.searchIconPosition} source={searchIcon}/>
                          <TextInput onChangeText={(e)=>handleSearchBar(e)} placeholderTextColor={"white"} style={styles.inputBoxPlaylist} placeholder='serach'></TextInput>
                          
              </View>
          </View>
        <ScrollView>
        <FlatList
                data={seachedAudio}
                key={(item)=>item.id}
                keyExtractor={(item) => item.id}
              renderItem={(sig)=>{return (<AudioSingleList isPlayingFromPlaylist={false} playListId={''} handleRefreshPlaylsit={()=>{}} playListAudioQueue={[]} key={sig.index} audioTitle={sig.item.filename} indexOfAudioFiles={sig.index} audioId={sig.item.id} audioUri={sig.item.uri} handleTitleSelect={handleAudioSelect}></AudioSingleList>)}}
              refreshing={seachedAudio}
              ListEmptyComponent={()=><EmptyComponet message={"Search Your Audios 🔍"}/>}
          />
        </ScrollView>
      </View>
  )
}

export default Serach;

const styles = StyleSheet.create({
  inputBoxWrapper:{
    position:"relative",
    backgroundColor:"#222221",
    padding:15,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    width:Dimensions.get("window").width*.9,
    borderRadius:19,
    margin:6

},
inputBoxPlaylist:{
    borderBottomColor:"white",
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