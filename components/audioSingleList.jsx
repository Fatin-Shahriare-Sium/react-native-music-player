import { StyleSheet, Text, View,Image, Pressable, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect,useRef } from 'react'
import musicLogo from "../assets/music.png"
import threeDotsIcon from "../assets/threeDots.png"
import playIcon from "../assets/play-w.png"
import loveIcon from "../assets/love.png" 
import loveRedIcon from "../assets/love-red.png" 
import addListIcon from "../assets/add-list.png"
import removeIcon from "../assets/remove.png"
import playNextIcon from "../assets/play-next.png"
import RBSheet from 'react-native-raw-bottom-sheet';
import { useMusicProvider } from '../context/musicProvider'
import { router } from 'expo-router'
const AudioSingleList = ({audioTitle,audioUri,audioId,handleTitleSelect,indexOfAudioFiles,isPlayingFromPlaylist,playListAudioQueue,playListId,handleRefreshPlaylsit}) => {
  let {setAudioAsFav,deleteAudioAsFav,isFav,handleAddAudioToImmediateNextOfTheAudioQueue,removeAudioFromQueue,handleRemoveAudioFromPlaylsit}=useMusicProvider()
  const refRBSheet = useRef();
  useEffect(()=>{
console.log("indexOfAudioFiles",indexOfAudioFiles);
  
  },[indexOfAudioFiles])
  return (
    <View style={styles.audioSingleListWrapper}>
         
            <View>
                <Image source={musicLogo}/>
            </View>

            <View style={{width:"70%",marginLeft:"3%"}} >
               <Pressable onPress={()=>isPlayingFromPlaylist==true?handleTitleSelect(playListAudioQueue,playListId,audioId,audioUri,audioTitle,indexOfAudioFiles):handleTitleSelect(audioId,audioUri,audioTitle,indexOfAudioFiles)}>
               <Text  numberOfLines={1} style={{color:"white"}}>{audioTitle}</Text>
               </Pressable>
            </View>
            <View style={{marginLeft:"3%"}}>
                <TouchableOpacity onPress={()=>refRBSheet.current.open()}>
                  <Image source={threeDotsIcon}/>
                </TouchableOpacity>
            </View>

            <RBSheet
        ref={refRBSheet}
        useNativeDriver={false}
        draggable={true}
        closeOnPressBack={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#35555f',
          
          },
          container:{
            backgroundColor:"black",
            borderTopColor:"red"
          }
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
      
       
        }}
        customAvoidingViewProps={{
          enabled: false,

        }}>
          <View style={{padding:5}}>
              <Text numberOfLines={1} style={{fontSize:20,color:"white",textAlign:"center"}}>{audioTitle}</Text>
              <View  style={{display:"flex",justifyContent:"space-around",alignItems:"center",flexDirection:"row",marginTop:"5%"}}>
                  <Pressable style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
                      <TouchableOpacity onPressOut={()=>refRBSheet.current.close()} onPress={()=>isPlayingFromPlaylist==true?handleTitleSelect(playListAudioQueue,playListId,audioId,audioUri,audioTitle,indexOfAudioFiles):handleTitleSelect(audioId,audioUri,audioTitle,indexOfAudioFiles)} ><Image  source={playIcon}/></TouchableOpacity>
                      <Text style={{fontSize:15,color:"white"}}>Play</Text>
                  </Pressable>
                  <Pressable style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                     <TouchableOpacity onPressOut={()=>refRBSheet.current.close()} onPress={isFav?deleteAudioAsFav:setAudioAsFav} ><Image source={isFav?loveRedIcon:loveIcon}/></TouchableOpacity>
                      <Text style={{fontSize:15,color:"white"}}>Favourite</Text>
                  </Pressable>
                  <Pressable style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <TouchableOpacity onPressOut={()=>refRBSheet.current.close()} onPress={()=>handleAddAudioToImmediateNextOfTheAudioQueue(audioId)} ><Image source={playNextIcon}/></TouchableOpacity>
                      <Text style={{fontSize:15,color:"white"}}>Play Next</Text>
                  </Pressable >
                  <Pressable style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <TouchableOpacity onPressOut={()=>refRBSheet.current.close()} onPress={()=>router.push(`(AddAudioToPlayList)/${audioId}`)}><Image source={addListIcon}/></TouchableOpacity>
                      <Text style={{fontSize:15,color:"white"}}>PlayList</Text>
                  </Pressable>
                  <Pressable  style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <TouchableOpacity onPressOut={()=>{
                          refRBSheet.current.close(),
                          handleRefreshPlaylsit(audioId)
                        }} onPress={()=>isPlayingFromPlaylist?handleRemoveAudioFromPlaylsit(playListId,audioId):removeAudioFromQueue(audioId)} ><Image source={removeIcon}/></TouchableOpacity>
                        
                      <Text style={{fontSize:15,color:"white"}}>Remove</Text>
                  </Pressable>
              </View>
          </View>
        </RBSheet>
   
    </View>
  )
}

export default AudioSingleList;

const styles = StyleSheet.create({
    audioSingleListWrapper:{
        width:"100%",
        backgroundColor:"black",
        color:"white",
        fontWeight:"300",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        padding:9,
    }
})
// #35555f