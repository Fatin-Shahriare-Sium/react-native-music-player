import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MusicProvider from '../context/musicProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, Tabs } from 'expo-router';
import MiniAudioBox from '../components/miniAudioBox';
import MiniAudioBoxWrapper from '../components/miniAudioBoxWrapper';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import CustomTabIcon from '../components/customTabIcon';
import homeIcon from "../assets/home.png"
import searchIcon from "../assets/search.png"
import libraryIcon from "../assets/library.png"
const _layout = () => {


  return (
    <SafeAreaView>
       
          <MusicProvider>
          <View style={{height:Dimensions.get("window").height,backgroundColor:"black"}} >
            <Tabs screenOptions={{tabBarStyle:styles.customTabBarStyle,tabBarShowLabel:false,}}  tabBar={(props)=>{
             return(
              <View style={{backgroundColor:"blue",marginBottom:"8%"}}>
             <MiniAudioBoxWrapper></MiniAudioBoxWrapper>
              <BottomTabBar {...props} />
              </View>
             )
              
            }} >
              <Tabs.Screen name='index' options={{headerShown:false,tabBarIcon:({focused})=>{
                  return(
                    <CustomTabIcon focused={focused} tabName={"Home"} icon={homeIcon}></CustomTabIcon>
                  )
              }}} />
              <Tabs.Screen name='search' options={{headerShown:false,tabBarIcon:({focused})=>{
                 return(
                  <CustomTabIcon focused={focused} tabName={"Search"} icon={searchIcon}></CustomTabIcon>
                )
              }}}/>
              <Tabs.Screen name='(library)'  options={{headerShown:false,tabBarIcon:({focused})=>{
                   return(
                    <CustomTabIcon focused={focused} tabName={"Library"} icon={libraryIcon}></CustomTabIcon>
                  )
              }}} />
            
            </Tabs>
 
            </View>
          </MusicProvider>
       
    </SafeAreaView>
    
  )
}

export default _layout;

const styles = StyleSheet.create({
  customTabBarStyle:{
    backgroundColor:"#222221",
    borderTopColor:"black",
    borderTopWidth:2
  }
})