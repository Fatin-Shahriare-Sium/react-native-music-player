import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      
      {/* <Text>{(audioCurrentStatus.currentDuration/audioCurrentStatus.totalDuration)/10}</Text>
      <Slider
  style={{width: 200, height: 40}}
  minimumValue={0}
  maximumValue={1}
  onValueChange={(e)=>{syncWithAudio(e)}}
  value={(audioCurrentStatus.currentDuration/audioCurrentStatus.totalDuration)}
  minimumTrackTintColor="blue"
  maximumTrackTintColor="#000000"
/> */}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})