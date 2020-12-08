import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";
import { TouchableOpacity } from "react-native-gesture-handler";


function HomeScreen({ navigation }) {
 const [colorArray, setColorArray] = useState([]);

 useEffect(() => {
  navigation.setOptions({
    headerRight: () => <Button onPress={addColor} title="Add color" />,
    headerLeft: () => <Button onPress={resetColor} title="Reset color" />,
  });
 });

 function renderItem({ item }) {
   return (
     <TouchableOpacity
       onPress={() => navigation.navigate("DetailsScreen", { ...item })}
     >
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
     <FlatList style={styles.list} data={colorArray} renderItem={renderItem} />
   </View>
 );
}

function DetailsScreen({ route }) {
 // Destructure this object so we don't have to type route.params.red etc
 const { red, green, blue } = route.params;

 return (
   <View
     style={[
       styles.container,
       { backgroundColor: `rgb(${red}, ${green}, ${blue})` },
     ]}
   >
     <View style={{ padding: 30 }}>
       <Text style={styles.detailText}>Red: {red}</Text>
       <Text style={styles.detailText}>Green: {green}</Text>
       <Text style={styles.detailText}>Blue: {blue}</Text>
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
 detailText: {
   fontSize: 24,
   marginBottom: 20,
 },
});
