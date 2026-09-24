import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllWords from "./screens/AllWords";
import AddWord from "./screens/AddWord";
import EditWord from "./screens/EditWord";
import { COLORS } from "./constants";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primary900} />
      <Stack.Navigator
        initialRouteName="AllWords"
        screenOptions={{
          headerTransparent: true,
          // animation: "slide_from_right",
          headerTintColor: COLORS.primary900,
          headerTitleStyle: { color: COLORS.black },
          contentStyle: { backgroundColor: COLORS.appBackground },
        }}
      >
        <Stack.Screen
          name="AllWords"
          component={AllWords}
          options={{
            title: "My words",
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="AddWord"
          component={AddWord}
          options={{ title: "Adding word" }}
        />
        <Stack.Screen
          name="EditWord"
          component={EditWord}
          options={({ route }) => ({
            title: `Editing word "${route.params.wordData.word}"`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
