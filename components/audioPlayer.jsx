import { Pressable, StyleSheet, Text, View ,Image,Modal, Dimensions, BackHandler} from 'react-native'
import React,{useEffect} from 'react'
import Slider from '@react-native-community/slider';
import TextTicker from 'react-native-text-ticker'
import { LinearGradient } from 'expo-linear-gradient';
import playIcon from "../assets/play.png"
import pauseIcon from "../assets/pause.png"
import nextIcon from "../assets/next.png"
import previousIcon from "../assets/previous.png"
import loopIcon from "../assets/loop.png"
import shuffleIcon from "../assets/shuffle.png"
import loveIcon from "../assets/love.png" 
import musicIcon from "../assets/music-pic.png" 

const AudioPlayer = ({isModalShow,modalFuc,audioTitle,audioUpdateStatus,playFuc,pauseFuc,isPlaying}) => {

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", ()=>{
            console.log("press back");
            
        });
        return () => {
          BackHandler.removeEventListener("hardwareBackPress", modalFuc);
        };
      }, []);
    let handleDurationFormat=(duration)=>{
        
        
            let hours=Math.floor(duration/3600)
            let minutes=Math.floor(duration/60);
            let seconds=Math.floor(duration%60)
        hours=String(hours).padStart(2,"0")
        minutes=String(minutes).padStart(2,"0")
        seconds=String(seconds).padStart(2,"0")
         return `${hours}:${minutes}:${seconds}`
         
    }
  return (
    <>
        <Modal visible={isModalShow}>
        <LinearGradient
        // Background Linear Gradient
        colors={['#35555f',"black"]}
    
         >
            <View style={styles.audioPlayeWrapper}>
     
                <View style={styles.audioImgWrapper}>
                    <View>
                        <Image style={{width:Dimensions.get("window").width*.7,height:Dimensions.get("window").height*.4}} source={musicIcon}/>
                    </View>
                </View>
                        {/* music details */}
                <View>
                                    <TextTicker
                            style={{ fontSize: 20 ,color:"white",margin:9,fontWeight:"700"}}
                            loop={true}
                            duration={10000}
                            bounce
                            repeatSpacer={50}
                            marqueeDelay={1000}
                            >
                                   {audioTitle}
                            </TextTicker>

                  
                       
                </View>
                    {/* slider */}
                <View style={styles.sliderWrapper}>
                   <View style={{width:Dimensions.get("window").width*.7}}>
                        <Slider
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="blue"
                            maximumTrackTintColor="#c1beb9"
                            value={audioUpdateStatus.currentDuration/audioUpdateStatus.totalDuration}
                        />
                        <View style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexDirection:"row"}}>
                            <Text style={{color:"white"}}>{handleDurationFormat(audioUpdateStatus.currentDuration)}</Text>
                            <Text style={{color:"white"}}>{handleDurationFormat(audioUpdateStatus.totalDuration)}</Text>
                        </View>
                   </View>
                </View>
                    {/* contoller */}
                    <View style={styles.controllerWrapper}> 
                        <Pressable>
                            <View>
                                <Image source={loveIcon} />
                            </View>
                           
                        </Pressable>
                        <Pressable>
                            <Image source={previousIcon} />
                        </Pressable>
                        <Pressable onPress={isPlaying?pauseFuc:playFuc}>
                            <View style={{backgroundColor:"white",padding:10,borderRadius:20}}>
                                <Image source={isPlaying?pauseIcon:playIcon}/>
                            </View>
                        </Pressable>
                        <Pressable>
                            <Image source={nextIcon}/>
                        </Pressable>
                        <Pressable>
                            <Image source={loopIcon}/>
                        </Pressable>
                    </View>
            </View>
            </LinearGradient>
        </Modal>
    </>
  )
}

export default AudioPlayer;

const styles = StyleSheet.create({
    audioPlayeWrapper:{
        height:Dimensions.get("window").height,
        width:Dimensions.get("window").width,
     
    },
    sliderWrapper:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:Dimensions.get("window").width,
        marginTop:5
    },
    controllerWrapper:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        width:Dimensions.get("window").width*.9,
        marginLeft:15,
        marginTop:5
    },
    audioImgWrapper:{
        height:Dimensions.get("window").height*.6,
        width:Dimensions.get("window").width,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
     
    }
})