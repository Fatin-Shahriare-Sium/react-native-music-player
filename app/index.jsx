import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View,Button, TextInput, ScrollView, Dimensions, FlatList } from 'react-native';

import { useEffect, useState ,useRef} from 'react';
import Slider from '@react-native-community/slider';
import AudioPlayer from '../components/audioPlayer';
import MiniAudioBox from '../components/miniAudioBox';
import AudioSingleList from '../components/audioSingleList';
import { useMusicProvider } from '../context/musicProvider';

export default function App({x}) {
  let {allAudioFiles,handleAudioSelect}=useMusicProvider();

 useEffect(()=>{  
  console.log("route",x);
  
 },[])
  return (
     <>
        
       
      <ScrollView>
         <View style={styles.container}>
              <FlatList
                data={allAudioFiles.slice(0,30)}
                key={(item)=>item.id}
                keyExtractor={(item) => item.id}
              renderItem={(sig)=>{return (<AudioSingleList key={sig.index} audioTitle={sig.item.filename} indexOfAudioFiles={sig.index} audioId={sig.item.id} audioUri={sig.item.uri} handleTitleSelect={handleAudioSelect}></AudioSingleList>)}}
            maxToRenderPerBatch={5}
              />
          </View>
      </ScrollView>
     
     </>
  );
}

const styles = StyleSheet.create({
  container: {
    display:"flex",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
