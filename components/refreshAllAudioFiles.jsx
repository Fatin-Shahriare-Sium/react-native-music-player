import { StyleSheet, Text, View,Dimensions ,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import refreshIocn from "../assets/refresh.png"
import { useMusicProvider } from '../context/musicProvider'
const RefreshAllAudioFilesBtn = () => {
    let {handleRefreshAllAudiosFiles}=useMusicProvider()
  return (
    <View>
            <TouchableOpacity style={styles.refreshBtn} onPress={()=>handleRefreshAllAudiosFiles()} >
                    <Image source={refreshIocn}/>
                    <Text style={{color:"white",fontSize:17,fontWeight:"bold",marginLeft:"2%"}}>Refresh Audio</Text>
        </TouchableOpacity>
      <Text>RefreshAllAudioFilesBtn</Text>
    </View>
  )
}

export default RefreshAllAudioFilesBtn

const styles = StyleSheet.create({
    refreshBtn:{
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        height:Dimensions.get("window").height*.1,
        flexDirection:"row",
        width:Dimensions.get("window").width*.9,
        backgroundColor:"#222221",
        padding:7,
        borderRadius:9,
        margin:3
    }
})