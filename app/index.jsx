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
  let [currentAudioFile,setCurrentAudioFile]=useState({title:"",id:"",uri:"",index:""});
   

    let handleAudioSelect=(audioId,audioUri,audioTitle,index)=>{
      console.log("handleAudioIndex in indexjs",index);
      
      setCurrentAudioFile({title:audioTitle,uri:audioUri,id:audioId,index})
    }

  return (
     <>
        
       
      <ScrollView>
         <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
  
      <StatusBar style="auto" />

      {currentAudioFile.title && <MiniAudioBox audioUri={currentAudioFile.uri} audioTitle={currentAudioFile.title} audioId={currentAudioFile.id} audioIndex={currentAudioFile.index} ></MiniAudioBox>}
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
