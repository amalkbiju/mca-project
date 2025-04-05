import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import { clearCart } from "../redux/cartSlice";
import Display from "../utils/Display";
import { useNavigation } from "@react-navigation/native";
import ProductServices from "../services/ProductServices";

const UserSellPaymentScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.generalState?.token);
  const userDetails = useSelector((state) => state?.generalState?.userDetails);
  const selectedProductName = route.params.selectedProductName;
  const imagesUrls = route.params.imagesUrls;
  const moisture = route.params.moisture;
  const sands = route.params.sands;
  const da = route.params.da;
  const calcium = route.params.calcium;
  const price = route.params.price;
  const vehicleNumbers = route.params.vehicleNumbers;
  const noOfVechile = route.params.noOfVechile;
  const totalWeight = route.params.totalWeight;
  const productTrack = route.params.productTrack;
  const kg = route.params.kg;

  const { items, totalItems, totalAmount } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Errors state
  const [errors, setErrors] = useState({});

  const cartItemsArray = Object.values(items);

  // Input change handler
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Payment method change handler
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    // Zip Code validation
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Zip Code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Invalid Zip Code";
    }

    // Payment method specific validations
    if (paymentMethod === "card") {
      // Card Number validation
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = "Card Number is required";
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Invalid Card Number";
      }

      // Expiry Date validation
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = "Expiry Date is required";
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = "Invalid Expiry Date (MM/YY)";
      }

      // CVV validation
      if (!formData.cvv.trim()) {
        newErrors.cvv = "CVV is required";
      } else if (!/^\d{3}$/.test(formData.cvv)) {
        newErrors.cvv = "Invalid CVV";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Order confirmation handler
  //   const handleConfirmOrder = () => {
  //     if (validateForm()) {
  //       setOrderConfirmed(true);
  //       setTimeout(() => {
  //         dispatch(clearCart());
  //         navigation.navigate("TrackingScreen", {
  //           orderDetails: {
  //             ...formData,
  //             totalAmount: totalAmount + 5,
  //             items: cartItemsArray,
  //           },
  //         });
  //       }, 2000);
  //     }
  //   };

  // Render order confirmation animation
  if (orderConfirmed) {
    return (
      <View style={styles.confirmationContainer}>
        <LottieView
          source={require("../assets/animation/conform.json")}
          autoPlay
          loop={false}
          style={styles.lottieAnimation}
        />
      </View>
    );
  }
  const handleConfirmOrder = async () => {
    const createProductResponse = await ProductServices.createUserProduct(
      token,
      selectedProductName,
      imagesUrls,
      moisture,
      sands,
      da,
      calcium,
      kg,
      price,
      vehicleNumbers,
      noOfVechile,
      totalWeight,
      productTrack,
      userDetails
    );

    if (createProductResponse.status) {
      Alert.alert("Success", "Product uploaded successfully!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("UserSellProductList"),
        },
      ]);
    } else {
      throw new Error(
        "Failed to create product: " + createProductResponse.message
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Order Summary */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          {cartItemsArray.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <View style={styles.orderItemDetails}>
                <Text style={styles.orderItemName}>{item.productType}</Text>
                <Text style={styles.orderItemQuantity}>x{item.quantity}</Text>
              </View>
              <Text style={styles.orderItemPrice}>
                ${(item.numericPrice * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
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
        </View>

        {/* Shipping Information */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Shipping Information</Text>

          {/* Full Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={[styles.input, errors.fullName && styles.inputError]}
              placeholder="Enter your full name"
              placeholderTextColor="#999"
              value={formData.fullName}
              onChangeText={(value) => handleInputChange("fullName", value)}
            />
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}
          </View>

          {/* Address Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              style={[styles.input, errors.address && styles.inputError]}
              placeholder="Enter your address"
              placeholderTextColor="#999"
              value={formData.address}
              onChangeText={(value) => handleInputChange("address", value)}
            />
            {errors.address && (
              <Text style={styles.errorText}>{errors.address}</Text>
            )}
          </View>

          {/* City and Zip Code Row */}
          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                style={[styles.input, errors.city && styles.inputError]}
                placeholder="City"
                placeholderTextColor="#999"
                value={formData.city}
                onChangeText={(value) => handleInputChange("city", value)}
              />
              {errors.city && (
                <Text style={styles.errorText}>{errors.city}</Text>
              )}
            </View>

            <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.inputLabel}>Zip Code</Text>
              <TextInput
                style={[styles.input, errors.zipCode && styles.inputError]}
                placeholder="Zip Code"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={formData.zipCode}
                onChangeText={(value) => handleInputChange("zipCode", value)}
              />
              {errors.zipCode && (
                <Text style={styles.errorText}>{errors.zipCode}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          {/* Card Payment Option */}
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "card" && styles.selectedPaymentOption,
            ]}
            onPress={() => handlePaymentMethodChange("card")}
          >
            <View style={styles.paymentOptionLeft}>
              <View
                style={[
                  styles.paymentRadio,
                  paymentMethod === "card" && styles.selectedPaymentRadio,
                ]}
              />
              <Text style={styles.paymentOptionText}>Credit/Debit Card</Text>
            </View>
            <Icon name="card-outline" size={24} color="#333" />
          </TouchableOpacity>

          {/* Cash Payment Option */}
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "cash" && styles.selectedPaymentOption,
            ]}
            onPress={() => handlePaymentMethodChange("cash")}
          >
            <View style={styles.paymentOptionLeft}>
              <View
                style={[
                  styles.paymentRadio,
                  paymentMethod === "cash" && styles.selectedPaymentRadio,
                ]}
              />
              <Text style={styles.paymentOptionText}>Cash on Delivery</Text>
            </View>
            <Icon name="cash-outline" size={24} color="#333" />
          </TouchableOpacity>

          {/* Card Payment Details */}
          {paymentMethod === "card" && (
            <>
              {/* Card Number Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Card Number</Text>
                <TextInput
                  style={[styles.input, errors.cardNumber && styles.inputError]}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={formData.cardNumber}
                  onChangeText={(value) =>
                    handleInputChange("cardNumber", value)
                  }
                  maxLength={16}
                />
                {errors.cardNumber && (
                  <Text style={styles.errorText}>{errors.cardNumber}</Text>
                )}
              </View>

              {/* Expiry and CVV Row */}
              <View style={styles.rowContainer}>
                <View
                  style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}
                >
                  <Text style={styles.inputLabel}>Expiry Date</Text>
                  <TextInput
                    style={[
                      styles.input,
                      errors.expiryDate && styles.inputError,
                    ]}
                    placeholder="MM/YY"
                    placeholderTextColor="#999"
                    value={formData.expiryDate}
                    onChangeText={(value) =>
                      handleInputChange("expiryDate", value)
                    }
                    maxLength={5}
                  />
                  {errors.expiryDate && (
                    <Text style={styles.errorText}>{errors.expiryDate}</Text>
                  )}
                </View>

                <View
                  style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}
                >
                  <Text style={styles.inputLabel}>CVV</Text>
                  <TextInput
                    style={[styles.input, errors.cvv && styles.inputError]}
                    placeholder="123"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    secureTextEntry
                    value={formData.cvv}
                    onChangeText={(value) => handleInputChange("cvv", value)}
                    maxLength={3}
                  />
                  {errors.cvv && (
                    <Text style={styles.errorText}>{errors.cvv}</Text>
                  )}
                </View>
              </View>
            </>
          )}
        </View>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => handleConfirmOrder()}
        >
          <Text style={styles.confirmButtonText}>Confirm Order</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Confirm Button */}
      {/* <View style={styles.confirmContainer}>
        <View style={styles.totalAmountContainer}>
          <Text style={styles.totalAmountLabel}>Total</Text>
          <Text style={styles.totalAmountValue}>
            ${(totalAmount + 5).toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmOrder}
        >
          <Text style={styles.confirmButtonText}>Confirm Order</Text>
        </TouchableOpacity>
      </View> */}
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
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionContainer: {
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  orderItemDetails: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 14,
    color: "#333",
  },
  orderItemQuantity: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  orderItemPrice: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#EFEFEF",
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
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
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DEDEDE",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#333",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  rowContainer: {
    flexDirection: "row",
  },
  paymentOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DEDEDE",
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedPaymentOption: {
    borderColor: "#4CAF50",
  },
  paymentOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#DEDEDE",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedPaymentRadio: {
    borderColor: "#4CAF50",
    backgroundColor: "#fff",
    borderWidth: 2,
    padding: 2,
  },
  paymentOptionText: {
    fontSize: 14,
    color: "#333",
  },
  confirmContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#EFEFEF",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  confirmationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  lottieAnimation: {
    width: 300,
    height: 300,
  },
  totalAmountContainer: {
    flex: 1,
  },
  totalAmountLabel: {
    fontSize: 12,
    color: "#888",
  },
  totalAmountValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: Display.setWidth(90),
    alignSelf: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserSellPaymentScreen;
