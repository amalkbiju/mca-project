import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import ProductServices from "../services/ProductServices";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Container } from "react-native-tillring-components";
import Display from "../utils/Display";
import LottieView from "lottie-react-native";
import { Colors } from "../constants";

// Custom Dropdown Component
const CustomDropdown = ({
  label,
  options,
  selectedValue,
  onSelect,
  placeholder,
  onSelectLabel = () => {}, // Add a default no-op function
  error,
}) => {
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const onItemSelect = (item) => {
    onSelect(item.value);
    // Only call onSelectLabel if it's a function
    if (typeof onSelectLabel === "function") {
      onSelectLabel(item?.label);
    }
    setVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => onItemSelect(item)}
    >
      <Text style={styles.dropdownItemText}>{item.label}</Text>
      {selectedValue === item.value && (
        <Icon name="check" size={20} color="#4CAF50" />
      )}
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity
        style={[styles.dropdown, error ? styles.inputError : null]}
        onPress={toggleDropdown}
      >
        <Text
          style={selectedValue ? styles.selectedText : styles.placeholderText}
        >
          {selectedValue
            ? options.find((opt) => opt.value === selectedValue)?.label
            : placeholder}
        </Text>
        <Icon
          name={visible ? "arrow-drop-up" : "arrow-drop-down"}
          size={24}
          color="#555"
        />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.dropdownListContainer}>
            <Text style={styles.dropdownLabel}>{label}</Text>
            <FlatList
              data={options}
              renderItem={renderItem}
              keyExtractor={(item) => item.value}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const UserProductSellScreen = () => {
  const nav = useNavigation();
  const token = useSelector((state) => state?.generalState?.token);
  const userDetails = useSelector((state) => state?.generalState?.userDetails);

  const productList = [
    { label: "Wheat Bran", value: "wheat_bran" },
    { label: "Turmeric Waste", value: "turmeric_waste" },
    { label: "Rice Bran Deoiled", value: "rice_bran_deoiled" },
    { label: "Coffee Husk", value: "coffee_husk" },
    { label: "Limestone Powder", value: "limestone_powder" },
    { label: "CN Cake Deoiled", value: "cn_cake_deoiled" },
    { label: "Bentonite Powder", value: "bentonite_powder" },
    { label: "Cotton Seed Deoiled Cake", value: "cotton_seed_deoiled_cake" },
    { label: "Enriched Fibre (Maize)", value: "enriched_fibre_maize" },
    { label: "Gingelly Cake Oiled", value: "gingelly_cake_oiled" },
    { label: "Groundnut Cake Extraction", value: "groundnut_cake_extraction" },
    { label: "Maize", value: "maize" },
    { label: "Massur Dust", value: "massur_dust" },
    { label: "Molasses", value: "molasses" },
    { label: "Rape Seed Extraction", value: "rape_seed_extraction" },
  ];

  const [imagesUrls, setImagesUrls] = useState([]);

  // Validation state
  const [errors, setErrors] = useState({
    selectedProduct: "",
    moisture: "",
    sands: "",
    da: "",
    calcium: "",
    kg: "",
    price: "",
    images: "",
    vechileNumber: "",
    noOfVechile: "",
    totalWeight: "",
  });

  // Image Picker Component
  const ImagePickerComponent = ({ images, setImages, error }) => {
    const pickImages = async () => {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: true,
          quality: 0.8,
        });

        if (!result.canceled) {
          setIsImageLoader(true);
          setImages([...images, ...result.assets]);
          // Clear any error when images are added
          setErrors((prev) => ({ ...prev, images: "" }));
          ProductServices.uploadImage(result?.assets).then((res) => {
            if (res.status) {
              setImagesUrls(res?.data?.data);
              setIsImageLoader(false);
            } else {
              setIsImageLoader(false);
            }
          });
        }
      } catch (error) {
        console.log("Error picking images:", error);
      }
    };

    const removeImage = (index) => {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
    };

    return (
      <View style={styles.imagePickerContainer}>
        <Text style={styles.fieldLabel}>Product Images</Text>

        <TouchableOpacity
          style={[styles.addImageButton, error ? styles.inputError : null]}
          onPress={pickImages}
        >
          <Icon name="add-photo-alternate" size={24} color="#4CAF50" />
          <Text style={styles.addImageText}>Add Images</Text>
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <ScrollView horizontal style={styles.imagesScrollView}>
          {images.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: image.uri }} style={styles.image} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => removeImage(index)}
              >
                <Icon name="close" size={18} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  // State for selected product
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState("");

  // Common options for dropdowns
  const moisture10to12Options = [
    { label: "10%", value: "10" },
    { label: "10.5%", value: "10.5" },
    { label: "11%", value: "11" },
    { label: "11.5%", value: "11.5" },
    { label: "12%", value: "12" },
  ];

  const moisture10to13Options = [
    { label: "10%", value: "10" },
    { label: "11%", value: "11" },
    { label: "12%", value: "12" },
    { label: "13%", value: "13" },
  ];

  const moisture4to5Options = [
    { label: "4%", value: "4" },
    { label: "4.5%", value: "4.5" },
    { label: "5%", value: "5" },
  ];

  const sands2to5Options = [
    { label: "2%", value: "2" },
    { label: "3%", value: "3" },
    { label: "4%", value: "4" },
    { label: "5%", value: "5" },
  ];

  const sands5to8Options = [
    { label: "5%", value: "5" },
    { label: "6%", value: "6" },
    { label: "7%", value: "7" },
    { label: "8%", value: "8" },
  ];

  const da13to15Options = [
    { label: "13%", value: "13" },
    { label: "14%", value: "14" },
    { label: "15%", value: "15" },
  ];

  const calcium35to37Options = [
    { label: "35%", value: "35" },
    { label: "36%", value: "36" },
    { label: "37%", value: "37" },
  ];

  // Form field states
  const [moisture, setMoisture] = useState("");
  const [sands, setSands] = useState("");
  const [da, setDa] = useState("");
  const [calcium, setCalcium] = useState("");
  const [kg, setKg] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [vechileNumber, setVechileNumber] = useState("");
  const [noOfVechile, setNoOfVechiles] = useState("");
  const [totalWeight, setTotalWeight] = useState("");
  const [isImageLoader, setIsImageLoader] = useState(false);
  const [currentVehicleNumber, setCurrentVehicleNumber] = useState("");
  const [vehicleNumbers, setVehicleNumbers] = useState([]);
  console.log("Vehicle Numbers:", vehicleNumbers);
  // Reset form when product changes
  useEffect(() => {
    setMoisture("");
    setSands("");
    setDa("");
    setCalcium("");
    setKg("");
    setPrice("");
    setImages([]);
    setVechileNumber("");
    setNoOfVechiles("");
    setTotalWeight("");

    // Clear errors when product changes
    setErrors({
      selectedProduct: "",
      moisture: "",
      sands: "",
      da: "",
      calcium: "",
      kg: "",
      price: "",
      images: "",
      vechileNumber: "",
      noOfVechile: "",
      totalWeight: "",
    });
  }, [selectedProduct]);

  const addVehicleNumber = () => {
    if (currentVehicleNumber.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        vechileNumber: "Vehicle number cannot be empty",
      }));
      return;
    }

    // Add the new vehicle number to the array
    setVehicleNumbers([...vehicleNumbers, currentVehicleNumber.trim()]);

    // Clear the input field and any errors
    setCurrentVehicleNumber("");
    setErrors((prev) => ({ ...prev, vechileNumber: "" }));
  };

  // Function to remove a vehicle number from the list
  const removeVehicleNumber = (index) => {
    const updatedVehicleNumbers = [...vehicleNumbers];
    updatedVehicleNumbers.splice(index, 1);
    setVehicleNumbers(updatedVehicleNumbers);
  };

  const getMoistureOptions = () => {
    if (selectedProduct === "limestone_powder") {
      return moisture4to5Options;
    } else if (selectedProduct === "rice_bran_deoiled") {
      return moisture10to13Options;
    } else {
      return moisture10to12Options;
    }
  };

  const productTrack = [
    {
      title: "Order Received",
      description: "Your order has been confirmed",
      icon: "document-text-outline",
      color: "#4A90E2",
      stage: true,
    },
    {
      title: "Processing",
      description: "Your items are being prepared",
      icon: "construct-outline",
      color: "#50C878",
      stage: true,
    },
    {
      title: "Security Check",
      description: "Your order is being packed",
      icon: "cube-outline",
      color: "#FF6B6B",
      stage: false,
    },
    {
      title: "Weight Conformation",
      description: "Your package is on its way",
      icon: "bicycle-outline",
      color: "#FFA500",
      stage: false,
    },
    {
      title: "Delivered",
      description: "Package has been delivered",
      icon: "checkmark-done-circle-outline",
      color: "#8E44AD",
      stage: false,
    },
  ];

  // Get the appropriate S&S options based on product
  const getSandsOptions = () => {
    if (selectedProduct === "limestone_powder") {
      return sands5to8Options;
    } else {
      return sands2to5Options;
    }
  };

  // Determine if D&A field should be shown
  const showDAField = () => {
    return selectedProduct === "rice_bran_deoiled";
  };

  // Determine if Calcium field should be shown
  const showCalciumField = () => {
    return selectedProduct === "limestone_powder";
  };

  // Determine if Moisture and S&S fields should be shown
  const showMoistureAndSands = () => {
    const simpleProducts = [
      "cn_cake_deoiled",
      "bentonite_powder",
      "cotton_seed_deoiled_cake",
      "enriched_fibre_maize",
      "gingelly_cake_oiled",
      "groundnut_cake_extraction",
      "maize",
      "massur_dust",
      "molasses",
      "rape_seed_extraction",
    ];
    return !simpleProducts.includes(selectedProduct);
  };

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    let newErrors = {
      selectedProduct: "",
      moisture: "",
      sands: "",
      da: "",
      calcium: "",
      kg: "",
      price: "",
      images: "",
      vechileNumber: "",
      noOfVechile: "",
      totalWeight: "",
    };

    // Validate product selection
    if (!selectedProduct) {
      newErrors.selectedProduct = "Please select a product";
      isValid = false;
    }

    // Validate moisture and sands if needed
    if (showMoistureAndSands()) {
      if (!moisture) {
        newErrors.moisture = "Moisture percentage is required";
        isValid = false;
      }
      if (!sands) {
        newErrors.sands = "S&S percentage is required";
        isValid = false;
      }
    }

    // Validate D&A if needed
    if (showDAField() && !da) {
      newErrors.da = "D&A percentage is required";
      isValid = false;
    }

    // Validate Calcium if needed
    if (showCalciumField() && !calcium) {
      newErrors.calcium = "Calcium percentage is required";
      isValid = false;
    }

    // Validate kg
    if (!kg) {
      newErrors.kg = "Quantity is required";
      isValid = false;
    } else if (isNaN(kg) || parseFloat(kg) <= 0) {
      newErrors.kg = "Please enter a valid quantity";
      isValid = false;
    }

    // Validate price
    if (!price) {
      newErrors.price = "Price is required";
      isValid = false;
    } else if (isNaN(price) || parseFloat(price) <= 0) {
      newErrors.price = "Please enter a valid price";
      isValid = false;
    }

    // Validate vehicle number
    if (vehicleNumbers.length === 0) {
      newErrors.vechileNumber = "At least one vehicle number is required";
      isValid = false;
    }

    // Validate number of vehicles

    // Validate total weight
    if (!totalWeight) {
      newErrors.totalWeight = "Total weight is required";
      isValid = false;
    } else if (isNaN(totalWeight) || parseFloat(totalWeight) <= 0) {
      newErrors.totalWeight = "Please enter a valid total weight";
      isValid = false;
    }

    // Validate images
    if (images.length === 0) {
      newErrors.images = "Please add at least one product image";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate form
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please check all fields and try again.");
      return;
    }

    // Build the data object based on the selected product
    const productData = {
      productName: productList.find((p) => p.value === selectedProduct)?.label,
      kg,
      price,
      vechileNumber,
      noOfVechile,
      totalWeight,
      images: images.map((img) => img.uri), // Array of image URIs
    };

    // Add optional fields based on product type
    if (showMoistureAndSands()) {
      productData.moisture = moisture;
      productData.sands = sands;
    }

    if (showDAField()) {
      productData.da = da;
    }

    if (showCalciumField()) {
      productData.calcium = calcium;
    }

    console.log("Product data to upload:", productData);

    try {
      // Call the createProduct API
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
        vechileNumber,
        noOfVechile,
        totalWeight,
        productTrack,
        userDetails
      );

      if (createProductResponse.status) {
        Alert.alert("Success", "Product uploaded successfully!", [
          { text: "OK", onPress: () => nav.navigate("UserSellPaymentScreen") },
        ]);

        // Reset form
        setSelectedProduct(null);
        setSelectedProductName("");
        setMoisture("");
        setSands("");
        setDa("");
        setCalcium("");
        setKg("");
        setPrice("");
        setImages([]);
        setVechileNumber("");
        setNoOfVechiles("");
        setTotalWeight("");
      } else {
        throw new Error(
          "Failed to create product: " + createProductResponse.message
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to upload product: " + error.message);
      console.error("Error during product submission:", error.message);
    }
  };

  const handleContinue = () => {
    if (validateForm()) {
      nav.navigate("UserSellPaymentScreen", {
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
      });
    } else {
      Alert.alert("Validation Error", "Please check all fields and try again.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#4c669f" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <LinearGradient
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <Ionicons
                name="arrow-back"
                size={24}
                color="white"
                onPress={() => nav.goBack()}
              />
              <Text style={styles.headerTitle}>Product Upload</Text>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="white"
                onPress={() => nav.navigate("UserSellProductList")}
              />
            </View>
          </LinearGradient>

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Product Details</Text>

            {/* Product Selection Dropdown */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Select Product</Text>
              <CustomDropdown
                label="Select Product Type"
                options={productList}
                selectedValue={selectedProduct}
                onSelect={setSelectedProduct}
                onSelectLabel={setSelectedProductName}
                placeholder="Select a product to upload"
                error={errors.selectedProduct}
              />
            </View>

            {selectedProduct && (
              <>
                {/* Conditional Fields Based on Product Type */}
                {showMoistureAndSands() && (
                  <>
                    {/* Moisture Dropdown */}
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>
                        Moisture{" "}
                        {selectedProduct === "limestone_powder"
                          ? "(4-5%)"
                          : selectedProduct === "rice_bran_deoiled"
                          ? "(10-13%)"
                          : "(10-12%)"}
                      </Text>
                      <CustomDropdown
                        label="Select Moisture Percentage"
                        options={getMoistureOptions()}
                        selectedValue={moisture}
                        onSelect={setMoisture}
                        placeholder="Select moisture percentage"
                        error={errors.moisture}
                      />
                    </View>

                    {/* S&S Dropdown */}
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldLabel}>
                        S&S{" "}
                        {selectedProduct === "limestone_powder"
                          ? "(5-8%)"
                          : "(2-5%)"}
                      </Text>
                      <CustomDropdown
                        label="Select S&S Percentage"
                        options={getSandsOptions()}
                        selectedValue={sands}
                        onSelect={setSands}
                        placeholder="Select S&S percentage"
                        error={errors.sands}
                      />
                    </View>
                  </>
                )}

                {/* D&A Dropdown for Rice Bran Deoiled */}
                {showDAField() && (
                  <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>D&A (13-15%)</Text>
                    <CustomDropdown
                      label="Select D&A Percentage"
                      options={da13to15Options}
                      selectedValue={da}
                      onSelect={setDa}
                      placeholder="Select D&A percentage"
                      error={errors.da}
                    />
                  </View>
                )}

                {/* Calcium Dropdown for Limestone Powder */}
                {showCalciumField() && (
                  <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Calcium (35-37%)</Text>
                    <CustomDropdown
                      label="Select Calcium Percentage"
                      options={calcium35to37Options}
                      selectedValue={calcium}
                      onSelect={setCalcium}
                      placeholder="Select calcium percentage"
                      error={errors.calcium}
                    />
                  </View>
                )}

                {/* Kg Field - Common for all products */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Quantity (kg)</Text>
                  <TextInput
                    style={[
                      styles.textInput,
                      errors.kg ? styles.inputError : null,
                    ]}
                    value={kg}
                    onChangeText={(text) => {
                      setKg(text);
                      if (text) {
                        setErrors((prev) => ({ ...prev, kg: "" }));
                      }
                    }}
                    placeholder="Enter quantity in kg"
                    keyboardType="numeric"
                  />
                  {errors.kg ? (
                    <Text style={styles.errorText}>{errors.kg}</Text>
                  ) : null}
                </View>

                {/* Price Field - Common for all products */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Price</Text>
                  <TextInput
                    style={[
                      styles.textInput,
                      errors.price ? styles.inputError : null,
                    ]}
                    value={price}
                    onChangeText={(text) => {
                      setPrice(text);
                      if (text) {
                        setErrors((prev) => ({ ...prev, price: "" }));
                      }
                    }}
                    placeholder="Enter price"
                    keyboardType="numeric"
                  />
                  {errors.price ? (
                    <Text style={styles.errorText}>{errors.price}</Text>
                  ) : null}
                </View>

                {/* Vehicle Number Field */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Vehicle Numbers</Text>
                  <View style={styles.vehicleInputContainer}>
                    <TextInput
                      style={[
                        styles.vehicleInput,
                        errors.vechileNumber ? styles.inputError : null,
                      ]}
                      value={currentVehicleNumber}
                      onChangeText={(text) => {
                        setCurrentVehicleNumber(text);
                        if (vehicleNumbers.length > 0) {
                          setErrors((prev) => ({ ...prev, vechileNumber: "" }));
                        }
                      }}
                      placeholder="Enter vehicle number"
                    />
                    <TouchableOpacity
                      style={styles.addVehicleButton}
                      onPress={addVehicleNumber}
                    >
                      <Icon name="add-circle" size={24} color="#4CAF50" />
                    </TouchableOpacity>
                  </View>

                  {errors.vechileNumber ? (
                    <Text style={styles.errorText}>{errors.vechileNumber}</Text>
                  ) : null}

                  <ScrollView style={styles.vehicleListContainer}>
                    {vehicleNumbers.map((number, index) => (
                      <View key={index} style={styles.vehicleListItem}>
                        <Text style={styles.vehicleNumberText}>{number}</Text>
                        <TouchableOpacity
                          style={styles.removeVehicleButton}
                          onPress={() => removeVehicleNumber(index)}
                        >
                          <Icon name="close" size={18} color="#FF6B6B" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                </View>

                {/* Number of Vehicles Field */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>No. of Vehicles</Text>
                  <Text style={styles.textInput}>
                    {vehicleNumbers.length.toString()}
                  </Text>
                  {/* <TextInput
                    style={[
                      styles.textInput,
                      errors.noOfVechile ? styles.inputError : null,
                    ]}
                    defaultValue={vehicleNumbers.length.toString()}
                    keyboardType="numeric"
                  /> */}
                  {errors.noOfVechile ? (
                    <Text style={styles.errorText}>{errors.noOfVechile}</Text>
                  ) : null}
                </View>

                {/* Total Weight Field */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Total Weight (tons)</Text>
                  <TextInput
                    style={[
                      styles.textInput,
                      errors.totalWeight ? styles.inputError : null,
                    ]}
                    value={totalWeight}
                    onChangeText={(text) => {
                      setTotalWeight(text);
                      if (text) {
                        setErrors((prev) => ({ ...prev, totalWeight: "" }));
                      }
                    }}
                    placeholder="Enter weight in tons"
                    keyboardType="numeric"
                  />
                  {errors.totalWeight ? (
                    <Text style={styles.errorText}>{errors.totalWeight}</Text>
                  ) : null}
                </View>

                {/* Image Picker Component */}
                <ImagePickerComponent
                  images={images}
                  setImages={setImages}
                  error={errors.images}
                />

                {/* Submit Button */}
                <TouchableOpacity onPress={handleContinue}>
                  <LinearGradient
                    colors={["#4CAF50", "#2E7D32"]}
                    style={styles.submitButton}
                  >
                    <Text style={styles.submitButtonText}>Confirm Upload</Text>
                    <Icon name="check-circle" size={24} color="white" />
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {isImageLoader && (
        <Container
          flex1
          bgColor={Colors.TRANSPARENT}
          absolute
          aCenter
          jCenter
          w={Display.setWidth(100)}
          h={Display.setHeight(100)}
        >
          <LottieView
            source={require("../assets/animation/imageLoader.json")}
            autoPlay
            style={styles.imageLoaderLottie}
          />
        </Container>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerGradient: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  formContainer: {
    padding: 16,
    marginTop: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#555",
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#FF6B6B",
    borderWidth: 1,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  // Custom dropdown styles
  dropdown: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedText: {
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    fontSize: 16,
    color: "#aaa",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  dropdownListContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    maxHeight: 300,
  },
  dropdownLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  // Image picker styles
  imagePickerContainer: {
    marginBottom: 20,
  },
  addImageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  addImageText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#4CAF50",
  },
  imagesScrollView: {
    flexDirection: "row",
    marginTop: 10,
  },
  imageContainer: {
    position: "relative",
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  imageLoaderLottie: {
    width: Display.setWidth(60),
    height: Display.setWidth(60),
  },
  vehicleInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  vehicleInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  addVehicleButton: {
    marginLeft: 10,
    padding: 5,
  },
  vehicleListContainer: {
    maxHeight: Display.setHeight(15),
    marginTop: 10,
  },
  vehicleListItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#B0BEC5",
  },
  vehicleNumberText: {
    flex: 1,
    color: "#333",
    fontSize: 14,
  },
  removeVehicleButton: {
    padding: 5,
  },
});

export default UserProductSellScreen;
