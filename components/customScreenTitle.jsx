import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomScreenTitle = ({title}) => {
  return (
    <View>
      <Text style={{color:"white",backgroundColor:"black",fontSize:30,fontWeight:700,padding:5}}>{title}</Text>
    </View>
  )
}

export default CustomScreenTitle;

const styles = StyleSheet.create({})