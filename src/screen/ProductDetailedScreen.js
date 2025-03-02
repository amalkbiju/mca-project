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
import { useNavigation } from "@react-navigation/native";
import Display from "../utils/Display";

const ProductDetailedScreen = ({ route }) => {
  const relatedProducts = [
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
  ];

  const navigation = useNavigation();
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.detailsHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.detailsHeaderTitle}>Details</Text>
          <TouchableOpacity>
            <Icon name="bookmark-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <Image
          source={require("../assets/images/cowImage.jpg")}
          style={styles.detailsImage}
          resizeMode="cover"
        />

        {/* Product Info */}
        <View style={styles.productInfo}>
          <View style={styles.productTitleRow}>
            <Text style={styles.productDetailTitle}>Lime Seedlings</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.productDetailPrice}>$5</Text>
              <Text style={styles.priceUnit}>/pcs</Text>
            </View>
          </View>

          <Text style={styles.stockStatus}>Available in stock</Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>4.9 (192)</Text>
          </View>

          {/* Quantity Controls */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={decreaseQuantity}
            >
              <Icon name="remove" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}pcs</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={increaseQuantity}
            >
              <Icon name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              Limes are closely related to lemons. They even look similar to
              them. Lime tree harvest is easier when you are familiar with the
              different types of lime trees and what...
            </Text>
            <TouchableOpacity>
              <Text style={styles.readMoreText}>Read More</Text>
            </TouchableOpacity>
          </View>

          {/* Related Products */}
          <View style={styles.relatedContainer}>
            <Text style={styles.relatedTitle}>Related Products</Text>
            <FlatList
              data={relatedProducts}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.relatedProductItem}>
                  <Image
                    source={item.image}
                    style={styles.relatedProductImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailedScreen;

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
    width: Display.setWidth(95),
    height: 220,
    alignSelf: "center",
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
