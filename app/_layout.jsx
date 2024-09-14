import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MusicProvider from '../context/musicProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

const _layout = () => {
  return (
    <SafeAreaView style={{height:Dimensions.get("window").height,width:Dimensions.get("window").width}}>
        <MusicProvider>

             <Stack>
                <Stack.Screen name='index'options={{headerShown:false}}></Stack.Screen>
             </Stack>
 
        </MusicProvider>
    </SafeAreaView>
    
  )
}

export default _layout;

const styles = StyleSheet.create({})