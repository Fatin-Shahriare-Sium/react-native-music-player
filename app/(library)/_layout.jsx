import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="libHome" />
      </Stack>
    </View>
  );
};

export default _layout;

const styles = StyleSheet.create({});
