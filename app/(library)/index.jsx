import { ScrollView, StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import addPlayListIcon from "../../assets/add-playlist.png"
import musicLogo from "../../assets/music.png"
import loveRedIcon from "../../assets/love-red.png"
import { router } from 'expo-router'
import CreatePlayList from '../../components/createPlaylist'
import { useCreatePlaylist, useGetAllPlayLists } from '../../hooks/usePlayList'
const Index = () => {
    let [isShowModal,setIsShowModal]=useState(false)
    let [allPlayLists,setAllPlaylists]=useState([])
    useEffect(()=>{
        useGetAllPlayLists().then((res)=>{
            console.log("AllPlaylists in useeefect",res);
            
            setAllPlaylists([...res])
        })
    },[])   
    let handleModal=()=>{
        setIsShowModal(!isShowModal)
    }
    let handleCreatePlayList=async (nameOfPlayList)=>{
        console.log("handleCreatePlayList",nameOfPlayList);
        
        let result=await useCreatePlaylist(nameOfPlayList)
        setAllPlaylists([...result])
       
    }

  return (
    <>
        <ScrollView>
            <View>
                <TouchableOpacity onPress={handleModal} >
                    <Image source={addPlayListIcon}/>
                    <Text>Create new PlayList</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>router.push("/favourite")}>
                    <Image source={loveRedIcon}/>
                    <Text>Favourites</Text>
                </TouchableOpacity>
                {allPlayLists.map((sig,index)=>{
                    return(
                        <TouchableOpacity onPress={()=>router.push(`/${sig.id}`)}>
                            <Image source={musicLogo}/>
                            <Text>{sig.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <CreatePlayList modalShow={isShowModal} handleModal={handleModal} handleCreatePlayList={handleCreatePlayList}  ></CreatePlayList>
        </ScrollView>
     
    </>
  )
}

export default Index;

const styles = StyleSheet.create({})