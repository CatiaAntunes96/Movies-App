import React from "react";

import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

import ContentPage from "./Components/page-content";
import PopularMoviesPage from "./Components/popular-movies-page";
import PopularSeriesPage from "./Components/popular-series-page";
import { Icon } from "react-native-elements";
import SearchResults from "./Components/search-results.";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Popular Movies") {
              iconName = focused ? "movie-open" : "movie-open-outline";
            } else if (route.name === "Popular Tv Series") {
              iconName = focused ? "television-classic" : "television-classic";
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "#F7A072",
          tabBarInactiveTintColor: "grey",
        })}
      >
        <Tab.Screen
          name="Popular Movies"
          component={PopularMoviesPage}
          options={{
            tabBarItemStyle: {
              margin: 5,

              marginBottom: 5,
            },
            headerStyle: {
              height: 50,
            },
          }}
        />
        <Tab.Screen
          name="Popular Tv Series"
          component={PopularSeriesPage}
          options={{
            tabBarItemStyle: {
              margin: 5,
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
}

const Stack = createNativeStackNavigator();

function LogoHome() {
  const navigation = useNavigation();

  return (
    <Icon
      name="home"
      type="font-awesome"
      color={"#F9F7F3"}
      onPress={() => {
        navigation.navigate("Home");
      }}
    />
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{
            headerStyle: {
              backgroundColor: "#F45D01",
            },
            headerTintColor: "#fff",

            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "sans-serif",
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Details"
          component={ContentPage}
          options={{
            headerRight: () => <LogoHome />,
            headerStyle: {
              backgroundColor: "#F45D01",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontFamily: "sans-serif",
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Results"
          component={SearchResults}
          options={{
            headerRight: () => <LogoHome />,
            headerStyle: {
              backgroundColor: "#F45D01",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontFamily: "sans-serif",
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
