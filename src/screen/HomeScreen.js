import React, { useEffect, useState } from "react";
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
import ProductServices from "../services/ProductServices";
import LinearGradient from "react-native-linear-gradient";
import AuthenticationService from "../services/AuthenticationService";
import { GeneralAction } from "../redux/GeneralAction";
import { Colors } from "../constants";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { items, totalItems } = useSelector((state) => state.cart);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const getProductQuantity = (productId) => {
    return items[productId] ? items[productId].quantity : 0;
  };

  const token = useSelector((state) => state?.generalState?.token);

  useEffect(() => {
    ProductServices.getProduct(token).then((res) => {
      if (res.status) {
        const fetchedProducts = res?.data?.data;
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      }
    });
    AuthenticationService.userDetails(token).then((res) => {
      if (res.status) {
        dispatch(GeneralAction.setUserDetails(res?.data?.user));
      }
    });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = products.filter((product) =>
        product.productType.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <LinearGradient
      colors={["#F0F4F8", "#FFFFFF"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
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
            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => navigation.navigate("ProfileScreen")}
              >
                {/* <Image
                  source={require("../assets/images/profile-placeholder.png")}
                  style={styles.profileImage}
                /> */}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.notificationButton}
                onPress={() => navigation.navigate("CartScreen")}
              >
                <Icon name="cart" size={33} color="#333" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>{totalItems}</Text>
                </View>
              </TouchableOpacity>
            </View>
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
                placeholder="Search products..."
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={handleSearch}
              />
              {searchQuery ? (
                <TouchableOpacity onPress={() => handleSearch("")}>
                  <Icon name="close-circle" size={20} color="#888" />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>

          {/* Product Selling Button */}
          <TouchableOpacity
            style={styles.sellProductButtonContainer}
            onPress={() => navigation.navigate("UserProductSellScreen")}
          >
            <LinearGradient
              colors={["#4CAF50", "#45A049"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.sellProductButton}
            >
              <Icon name="add-circle" size={24} color="#ffffff" />
              <Text style={styles.sellProductButtonText}>
                Sell Your Product
              </Text>
              <Icon name="chevron-forward" size={24} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>

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
              <Text style={styles.featuredTitle}>
                {searchQuery
                  ? `Search Results (${filteredProducts.length})`
                  : "Featured Products"}
              </Text>
            </View>

            {/* Products Grid */}
            <View style={styles.productsGrid}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TouchableOpacity
                    key={product.id}
                    style={styles.productCard}
                    onPress={() =>
                      navigation.navigate("ProductDetailedScreen", { product })
                    }
                  >
                    <LinearGradient
                      colors={[Colors.LIGHT_GREY4, Colors.LIGHT_GREY3]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.productCardGradient}
                    >
                      <Image
                        source={{ uri: product?.images[0]?.url }}
                        style={styles.productImage}
                      />
                      <View style={styles.productInfo}>
                        <Text style={styles.productName}>
                          {product.productType}
                        </Text>
                        <Text style={styles.productPrice}>{product.price}</Text>
                      </View>

                      {getProductQuantity(product.id) === 0 ? (
                        <TouchableOpacity
                          style={styles.addToCartButton}
                          onPress={() => handleAddToCart(product)}
                        >
                          <Icon name="add-circle" size={24} color="#4CAF50" />
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.productCartControl}>
                          <TouchableOpacity
                            onPress={() => handleRemoveFromCart(product)}
                          >
                            <Icon
                              name="remove-circle"
                              size={24}
                              color="#FF6B6B"
                            />
                          </TouchableOpacity>
                          <Text style={styles.quantityText}>
                            {getProductQuantity(product.id)}
                          </Text>
                          <TouchableOpacity
                            onPress={() => handleAddToCart(product)}
                          >
                            <Icon name="add-circle" size={24} color="#4CAF50" />
                          </TouchableOpacity>
                        </View>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noResultsText}>No products found</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileButton: {
    marginRight: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cartButton: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#FF6B6B",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  noResultsText: {
    width: "100%",
    textAlign: "center",
    color: "#888",
    marginTop: 20,
    fontSize: 16,
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
  productCardGradient: {
    flex: 1,
  },
  productCartControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 12,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  sellProductButtonContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sellProductButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  sellProductButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});

export default HomeScreen;
