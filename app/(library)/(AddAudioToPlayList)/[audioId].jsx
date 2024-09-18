import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import AddPlayListModal from '../../../components/addPlayListModal'

const AddToPlayListRepo = () => {
    let {audioId}=useLocalSearchParams()
    console.log("audioId",audioId);
    
  return (
    <View>
      <Text>addToPlayList</Text>
      <AddPlayListModal audioId={audioId}></AddPlayListModal>
    </View>
  )
}

export default AddToPlayListRepo;

const styles = StyleSheet.create({})