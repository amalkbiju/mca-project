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
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import ProductServices from "../../services/ProductServices";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

// Custom Dropdown Component
const CustomDropdown = ({
  label,
  options,
  selectedValue,
  onSelect,
  placeholder,
  onSelectLabel = () => {}, // Add a default no-op function
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
      <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
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

const AdminHomeScreen = () => {
  const nav = useNavigation();
  const token = useSelector((state) => state?.generalState?.token);
  console.log("token___", token);
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
  // Image Picker Component
  const ImagePickerComponent = ({ images, setImages }) => {
    const pickImages = async () => {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: true,
          quality: 0.8,
        });

        if (!result.canceled) {
          setImages([...images, ...result.assets]);
          ProductServices.uploadImage(result?.assets).then((res) => {
            if (res.status) {
              console.log("res image upload", res?.data?.data);
              setImagesUrls(res?.data?.data);
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
    console.log("selectedProduct", selectedProductName);
    return (
      <View style={styles.imagePickerContainer}>
        <Text style={styles.fieldLabel}>Product Images</Text>

        <TouchableOpacity style={styles.addImageButton} onPress={pickImages}>
          <Icon name="add-photo-alternate" size={24} color="#4CAF50" />
          <Text style={styles.addImageText}>Add Images</Text>
        </TouchableOpacity>

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

  // Reset form when product changes
  useEffect(() => {
    setMoisture("");
    setSands("");
    setDa("");
    setCalcium("");
    setKg("");
    setPrice("");
    setImages([]);
  }, [selectedProduct]);

  // Get the appropriate moisture options based on product
  const getMoistureOptions = () => {
    if (selectedProduct === "limestone_powder") {
      return moisture4to5Options;
    } else if (selectedProduct === "rice_bran_deoiled") {
      return moisture10to13Options;
    } else {
      return moisture10to12Options;
    }
  };

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

  // Handle form submission
  const handleSubmit = async () => {
    // Validation
    if (!selectedProduct) {
      alert("Please select a product!");
      return;
    }

    // Build the data object based on the selected product
    const productData = {
      productName: productList.find((p) => p.value === selectedProduct)?.label,
      kg,
      price,
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
      // Upload images first (if any)

      // Call the createProduct API
      const createProductResponse = await ProductServices.createProduct(
        token,
        selectedProductName,
        imagesUrls,
        moisture,
        sands,
        da,
        calcium,
        kg,
        price
      );

      if (createProductResponse.status) {
        console.log(
          "Product uploaded successfully:",
          createProductResponse.data
        );
        alert("Product uploaded successfully!");

        // Reset form
        setSelectedProduct(null);
        setMoisture(null);
        setSands(null);
        setDa(null);
        setCalcium(null);
        setKg("");
        setPrice("");
        setImages([]);
      } else {
        throw new Error(
          "Failed to create product: " + createProductResponse.message
        );
      }
    } catch (error) {
      console.error("Error during product submission:", error.message);
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
              {/* <Ionicons name="arrow-back" size={24} color="#4c669f" /> */}
              <Text style={styles.headerTitle}>Product Upload</Text>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="white"
                onPress={() => nav.navigate("SellProductsList")}
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
                    />
                  </View>
                )}

                {/* Kg Field - Common for all products */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Quantity (kg)</Text>
                  <TextInput
                    style={styles.textInput}
                    value={kg}
                    onChangeText={setKg}
                    placeholder="Enter quantity in kg"
                    keyboardType="numeric"
                  />
                </View>

                {/* Price Field - Common for all products */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Price</Text>
                  <TextInput
                    style={styles.textInput}
                    value={price}
                    onChangeText={setPrice}
                    placeholder="Enter price"
                    keyboardType="numeric"
                  />
                </View>

                {/* Image Picker Component */}
                <ImagePickerComponent images={images} setImages={setImages} />

                {/* Submit Button */}
                <TouchableOpacity onPress={handleSubmit}>
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
});

export default AdminHomeScreen;
