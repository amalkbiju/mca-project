import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";
import {
  Container,
  Separator,
  Typography,
} from "react-native-tillring-components";

const Stack = createStackNavigator();

// Product data
const products = [
  {
    id: "1",
    name: "Rice Seeds",
    price: "$15/kg",
    image: require("../assets/images/cowImage.jpg"),
  },
  {
    id: "2",
    name: "Lime",
    price: "$5/pcs",
    image: require("../assets/images/cowImage.jpg"),
  },
  {
    id: "3",
    name: "Tractors",
    price: "Contact us",
    image: require("../assets/images/cowImage.jpg"),
  },
  {
    id: "4",
    name: "Peas Seeds",
    price: "$12/kg",
    image: require("../assets/images/cowImage.jpg"),
  },
  {
    id: "5",
    name: "Rice Seeds",
    price: "$15/kg",
    image: require("../assets/images/cowImage.jpg"),
  },
  {
    id: "6",
    name: "Lime",
    price: "$5/pcs",
    image: require("../assets/images/cowImage.jpg"),
  },
  {
    id: "7",
    name: "Tractors",
    price: "Contact us",
    image: require("../assets/images/cowImage.jpg"),
  },
  {
    id: "8",
    name: "Peas Seeds",
    price: "$12/kg",
    image: require("../assets/images/cowImage.jpg"),
  },
];

const relatedProducts = [
  { id: "1", image: "https://placeholder.com/related1" },
  { id: "2", image: "https://placeholder.com/related2" },
  { id: "3", image: "https://placeholder.com/related3" },
  { id: "4", image: "https://placeholder.com/related4" },
  { id: "5", image: "https://placeholder.com/related5" },
];

const HomeScreen = ({ navigation }) => {
  const [addToCart, setAddToCart] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity>
              <Icon name="menu-outline" size={24} color="#333" />
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerGreeting}>Hi Wilson! 👋</Text>
              <Text style={styles.headerSubtitle}>Enjoy our services!</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications-outline" size={24} color="#333" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>1</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Icon
              name="search-outline"
              size={20}
              color="#888"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search here..."
              placeholderTextColor="#888"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="options-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Free Consultation Banner */}
        <View style={styles.consultationBanner}>
          <View style={styles.consultationTextContainer}>
            <Text style={styles.consultationTitle}>Free Consultation</Text>
            <Text style={styles.consultationSubtitle}>
              Get free support from our customer service
            </Text>
            <TouchableOpacity style={styles.callNowButton}>
              <Text style={styles.callNowText}>Call Now</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: "https://placeholder.com/150" }}
            style={styles.consultationImage}
            resizeMode="contain"
          />
        </View>

        {/* Featured Products */}
        <View style={styles.featuredContainer}>
          <View style={styles.featuredHeader}>
            <Text style={styles.featuredTitle}>Featured Products</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Products Grid */}
          <View style={styles.productsGrid}>
            {products.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate("ProductDetailedScreen", { product })
                }
              >
                <Image
                  source={product.image}
                  style={styles.productImage}
                  resizeMode="cover"
                />
                <View style={styles.productSaveButton}>
                  <Icon name="bookmark-outline" size={16} color="#fff" />
                </View>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.productPriceContainer}>
                  <Text style={styles.productPrice}>{product.price}</Text>

                  <Container row aCenter jCenter>
                    {addToCart > 0 && (
                      <>
                        <TouchableOpacity
                          style={styles.addButton}
                          onPress={() => setAddToCart(addToCart - 1)}
                        >
                          <FeatherIcon name="minus" size={18} color="#fff" />
                        </TouchableOpacity>
                        <Separator width={5} />
                        <Typography>{addToCart}</Typography>
                        <Separator width={5} />
                      </>
                    )}

                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => setAddToCart(addToCart + 1)}
                    >
                      <Icon name="add-outline" size={18} color="#fff" />
                    </TouchableOpacity>
                  </Container>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={24} color="#4CAF50" />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="grid-outline" size={24} color="#ABABAB" />
          <Text style={styles.navText}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="cart-outline" size={24} color="#ABABAB" />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="person-outline" size={24} color="#ABABAB" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Home Screen Styles
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTextContainer: {
    marginLeft: 16,
  },
  headerGreeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  notificationButton: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF5252",
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationCount: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#333",
  },
  filterButton: {
    backgroundColor: "#4CAF50",
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  consultationBanner: {
    flexDirection: "row",
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    padding: 16,
    margin: 16,
    alignItems: "center",
  },
  consultationTextContainer: {
    flex: 1,
  },
  consultationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  consultationSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    marginBottom: 10,
  },
  callNowButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  callNowText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  consultationImage: {
    width: 100,
    height: 100,
  },
  featuredContainer: {
    paddingHorizontal: 16,
  },
  featuredHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllButton: {
    color: "#4CAF50",
    fontSize: 14,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
  },
  productSaveButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 8,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
    marginLeft: 4,
    color: "#333",
  },
  productPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    paddingHorizontal: 4,
    paddingBottom: 8,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    width: 26,
    height: 26,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomNavigation: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#EFEFEF",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: "#ABABAB",
  },
  activeNavText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },

  // Product Details Screen
  detailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  detailsHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  detailsImage: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginHorizontal: 16,
  },
  productInfo: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  productTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productDetailTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  productDetailPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  priceUnit: {
    fontSize: 14,
    color: "#888",
    marginLeft: 2,
  },
  stockStatus: {
    fontSize: 14,
    color: "#4CAF50",
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  quantityButton: {
    backgroundColor: "#4CAF50",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  descriptionContainer: {
    marginTop: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  readMoreText: {
    color: "#4CAF50",
    marginTop: 4,
  },
  relatedContainer: {
    marginTop: 24,
    marginBottom: 100,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  relatedProductItem: {
    marginRight: 12,
  },
  relatedProductImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#EFEFEF",
  },
  addToCartButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
