import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  LandingScreen,
  WelcomeScreenCards,
  WelcomeScreen,
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  ProductDetailedScreen,
} from "../screen";

const Stack = createStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen
          name="WelcomeScreenCards"
          component={WelcomeScreenCards}
        />
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="ProductDetailedScreen"
          component={ProductDetailedScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
