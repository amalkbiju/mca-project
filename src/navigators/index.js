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
  CartScreen,
  PaymentScreen,
  TrackingScreen,
  UserProductSellScreen,
  UserSellProductList,
  UserSellProductDetailedScreen,
  SecurityScreen,
  LabScreen,
  UserSellPaymentScreen,
} from "../screen";
import { AdminHomeScreen } from "../screen/admin";

const Stack = createStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen
          name="WelcomeScreenCards"
          component={WelcomeScreenCards}
        />
        {/* <Stack.Screen name="LandingScreen" component={LandingScreen} /> */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen
          name="ProductDetailedScreen"
          component={ProductDetailedScreen}
        />
        <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} />

        <Stack.Screen name="TrackingScreen" component={TrackingScreen} />
        <Stack.Screen
          name="UserProductSellScreen"
          component={UserProductSellScreen}
        />
        <Stack.Screen
          name="UserSellProductList"
          component={UserSellProductList}
        />
        <Stack.Screen
          name="UserSellProductDetailedScreen"
          component={UserSellProductDetailedScreen}
        />
        <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
        <Stack.Screen name="LabScreen" component={LabScreen} />
        <Stack.Screen
          name="UserSellPaymentScreen"
          component={UserSellPaymentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
