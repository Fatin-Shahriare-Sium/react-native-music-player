import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

const EmptyComponet = ({ message }) => {
  return (
    <View style={styles.emptyComponetWrapper}>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export default EmptyComponet;

const styles = StyleSheet.create({
  emptyComponetWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
