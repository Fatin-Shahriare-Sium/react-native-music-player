import { StyleSheet, Text, View ,Dimensions,Modal,TextInput,Pressable} from 'react-native'
import React, { useEffect, useState } from 'react'

const RenamePlaylistModal = ({handleModal,modalShow,preName,handleRenamePlaylist}) => {
    let [text,setText]=useState("")
    useEffect(()=>{
        setText(preName)
    },[preName])
  return (
        
    <Modal  onRequestClose={()=>handleModal()}  visible={modalShow}>
            <View style={styles.renameModalWrapper}>
                <View style={styles.renameModalBox}>
                    <Text style={{fontWeight:"bold",color:"white"}}>Rename Playlist</Text>
                    <TextInput style={{borderColor:"white",borderBottomWidth:1,color:"white"}} onChangeText={(e)=>setText(e)} value={text}></TextInput>
                    <View style={{display:"flex",justifyContent:"space-around",alignItems:"center",flexDirection:"row",marginTop:17}}>
                        <Pressable onPress={()=>handleModal()} style={{backgroundColor:"#f05a5a",paddingHorizontal:10,paddingVertical:5}}>
                            <Text style={{fontWeight:"bold"}}>Cancle</Text>
                        </Pressable>
                        
                        <Pressable onPressOut={()=>handleModal()} onPress={()=>handleRenamePlaylist(text)} style={{backgroundColor:"white",paddingHorizontal:10,paddingVertical:5}}>
                            <Text style={{fontWeight:"bold"}}>New Name</Text>
                        </Pressable>
                    
                    </View>
                </View>
            </View>
    </Modal>

  )
}

export default RenamePlaylistModal

const styles = StyleSheet.create({
    renameModalWrapper:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:Dimensions.get("window").height,
        width:Dimensions.get("window").width,
        backgroundColor:"#0d0c0c91"
    },
    renameModalBox:{
        width:Dimensions.get("window").width*.7,
        backgroundColor:"black",
        padding:20,
        borderRadius:10,
        bottom:"10%"
     
    }
})