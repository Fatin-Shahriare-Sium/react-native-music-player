import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MiniAudioBox from './miniAudioBox';
import { useMusicProvider } from '../context/musicProvider';

const MiniAudioBoxWrapper = () => {
    let {currentAudioFile}=useMusicProvider()
  return (
    <View style={styles.miniAudioBoxWrapper}>
       {currentAudioFile.uri && <MiniAudioBox></MiniAudioBox>}
    </View>
  )
}

export default MiniAudioBoxWrapper;

const styles = StyleSheet.create({
    miniAudioBoxWrapper:{

        zIndex:7,
        marginBottom:"2%"
      
    }
})