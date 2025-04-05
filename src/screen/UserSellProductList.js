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
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import LinearGradient from "react-native-linear-gradient";
import ProductServices from "../services/ProductServices";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants";
import { Separator } from "react-native-tillring-components";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.95;

const ProductCard = ({ item, nav }) => {
  console.log("vechile no", item.vechileNo);
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() =>
        nav.navigate("UserSellProductDetailedScreen", { product: item })
      }
    >
      <LinearGradient
        colors={["#f8f9fa", "#e9ecef"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.card}
      >
        <View style={styles.imageContainer}>
          {!item.images || item.images.length !== 0 ? (
            <Image
              source={{
                uri: item.images[0].url,
              }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={require("../assets/images/noImage.jpg")}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        </View>
        {/* 1745 */}
        <View style={styles.contentContainer}>
          <Text style={styles.productType}>{item.productType}</Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Icon name="scale-outline" size={18} color="#4A90E2" />
              <Text style={styles.detailText}>{item.totalWeight} kg</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="pricetag-outline" size={18} color="#50C878" />
              <Text style={styles.detailText}>₹{item.price}</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="car-outline" size={18} color="#FF6B6B" />
              {/* <Text style={styles.detailText}>{item.vechileNo}</Text> */}
              <FlatList
                data={item.vechileNo}
                horizontal
                ItemSeparatorComponent={() => <Separator width={10} />}
                renderItem={({ item }) => (
                  <Text style={styles.detailText}>{item}</Text>
                )}
              />
            </View>
          </View>

          <View style={styles.progressContainer}>
            {item.track.map((step, index) => (
              <View key={index} style={styles.progressItem}>
                <Icon
                  name={step.icon}
                  size={16}
                  color={step.stage ? step.color : "#ced4da"}
                />
                {index < item.track.length - 1 && (
                  <View
                    style={[
                      styles.progressLine,
                      {
                        backgroundColor: item.track[index + 1].stage
                          ? item.track[index + 1].color
                          : "#ced4da",
                      },
                    ]}
                  />
                )}
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const UserSellProductList = () => {
  const nav = useNavigation();
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state?.generalState?.token);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    ProductServices.getUserProduct(token).then((res) => {
      if (res.status) {
        const fetchedProducts = res?.data?.data;
        setProducts(fetchedProducts);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View style={styles.sectionHeader}>
        <Icon name="arrow-back" size={25} onPress={() => nav.goBack()} />
        <Text style={styles.sectionTitle}>Sell Products</Text>
        <Icon name="arrow-back" size={25} color={Colors.DEFAULT_WHITE} />
      </View>
      <Separator height={10} />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} nav={nav} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  menuButton: {
    padding: 4,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 8,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  cartButton: {
    padding: 4,
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#ff6b6b",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#333",
    fontSize: 16,
  },
  sellButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
  },
  sellButtonIcon: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 2,
  },
  sellButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    marginLeft: 8,
  },
  sellButtonArrow: {
    marginLeft: 8,
  },
  consultationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e6f7ff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
  },
  consultationTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  consultationSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  callButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  callButtonText: {
    color: "#fff",
    fontWeight: "600",
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
    flexDirection: "row",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    overflow: "hidden",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f1f3f5",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  noImageContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#adb5bd",
    marginTop: 4,
    fontSize: 12,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  productType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 6,
  },
  detailsContainer: {
    marginVertical: 6,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#495057",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  progressItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressLine: {
    height: 2,
    width: 12,
    marginHorizontal: 2,
  },
  addButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "transparent",
  },
});

export default UserSellProductList;
