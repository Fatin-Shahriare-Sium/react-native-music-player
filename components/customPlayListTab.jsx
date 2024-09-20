import { StyleSheet, Image, View, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import playIcon from "../assets/play.png"
import removeIcon from "../assets/remove.png"
import pauseIcon from "../assets/pause.png"
import editIocn from "../assets/edit.png"
import { useDeletePlayList} from '../hooks/usePlayList'
import { useMusicProvider } from '../context/musicProvider'
import { router } from 'expo-router'
import RenamePlaylistModal from './renamePlaylistModal'
const CustomPlayListTab = ({playlistId,playlistAudioArray,renamePlaylistFunc,playlistName}) => {
    let {handleAudioSelectFromPlaylist,handleAudioSelect,allAudioFiles,isPlayingPlaylist,handleRefreshLibraryPage}=useMusicProvider()
    let [renameModal,setRenameModal]=useState(false)
    let handleDeletePlaylist=async ()=>{
        Alert.alert("Delete Playlist","This playlist is going to be deleted,Are you sure??",[
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              
            },
            {text: 'OK', onPress: () =>{
              if(isPlayingPlaylist==true){
                handleAudioSelect(allAudioFiles[0].id,allAudioFiles[0].uri,allAudioFiles[0].filename,0)
              }
               useDeletePlayList(playlistId).then((res)=>{
                handleRefreshLibraryPage()
               })
              
              ToastAndroid.show("Playlist has been deleted,successfully",ToastAndroid.SHORT)
              return router.push('/libHome')
            }},
          ])
    
    }
  
  
  let handleRenameModal=()=>{
    setRenameModal(!renameModal)
  }
   

  return (
    <View>
        <View style={styles.playListTabContainer}>
            <TouchableOpacity onPress={()=>handleRenameModal(!renameModal)}>
                <Image style={{width:20,height:20}} source={editIocn} />
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>playlistAudioArray.length>0 && handleAudioSelectFromPlaylist(playlistAudioArray,playlistId,playlistAudioArray[0].id,playlistAudioArray[0].uri,playlistAudioArray[0].filename,0)} style={{backgroundColor:"#adedf0",padding:20,borderRadius:40,display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Image style={{width:20,height:20}} source={playIcon} />
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>handleDeletePlaylist()}>
                <Image  style={{width:20,height:20}} source={removeIcon} />
            </TouchableOpacity>
        </View>
        <RenamePlaylistModal preName={playlistName} handleModal={handleRenameModal} modalShow={renameModal} handleRenamePlaylist={renamePlaylistFunc}/>
    </View>
  )
}

export default CustomPlayListTab

const styles = StyleSheet.create({
    playListTabContainer:{
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center",
        flexDirection:"row"
    }
})