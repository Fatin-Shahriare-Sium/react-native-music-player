import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MusicProvider from '../context/musicProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, Tabs } from 'expo-router';
import MiniAudioBox from '../components/miniAudioBox';
import MiniAudioBoxWrapper from '../components/miniAudioBoxWrapper';
import { BottomTabBar } from '@react-navigation/bottom-tabs';


const _layout = () => {

  return (
    <SafeAreaView>
       
          <MusicProvider>
          <View style={{height:Dimensions.get("window").height}} >
            <Tabs screenOptions={{tabBarStyle:{backgroundColor:"red",marginBottom:"8%"}}}  tabBar={(props)=>{
             return(
              <>
             <MiniAudioBoxWrapper></MiniAudioBoxWrapper>
              <BottomTabBar {...props} />
              </>
             )
              
            }} >
              <Tabs.Screen name='index' options={{headerShown:false}} />
            </Tabs>
 
            </View>
          </MusicProvider>
       
    </SafeAreaView>
    
  )
}

export default _layout;

const styles = StyleSheet.create({})