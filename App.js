import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Button, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";
import { TouchableOpacity } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;
var numColumns = 4;

function HomeScreen({ navigation }) {
 const [colorArray, setColorArray] = useState([]);

 useEffect(() => {
  navigation.setOptions({
    headerRight: () => 
      <TouchableOpacity style={styles.button} onPress={addColor}>
        <Text style={styles.buttonText}>Add color</Text>
      </TouchableOpacity>,
    headerLeft: () => 
    <TouchableOpacity style={styles.button} onPress={resetColor}>
      <Text style={styles.buttonText}>Reset color</Text>
    </TouchableOpacity>,
  });
 });

 function renderItem({ item }) {
   return (
     <TouchableOpacity style={styles.itemColumn} onPress={() => navigation.navigate("DetailsScreen", { ...item })}>
       <BlockRGB red={item.red} green={item.green} blue={item.blue} />
     </TouchableOpacity>
   );
 }

 function addColor() {
   setColorArray([
     ...colorArray,
     {
       red: Math.floor(Math.random() * 256),
       green: Math.floor(Math.random() * 256),
       blue: Math.floor(Math.random() * 256),
       id: colorArray.length.toString(),
     },
   ]);
}

function resetColor() {
  setColorArray([]);
}

return (
   <View style={styles.container}>
     <FlatList style={styles.list} data={colorArray} renderItem={renderItem} numColumns={numColumns} />
   </View>
 );
}

function DetailsScreen({ route }) {
 // Destructure this object so we don't have to type route.params.red etc
 const { red, green, blue } = route.params;
 const total = red + green + blue;
 const textRed = 255 - red;
 const textGreen = 255 - green;
 const textBlue = 255 - blue;

 return (
   <View
     style={[
       styles.container, { backgroundColor: `rgb(${red}, ${green}, ${blue})` },]} >
     <View style={{ padding: 30 }}>
       <Text style={{color: `rgb(${textRed}, ${textGreen}, ${textBlue})`, fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>Red: {textRed}</Text>
       <Text style={{color: `rgb(${textRed}, ${textGreen}, ${textBlue})`, fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>Green: {textGreen}</Text>
       <Text style={{color: `rgb(${textRed}, ${textGreen}, ${textBlue})`, fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>Blue: {textBlue}</Text>
       {/*
       <Text style={total<350 ? styles.detailTextWhite : styles.detailTextBlack}>Red: {red}</Text>
       <Text style={total<350 ? styles.detailTextWhite : styles.detailTextBlack}>Green: {green}</Text>
       <Text style={total<350 ? styles.detailTextWhite : styles.detailTextBlack}>Blue: {blue}</Text>
       */}
     </View>
   </View>
 );
}

const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
      <Stack.Screen name="Colour List (九层糕)" component={HomeScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "center",
 },
 list: {
  width: "100%",
  },
 detailTextWhite: {
   fontSize: 24,
   color: 'white',
   marginBottom: 20,
 },
 detailTextBlack: {
  fontSize: 24,
  color: 'black',
  marginBottom: 20,
},
button: {
  width: 56,
  padding: 8,
  borderRadius: 10,
  marginRight: 15,
},
buttonText: {
  fontSize: 12,
  textAlign: 'center',
  color: '#2196F3',
},
itemColumn: {
  width: screenWidth / numColumns,
  aspectRatio: 1,
},
});
