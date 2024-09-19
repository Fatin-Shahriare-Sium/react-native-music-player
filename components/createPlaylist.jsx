import { Dimensions, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const CreatePlayList = ({modalShow,handleModal,handleCreatePlayList}) => {
    let [name,setName]=useState('')
  return (
  
        <Modal  onRequestClose={()=>handleModal()}  visible={modalShow}>
            <View style={styles.createPlayListWrapper}>
                <View style={styles.createPlaylistBox}>
                    <Text style={{fontWeight:"bold",color:"white"}}>Create Playlist</Text>
                    <TextInput style={{borderColor:"white",borderBottomWidth:1,color:"white"}} onChangeText={(e)=>setName(e)} value={name}></TextInput>
                    <View style={{display:"flex",justifyContent:"space-around",alignItems:"center",flexDirection:"row",marginTop:17}}>
                         <Pressable onPress={()=>handleModal()} style={{backgroundColor:"#f05a5a",paddingHorizontal:10,paddingVertical:5}}>
                            <Text style={{fontWeight:"bold"}}>Cancle</Text>
                        </Pressable>
                        
                        <Pressable onPressOut={()=>handleModal()} onPress={()=>handleCreatePlayList(name)} style={{backgroundColor:"white",paddingHorizontal:10,paddingVertical:5}}>
                            <Text style={{fontWeight:"bold"}}>Create</Text>
                        </Pressable>
                      
                    </View>
                </View>
            </View>
        </Modal>
   
  )
}

export default CreatePlayList;

const styles = StyleSheet.create({
    createPlayListWrapper:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:Dimensions.get("window").height,
        width:Dimensions.get("window").width,
        backgroundColor:"#0d0c0c91"
    },
    createPlaylistBox:{
        width:Dimensions.get("window").width*.7,
        backgroundColor:"black",
        padding:20,
        borderRadius:10,
        bottom:"10%"
     
    }
})