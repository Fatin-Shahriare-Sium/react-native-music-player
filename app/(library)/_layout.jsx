import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <View style={{height:Dimensions.get("window").height,backgroundColor:"black"}}>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name='libHome' />
      </Stack>
    </View>
  )
}

export default _layout

const styles = StyleSheet.create({})