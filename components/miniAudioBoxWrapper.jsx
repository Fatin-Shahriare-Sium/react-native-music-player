import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MiniAudioBox from './miniAudioBox';
import { useMusicProvider } from '../context/musicProvider';

const MiniAudioBoxWrapper = () => {
    let {currentAudioFile}=useMusicProvider()
  return (
    <View style={{height:!currentAudioFile.uri&&Dimensions.get("window").height*.1,backgroundColor:"black"}}>
       {currentAudioFile.uri && <MiniAudioBox></MiniAudioBox>}
    </View>
  )
}

export default MiniAudioBoxWrapper;

const styles = StyleSheet.create({
  
})