
import { StyleSheet,View,ScrollView, FlatList,Text, Dimensions } from 'react-native';
import AudioSingleList from '../components/audioSingleList';
import { useMusicProvider } from '../context/musicProvider';
import CustomScreenTitle from '../components/customScreenTitle';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  let {allAudioFiles,handleAudioSelect}=useMusicProvider();
  

  let sayMAE=()=>{
    let today = new Date()
    let curHr = today.getHours()
    if (curHr < 12) {
      return "Good Morning"
    } else if (curHr < 18) {
      return "Good Afternoon"
    } else {
      return "Good Evening"
    }
  }


  return (
     <>
        
       <CustomScreenTitle title={"Home"}></CustomScreenTitle>
      <ScrollView>
          <LinearGradient
          // Background Linear Gradient
          colors={['#35555f',"black"]}
          start={{x: .3, y: 0}} end={{x: 1, y: 0}} 
          >
              <View style={styles.container}>
                    <View style={{display:"flex",justifyContent:"center",alignItems:"center",height:Dimensions.get("window").height*.2}}>
                      <Text style={{color:"white",fontWeight:"700",fontSize:50,textAlign:"center"}}>{sayMAE()}</Text>
                    </View>
                    <FlatList
                      data={allAudioFiles.slice(0,30)}
                      key={(item)=>item.id}
                      keyExtractor={(item) => item.id}
                    renderItem={(sig)=>{return (<AudioSingleList isPlayingFromPlaylist={false} playListId={''} handleRefreshPlaylsit={()=>{}} playListAudioQueue={[]} key={sig.index} audioTitle={sig.item.filename} indexOfAudioFiles={sig.index} audioId={sig.item.id} audioUri={sig.item.uri} handleTitleSelect={handleAudioSelect}></AudioSingleList>)}}
                    
                    />
              </View>
          </LinearGradient>
      </ScrollView>
     
     </>
  );
}

const styles = StyleSheet.create({
  container: {
    display:"flex",
    alignItems: 'center',
    justifyContent: 'center',

  },
});
