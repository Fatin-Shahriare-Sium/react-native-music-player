import { Dimensions, StyleSheet, View, StatusBar } from "react-native";
import React from "react";
import MusicProvider from "../context/musicProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs } from "expo-router";
import MiniAudioBoxWrapper from "../components/miniAudioBoxWrapper";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import CustomTabIcon from "../components/customTabIcon";
import homeIcon from "../assets/home.png";
import searchIcon from "../assets/search.png";
import libraryIcon from "../assets/library.png";
const _layout = () => {
  return (
    <SafeAreaView>
      <StatusBar hidden={true} />
      <MusicProvider>
        <View
          style={{
            height: Dimensions.get("window").height,
            backgroundColor: "black",
          }}
        >
          <Tabs
            screenOptions={{
              tabBarStyle: styles.customTabBarStyle,
              tabBarShowLabel: false,
            }}
            tabBar={(props) => {
              return (
                <View>
                  <MiniAudioBoxWrapper></MiniAudioBoxWrapper>
                  <BottomTabBar
                    style={{ height: Dimensions.get("window").height * 0.08 }}
                    {...props}
                  />
                </View>
              );
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                  return (
                    <CustomTabIcon
                      focused={focused}
                      tabName={"Home"}
                      icon={homeIcon}
                    ></CustomTabIcon>
                  );
                },
              }}
            />
            <Tabs.Screen
              name="search"
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                  return (
                    <CustomTabIcon
                      focused={focused}
                      tabName={"Search"}
                      icon={searchIcon}
                    ></CustomTabIcon>
                  );
                },
              }}
            />
            <Tabs.Screen
              name="(library)"
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                  return (
                    <CustomTabIcon
                      focused={focused}
                      tabName={"Library"}
                      icon={libraryIcon}
                    ></CustomTabIcon>
                  );
                },
              }}
            />
          </Tabs>
        </View>
      </MusicProvider>
    </SafeAreaView>
  );
};

export default _layout;

const styles = StyleSheet.create({
  customTabBarStyle: {
    backgroundColor: "#222221",
    borderTopColor: "black",
    borderTopWidth: 2,
  },
});
