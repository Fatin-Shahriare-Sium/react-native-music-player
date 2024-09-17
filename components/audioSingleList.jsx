import { StyleSheet, Text, View,Image, Pressable, Dimensions } from 'react-native'
import React, { useEffect,useRef } from 'react'
import musicLogo from "../assets/music.png"
import threeDotsIcon from "../assets/threeDots.png"
import playIcon from "../assets/play-w.png"
import loveIcon from "../assets/love.png" 
import loveRedIcon from "../assets/love-red.png" 
import addListIcon from "../assets/add-list.png"
import removeIcon from "../assets/remove.png"
import playNextIcon from "../assets/play-next.png"
import pauseIcon from "../assets/pause-w.png"
import RBSheet from 'react-native-raw-bottom-sheet';
import { useMusicProvider } from '../context/musicProvider'
const AudioSingleList = ({audioTitle,audioUri,audioId,handleTitleSelect,indexOfAudioFiles}) => {
  let {setAudioAsFav,deleteAudioAsFav,isFav,handleAddAudioToImmediateNextOfTheAudioQueue,removeAudioFromQueue}=useMusicProvider()
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
               <Pressable onPress={()=>handleTitleSelect(audioId,audioUri,audioTitle,indexOfAudioFiles)}>
               <Text  numberOfLines={1} style={{color:"white"}}> {audioTitle}</Text>
               </Pressable>
            </View>
            <View style={{marginLeft:"3%"}}>
                <Pressable onPress={()=>refRBSheet.current.open()}>
                  <Image source={threeDotsIcon}/>
                </Pressable>
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
              <View style={{display:"flex",justifyContent:"space-around",alignItems:"center",flexDirection:"row",marginTop:"5%"}}>
                  <Pressable onPress={()=>handleTitleSelect(audioId,audioUri,audioTitle,indexOfAudioFiles)} style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
                      <Image source={playIcon}/>
                      <Text style={{fontSize:15,color:"white"}}>Play</Text>
                  </Pressable>
                  <Pressable onPress={isFav?deleteAudioAsFav:setAudioAsFav} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <Image source={isFav?loveRedIcon:loveIcon}/>
                      <Text style={{fontSize:15,color:"white"}}>Favourite</Text>
                  </Pressable>
                  <Pressable onPress={()=>handleAddAudioToImmediateNextOfTheAudioQueue(audioId)} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <Image source={playNextIcon}/>
                      <Text style={{fontSize:15,color:"white"}}>Play Next</Text>
                  </Pressable >
                  <Pressable style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <Image source={addListIcon}/>
                      <Text style={{fontSize:15,color:"white"}}>PlayList</Text>
                  </Pressable>
                  <Pressable onPress={()=>removeAudioFromQueue(audioId)} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <Image source={removeIcon}/>
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