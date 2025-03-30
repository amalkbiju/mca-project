import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Dimensions,
  Image,
  SafeAreaView,
  Animated,
  Easing,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";
import ProductServices from "../services/ProductServices";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants";
import { Separator } from "react-native-tillring-components";
import CustomCheckbox from "../compontents/CustomCheckbox";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.95;
const expandedCardHeight = 120; // Reduced height since we only need one checkbox

const ProductCard = ({ item, nav, token, refreshProducts }) => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const animatedHeight = new Animated.Value(100);
  const animatedScale = new Animated.Value(1);

  const toggleExpand = () => {
    setExpanded(!expanded);

    Animated.timing(animatedHeight, {
      toValue: expanded ? 100 : expandedCardHeight,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();

    Animated.sequence([
      Animated.timing(animatedScale, {
        toValue: expanded ? 1 : 1.02,
        duration: 150,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(animatedScale, {
        toValue: 1,
        duration: 150,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const updateSecurityStatus = async (checked) => {
    console.log("item.id", item.id);
    if (loading) return;
    console.log("checked", checked);
    setLoading(true);
    try {
      // Assuming security status is the first track item (index 0)
      const securityIndex = 2;

      const response = await axios.patch(
        `http://localhost:3000/v1/product/user-products/${item.id}/track/${securityIndex}`,
        { status: checked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response);
      if (response.status === 200) {
        refreshProducts();
      } else {
        console.log("Failed to update security status:", response.data);
      }
    } catch (error) {
      console.error("Error updating security status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={toggleExpand}
      activeOpacity={0.9}
    >
      <Animated.View
        style={{
          transform: [{ scale: animatedScale }],
        }}
      >
        <LinearGradient
          colors={["#f8f9fa", "#e9ecef"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.card, { height: expanded ? "auto" : 130 }]} // Increased initial height
        >
          <View style={styles.cardContent}>
            {/* Image container - same size in both states */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.images[0].url }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            <View style={styles.contentContainer}>
              {/* Show product info in collapsed state */}
              {!expanded && (
                <>
                  <Text style={styles.productName} numberOfLines={1}>
                    {item.productType}
                  </Text>

                  <View style={styles.detailsGrid}>
                    <View style={styles.detailColumn}>
                      <View style={styles.detailRow}>
                        <Icon name="scale-outline" size={16} color="#4A90E2" />
                        <Text style={styles.detailText}>
                          {item.totalWeight} kg
                        </Text>
                      </View>

                      <View style={styles.detailRow}>
                        <Icon
                          name="pricetag-outline"
                          size={16}
                          color="#50C878"
                        />
                        <Text style={styles.detailText}>₹{item.price}</Text>
                      </View>
                    </View>

                    <View style={styles.detailColumn}>
                      <View style={styles.detailRow}>
                        <Icon name="car-outline" size={16} color="#FF6B6B" />
                        <Text style={styles.detailText} numberOfLines={1}>
                          {item.vechileNo}
                        </Text>
                      </View>

                      <View style={styles.detailRow}>
                        <Icon
                          name="car-sport-outline"
                          size={16}
                          color="#9370DB"
                        />
                        <Text style={styles.detailText}>
                          {item.NoOfVechiles || "1"} vehicles
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              )}

              {/* Show only security checkbox in expanded state */}
              {expanded && (
                <Animated.View
                  style={[styles.expandedContent, { height: animatedHeight }]}
                >
                  <Text style={styles.statusTitle}>Security Status:</Text>
                  <View style={styles.statusRow}>
                    <CustomCheckbox
                      value={item.track[2]?.stage || false}
                      onValueChange={(newValue) =>
                        updateSecurityStatus(newValue)
                      }
                      disabled={loading}
                      activeColor="#4A90E2"
                      inactiveColor="#ced4da"
                      size={20}
                      checkIcon="checkmark-sharp"
                      boxStyle={styles.customCheckbox}
                    />
                    <Icon
                      name="shield-checkmark-outline"
                      size={18}
                      color={item.track[2]?.stage ? "#4A90E2" : "#ced4da"}
                    />
                    <Text
                      style={[
                        styles.statusText,
                        { color: item.track[2]?.stage ? "#4A90E2" : "#ced4da" },
                      ]}
                    >
                      Security Verified
                    </Text>
                  </View>
                </Animated.View>
              )}
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const SecurityScreen = () => {
  const nav = useNavigation();
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state?.generalState?.token);
  const [loading, setLoading] = useState(false);

  const fetchProducts = () => {
    setLoading(true);
    ProductServices.getUserProduct(token)
      .then((res) => {
        if (res.status) {
          const fetchedProducts = res?.data?.data;
          setProducts(fetchedProducts);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View style={styles.sectionHeader}>
        <Icon name="arrow-back" size={25} onPress={() => nav.goBack()} />
        <Text style={styles.sectionTitle}>Security</Text>
        <Icon name="arrow-back" size={25} color={Colors.DEFAULT_WHITE} />
      </View>
      <Separator height={10} />
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            nav={nav}
            token={token}
            refreshProducts={fetchProducts}
          />
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={fetchProducts}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  listContainer: {
    paddingBottom: 16,
    paddingHorizontal: 10,
  },
  cardContainer: {
    width: cardWidth,
    marginVertical: 8,
    alignSelf: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    borderRadius: 12,
    padding: 12,
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f1f3f5",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 8,
  },
  detailsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailColumn: {
    flex: 1,
    marginRight: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  detailText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#495057",
    flex: 1,
  },
  expandedContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    paddingLeft: 4,
  },
  statusText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  customCheckbox: {
    marginRight: 10,
    borderRadius: 4,
  },
});

export default SecurityScreen;
