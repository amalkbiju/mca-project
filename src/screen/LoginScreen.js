import React, { useState } from "react";
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
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../constants";
import AuthenticationService from "../services/AuthenticationService";
import { GeneralAction } from "../redux/GeneralAction";
import { useDispatch } from "react-redux";

const LoginScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userType } = route.params || { userType: "user" };
  console.log("userType", userType);
  const login = () => {
    setIsLoading(true);

    if (userType === "admin") {
      console.log("admin login");
      AuthenticationService.adminLogin(name, password).then((res) => {
        console.log(res);
        if (res?.status) {
          console.log("token login", res?.data?.token);
          dispatch(GeneralAction.setToken(res?.data?.token));
          setIsLoading(false);
          navigation.navigate("AdminHomeScreen");
        }
      });
    } else if (userType === "user") {
      console.log("user login");
      AuthenticationService.login(name, password).then((res) => {
        console.log(res);
        if (res?.status) {
          console.log("token login", res?.data?.token);
          dispatch(GeneralAction.setToken(res?.data?.token));
          setIsLoading(false);
          navigation.navigate("HomeScreen");
        }
      });
    } else if (userType === "security") {
      console.log("security login");
      AuthenticationService.securityLogin(name, password).then((res) => {
        console.log(res);
        if (res?.status) {
          console.log("token login", res?.data?.token);
          dispatch(GeneralAction.setToken(res?.data?.token));
          setIsLoading(false);
          navigation.navigate("SecurityScreen");
        }
      });
    } else if (userType === "lab") {
      console.log("security login");
      AuthenticationService.labLogin(name, password).then((res) => {
        console.log(res);
        if (res?.status) {
          console.log("token login", res?.data?.token);
          dispatch(GeneralAction.setToken(res?.data?.token));
          setIsLoading(false);
          navigation.navigate("LabScreen");
        }
      });
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/Icon.png")}
            style={styles.smallLogo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>
            {userType === "user" ? "User Login" : "Admin Login"}
          </Text>

          <View style={styles.inputContainer}>
            <Icon
              name="mail-outline"
              size={20}
              color="#3b7c0b"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => setName(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name="lock-closed-outline"
              size={20}
              color="#3b7c0b"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              // secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={() => login()}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {userType === "user" && (
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("RegisterScreen")}
              >
                <Text style={styles.registerLink}>Register</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
    color: Colors.DEFAULT_COLOR,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: Colors.DEFAULT_COLOR,
    borderRadius: 10,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: Colors.DEFAULT_WHITE,
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
    color: Colors.DEFAULT_COLOR,
    fontWeight: "bold",
  },
});
