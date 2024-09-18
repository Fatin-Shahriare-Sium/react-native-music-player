
import { StyleSheet,View,ScrollView, FlatList } from 'react-native';
import AudioSingleList from '../components/audioSingleList';
import { useMusicProvider } from '../context/musicProvider';

export default function App() {
  let {allAudioFiles,handleAudioSelect}=useMusicProvider();

  return (
     <>
        
       
      <ScrollView>
         <View style={styles.container}>
              <FlatList
                data={allAudioFiles.slice(0,30)}
                key={(item)=>item.id}
                keyExtractor={(item) => item.id}
              renderItem={(sig)=>{return (<AudioSingleList isPlayingFromPlaylist={false} playListId={''} handleRefreshPlaylsit={()=>{}} playListAudioQueue={[]} key={sig.index} audioTitle={sig.item.filename} indexOfAudioFiles={sig.index} audioId={sig.item.id} audioUri={sig.item.uri} handleTitleSelect={handleAudioSelect}></AudioSingleList>)}}
            
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
