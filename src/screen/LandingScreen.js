import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import { Separator } from "react-native-tillring-components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Display from "../utils/Display";
import Entypo from "react-native-vector-icons/Entypo";
const LandingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Separator height={Display.setHeight(7)} />
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/Icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.companyName}>EVERGREEN DAIRY COMPANY</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.subtitle}>Our Online Platform</Text>

        <View style={styles.selectionContainer}>
          <TouchableOpacity
            style={styles.selectionButton}
            onPress={() =>
              navigation.navigate("LoginScreen", { userType: "user" })
            }
          >
            <Icon name="person-outline" size={30} color="#fff" />
            <Text style={styles.buttonText}>User Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.selectionButton}
            onPress={() =>
              navigation.navigate("LoginScreen", { userType: "admin" })
            }
          >
            <Icon name="shield-outline" size={30} color="#fff" />
            <Text style={styles.buttonText}>Admin Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.selectionContainer}>
          <TouchableOpacity
            style={styles.selectionButton}
            onPress={() =>
              navigation.navigate("LoginScreen", { userType: "security" })
            }
          >
            <MaterialCommunityIcons name="security" size={30} color="#fff" />
            <Text style={styles.buttonText}>Security</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.selectionButton}
            onPress={() =>
              navigation.navigate("LoginScreen", { userType: "lab" })
            }
          >
            <Entypo name="lab-flask" size={30} color="#fff" />
            <Text style={styles.buttonText}>Lab</Text>
          </TouchableOpacity>
        </View>
        <Separator height={Display.setHeight(7)} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#173f7e",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFF",
  },
  smallLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFF",
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 40,
  },
  selectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 40,
  },
  selectionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 20,
    width: "48%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  getStartedButton: {
    backgroundColor: "#2ecc71",
    borderRadius: 10,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  getStartedText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    marginTop: 20,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    marginBottom: 25,
    alignItems: "center",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color: "#333",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: "#3b7c0b",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#3b7c0b",
    borderRadius: 10,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#3b7c0b",
    borderRadius: 10,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  registerButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  registerText: {
    color: "#666",
  },
  registerLink: {
    color: "#3b7c0b",
    fontWeight: "bold",
  },
});

export default LandingScreen;
