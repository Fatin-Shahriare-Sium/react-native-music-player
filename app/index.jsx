import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View,Button, TextInput, ScrollView, Dimensions, FlatList } from 'react-native';

import { useEffect, useState ,useRef} from 'react';
import Slider from '@react-native-community/slider';
import AudioPlayer from '../components/audioPlayer';
import MiniAudioBox from '../components/miniAudioBox';
import AudioSingleList from '../components/audioSingleList';
import { useMusicProvider } from '../context/musicProvider';

export default function App() {
  let {allAudioFiles}=useMusicProvider();
  let [currentAudioFile,setCurrentAudioFile]=useState({title:"",id:"",uri:""});
    // let syncWithAudio=async (syncPosition)=>{
    //     await soundx.current.setPositionAsync(audioCurrentStatus.totalDuration*syncPosition*1000)
    //   }

    let handleAudioSelect=(audioId,audioUri,audioTitle)=>{
      setCurrentAudioFile({title:audioTitle,uri:audioUri,id:audioId})
    }

  return (
     <>
        
       
      <ScrollView>
         <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
  
      <StatusBar style="auto" />

      {currentAudioFile.title && <MiniAudioBox audioUri={currentAudioFile.uri} audioTitle={currentAudioFile.title} audioId={currentAudioFile.id} ></MiniAudioBox>}
      <FlatList
        data={allAudioFiles}
        key={(item)=>item.id}
        keyExtractor={(item) => item.id}
      renderItem={(sig)=>{return (<AudioSingleList audioTitle={sig.item.filename} audioId={sig.item.id} audioUri={sig.item.uri} handleTitleSelect={handleAudioSelect}></AudioSingleList>)}}
    maxToRenderPerBatch={5}
      />
    </View>
      </ScrollView>
     
     </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
