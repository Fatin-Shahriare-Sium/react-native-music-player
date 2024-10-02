import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
const CustomTabIcon = ({ icon, tabName, focused }) => {
  return (
    <View style={styles(focused).customTabWrapper}>
      <Image style={{ width: 23, height: 23 }} source={icon} />
      <Text style={{ color: "white", fontWeight: focused ? "bold" : 400 }}>
        {tabName}
      </Text>
    </View>
  );
};

export default CustomTabIcon;

const styles = (focused) =>
  StyleSheet.create({
    customTabWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: focused ? "#b0daf64a" : "inherit",
      paddingHorizontal: focused ? 7 : 0,
      borderRadius: focused ? 10 : 0,
      padding: 8,
    },
  });
