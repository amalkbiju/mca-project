// src/screens/CartScreen.js
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { Typography } from "react-native-tillring-components";

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, totalItems, totalAmount } = useSelector((state) => state.cart);

  // Convert items object to array for FlatList
  const cartItemsArray = Object.values(items);
  console.log("items", cartItemsArray);
  // Check if cart is empty
  const isCartEmpty = cartItemsArray.length === 0;

  const handleIncreaseQuantity = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(removeFromCart(id));
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item?.images[0]?.url }}
        style={styles.itemImage}
        resizeMode="cover"
      />

      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.productType}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>

      <View style={styles.quantityControls}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleDecreaseQuantity(item.id)}
        >
          <Icon name="remove" size={18} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.quantityText}>{item.quantity}</Text>

        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleIncreaseQuantity(item)}
        >
          <Icon name="add" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={{ width: 24 }} />
      </View>

      {isCartEmpty ? (
        <View style={styles.emptyCartContainer}>
          <Icon name="cart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.startShoppingButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.startShoppingText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItemsArray}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cartListContent}
          />

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Items ({totalItems})</Text>
              <Text style={styles.summaryValue}>${totalAmount.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>$5.00</Text>
            </View>

            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                ${(totalAmount + 5).toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate("PaymentScreen")}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyCartText: {
    fontSize: 18,
    color: "#888",
    marginTop: 16,
    marginBottom: 24,
  },
  startShoppingButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  startShoppingText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartListContent: {
    padding: 16,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    paddingHorizontal: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: "#666",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    borderRadius: 20,
    padding: 4,
  },
  quantityButton: {
    backgroundColor: "#4CAF50",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginHorizontal: 12,
  },
  summaryContainer: {
    backgroundColor: "#F9F9F9",
    borderTopWidth: 1,
    borderTopColor: "#EFEFEF",
    padding: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  totalRow: {
    marginTop: 8,
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EFEFEF",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  checkoutButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;
