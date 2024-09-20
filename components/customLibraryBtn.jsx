import { StyleSheet, Text, TouchableOpacity,Image,Dimensions} from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const CustomLibraryBtn = ({icon,href,btnName}) => {
  return (
    <>
         <TouchableOpacity style={styles.libraryBtn} onPress={()=>router.push(`/${href}`)} >
                    <Image source={icon}/>
                    <Text style={{color:"white",fontSize:17,fontWeight:"bold",marginLeft:"2%"}}>{btnName}</Text>
        </TouchableOpacity>
    </>
  )
}

export default CustomLibraryBtn

const styles = StyleSheet.create({
    libraryBtn:{
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