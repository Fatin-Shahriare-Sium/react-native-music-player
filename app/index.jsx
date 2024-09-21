import { StyleSheet,View,ScrollView, FlatList,Text, Dimensions } from 'react-native';
import AudioSingleList from '../components/audioSingleList';
import { useMusicProvider } from '../context/musicProvider';
import CustomScreenTitle from '../components/customScreenTitle';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';

export default function App() {
  let {allAudioFiles,handleAudioSelect}=useMusicProvider();
  let [minimumAudioFiles,SetMinimumAudioFiles]=useState()
  let [nextNum,setNextNum]=useState(31)
  let loadMore=()=>{
    let extraData=minimumAudioFiles.concat(allAudioFiles.slice(nextNum,nextNum+30))
    setNextNum(nextNum+30)
    SetMinimumAudioFiles(extraData)
  }
  useEffect(()=>{
  
    SetMinimumAudioFiles(allAudioFiles.slice(0,30))
  },[allAudioFiles])
  let sayMAE=()=>{
    let today = new Date()
    let curHr = today.getHours()
    if (curHr < 10) {
      return "Good Morning"
    } else if (curHr < 20) {
      return "Good Afternoon"
    } else {
      return "Good Evening"
    }
  }


  return (
     <>
        
       <CustomScreenTitle title={"Home"}></CustomScreenTitle>

          <LinearGradient
          // Background Linear Gradient
          colors={['#35555f',"black"]}
          start={{x: .3, y: 0}} end={{x: 1, y: 0}} 
          >
              <View style={styles.container}>
                    <View style={{display:"flex",justifyContent:"center",alignItems:"center",height:Dimensions.get("window").height*.2}}>
                      <Text style={{color:"white",fontWeight:"700",fontSize:50,textAlign:"center"}}>{sayMAE()}</Text>
                    </View>
                
              </View>
          </LinearGradient>
    
                    <FlatList
                      data={minimumAudioFiles}
                      key={(item)=>item.id}
                      keyExtractor={(item) => item.id}
                    renderItem={(sig)=>{return (<AudioSingleList isPlayingFromPlaylist={false} playListId={''} handleRefreshPlaylsit={()=>{}} playListAudioQueue={[]} key={sig.index} audioTitle={sig.item.filename} indexOfAudioFiles={sig.index} audioId={sig.item.id} audioUri={sig.item.uri} handleTitleSelect={handleAudioSelect}></AudioSingleList>)}}
                    onEndReachedThreshold={.5}
                    onEndReached={({distanceFromEnd})=>loadMore()}
                    refreshing={minimumAudioFiles}
                    />
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
