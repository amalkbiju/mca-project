import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import { Colors } from "../constants";

const ProfileScreen = () => {
  const nav = useNavigation();
  const userData = {
    email: "test@gmail.com",
    userId: "464a0b48-3961-42e0-a27a-d2ffb918d56b",
    username: "Test",
  };
  const userDetails = useSelector((state) => state?.generalState?.userDetails);
  // Get first letter of username for avatar
  const userInitial = userDetails.username.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => nav.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Icon name="settings" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileImageSection}>
          <View style={styles.profileImage}>
            <Text style={styles.profileInitial}>{userInitial}</Text>
          </View>
          <Text style={styles.username}>{userDetails.username}</Text>
          <Text style={styles.email}>{userDetails.email}</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>

          <TouchableOpacity style={styles.menuItem}>
            <Icon
              name="person"
              size={22}
              color="#4c669f"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Edit Profile</Text>
            <Icon name="chevron-right" size={22} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon
              name="email"
              size={22}
              color="#4c669f"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Change Email</Text>
            <Icon name="chevron-right" size={22} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon
              name="lock"
              size={22}
              color="#4c669f"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Change Password</Text>
            <Icon name="chevron-right" size={22} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon
              name="notifications"
              size={22}
              color="#4c669f"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Notifications</Text>
            <Icon name="chevron-right" size={22} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>

          <TouchableOpacity style={styles.menuItem}>
            <Icon
              name="language"
              size={22}
              color="#4c669f"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Language</Text>
            <Icon name="chevron-right" size={22} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon
              name="security"
              size={22}
              color="#4c669f"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Privacy & Security</Text>
            <Icon name="chevron-right" size={22} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon
              name="help"
              size={22}
              color="#4c669f"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Help & Support</Text>
            <Icon name="chevron-right" size={22} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon
              name="info"
              size={22}
              color="#4c669f"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>About</Text>
            <Icon name="chevron-right" size={22} color="#ccc" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <LinearGradient
            colors={["#ff4757", "#ff6b81"]}
            style={styles.logoutGradient}
          >
            <Icon
              name="logout"
              size={22}
              color="#fff"
              style={styles.logoutIcon}
            />
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.userId}>
            User ID: {userDetails.userId.substring(0, 8)}...
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  settingsButton: {
    padding: 8,
  },
  profileImageSection: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  profileInitial: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#4c669f",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#ebebeb",
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  logoutGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  footer: {
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 16,
  },
  userId: {
    fontSize: 12,
    color: "#999",
  },
});

export default ProfileScreen;
