// src/screens/HomeScreen.js
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
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { Container } from "react-native-tillring-components";
import { addToCart, removeFromCart } from "../redux/cartSlice";

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

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { items, totalItems } = useSelector((state) => state.cart);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

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
                  navigation.navigate("ProductDetail", { product })
                }
              >
                <Image source={product.image} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>{product.price}</Text>
                </View>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart(product)}
                >
                  <Icon name="add-circle" size={24} color="#4CAF50" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {["Seeds", "Tools", "Machinery", "Fertilizers", "Pesticides"].map(
              (category, index) => (
                <TouchableOpacity key={index} style={styles.categoryCard}>
                  <View style={styles.categoryIconContainer}>
                    <Icon
                      name={
                        index === 0
                          ? "leaf-outline"
                          : index === 1
                          ? "hammer-outline"
                          : index === 2
                          ? "car-outline"
                          : index === 3
                          ? "flask-outline"
                          : "shield-outline"
                      }
                      size={24}
                      color="#4CAF50"
                    />
                  </View>
                  <Text style={styles.categoryName}>{category}</Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>
        </View>

        {/* Blog Section */}
        <View style={styles.blogContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Articles</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.blogScroll}
          >
            {[
              { title: "Top 5 Seeds for Summer", date: "March 2, 2025" },
              {
                title: "How to Increase Farm Yield",
                date: "February 24, 2025",
              },
              {
                title: "Sustainable Farming Methods",
                date: "February 15, 2025",
              },
            ].map((article, index) => (
              <TouchableOpacity key={index} style={styles.blogCard}>
                <Image
                  source={require("../assets/images/cowImage.jpg")}
                  style={styles.blogImage}
                />
                <View style={styles.blogContent}>
                  <Text style={styles.blogTitle}>{article.title}</Text>
                  <Text style={styles.blogDate}>{article.date}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Cart Button */}
      {totalItems > 0 && (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate("CartScreen")}
        >
          <Icon name="cart-outline" size={24} color="#fff" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartCount}>{totalItems}</Text>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTextContainer: {
    marginLeft: 12,
  },
  headerGreeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  notificationButton: {
    position: "relative",
    padding: 4,
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#FF6B6B",
    borderRadius: 10,
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
    marginVertical: 12,
    alignItems: "center",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    height: 44,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  filterButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  consultationBanner: {
    flexDirection: "row",
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  consultationTextContainer: {
    flex: 1,
  },
  consultationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  consultationSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  callNowButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  callNowText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  consultationImage: {
    width: 80,
    height: 80,
  },
  featuredContainer: {
    marginTop: 16,
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
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "500",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "48%",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  addToCartButton: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  categoriesContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  categoriesScroll: {
    paddingBottom: 12,
  },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: "center",
    width: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIconContainer: {
    backgroundColor: "#E8F5E9",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  blogContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  blogScroll: {
    paddingBottom: 16,
  },
  blogCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: 220,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  blogImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  blogContent: {
    padding: 12,
  },
  blogTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  blogDate: {
    fontSize: 12,
    color: "#888",
  },
  cartButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#4CAF50",
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  cartBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#FF6B6B",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartCount: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default HomeScreen;
