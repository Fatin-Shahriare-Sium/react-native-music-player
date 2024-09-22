import { ScrollView, StyleSheet, Text, TouchableOpacity, View ,Image, Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import addPlayListIcon from "../../assets/add-playlist.png"
import musicLogo from "../../assets/music.png"
import loveRedIcon from "../../assets/love-red.png"
import CreatePlayList from '../../components/createPlaylist'
import { useCreatePlaylist, useGetAllPlayLists } from '../../hooks/usePlayList'
import CustomScreenTitle from '../../components/customScreenTitle'
import CustomLibraryBtn from '../../components/customLibraryBtn'
import activeLogo from "../../assets/active.png"
import { useMusicProvider } from '../../context/musicProvider'
import RefreshAllAudioFilesBtn from '../../components/refreshAllAudioFiles'
const Index = () => {
    let {currentAudioFile,refreshLibraryPage}=useMusicProvider()
    let [isShowModal,setIsShowModal]=useState(false)
    let [allPlayLists,setAllPlaylists]=useState([])

    useEffect(()=>{
        useGetAllPlayLists().then((res)=>{
            console.log("AllPlaylists in useeefect",res);
            if(res){
                setAllPlaylists([...res])
            }
            
        })
    },[currentAudioFile,refreshLibraryPage])   

    let handleModal=()=>{
        setIsShowModal(!isShowModal)
    }
    let handleCreatePlayList=async (nameOfPlayList)=>{
        console.log("handleCreatePlayList",nameOfPlayList);
        
        let result=await useCreatePlaylist(nameOfPlayList)
        setAllPlaylists([...result])
       
    }

  return (
    <View style={{height:Dimensions.get("window").height*.8,backgroundColor:"black"}}>
        <CustomScreenTitle title={"Library"}/>
        <ScrollView>
            <View style={styles.libraryWrapper}>
                <TouchableOpacity style={styles.createPlayListBtn} onPress={handleModal} >
                    <Image source={addPlayListIcon}/>
                    <Text style={{color:"white",fontSize:17,fontWeight:"bold",marginLeft:"2%"}}>Create New PlayList</Text>
                </TouchableOpacity>
                <CustomLibraryBtn btnName={"Favourite Songs"} href={'favourite'} icon={loveRedIcon}/>
                {allPlayLists.map((sig,index)=>{
                    return(
                        <CustomLibraryBtn btnName={sig.name} icon={musicLogo} href={`${sig.id}`}/>
                    )
                })}
              <CustomLibraryBtn btnName={"Current Audio Queue"} icon={activeLogo} href={"queue"}/>
              <RefreshAllAudioFilesBtn/>
            </View>
            <CreatePlayList modalShow={isShowModal} handleModal={handleModal} handleCreatePlayList={handleCreatePlayList}  ></CreatePlayList>
        </ScrollView>
     
    </View>
  )
}

export default Index;

const styles = StyleSheet.create({
    createPlayListBtn:{
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
    },
    libraryWrapper:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:"3%"
    
    }
})