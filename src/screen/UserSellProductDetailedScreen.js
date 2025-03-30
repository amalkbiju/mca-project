// import React, { useState, useEffect, useRef } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
//   Image,
//   FlatList,
//   StatusBar,
//   SafeAreaView,
// } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
// import Icon from "react-native-vector-icons/Ionicons";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   interpolate,
//   useAnimatedScrollHandler,
// } from "react-native-reanimated";

// const { width, height } = Dimensions.get("window");

// const ProductDetailsScreen = ({ route, navigation }) => {
//   const { product } = route.params || {
//     // Default product if none is passed
//     product: {
//       _id: "67e8078c595737b96dff87ea",
//       productType: "Turmeric Waste",
//       moisture: "11",
//       sands: "4",
//       kg: "3",
//       price: "200",
//       images: [
//         {
//           id: "a1e0b9f3-32eb-4006-9455-ed334ae007eb",
//           url: "https://via.placeholder.com/400/FF8C00/FFFFFF/?text=Turmeric",
//           key: "tags/1743259528859-IMG_0007.jpg",
//         },
//         {
//           id: "b1e0b9f3-32eb-4006-9455-ed334ae007ec",
//           url: "https://via.placeholder.com/400/996633/FFFFFF/?text=Turmeric+Back",
//           key: "tags/1743259528860-IMG_0008.jpg",
//         },
//       ],
//       vechileNo: "KL23K7373",
//       noOfVechile: "2",
//       totalWeight: "60",
//       track: [
//         {
//           title: "Order Received",
//           description: "Your order has been confirmed",
//           icon: "document-text-outline",
//           color: "#4A90E2",
//           stage: true,
//         },
//         {
//           title: "Processing",
//           description: "Your items are being prepared",
//           icon: "construct-outline",
//           color: "#50C878",
//           stage: true,
//         },
//         {
//           title: "Security Check",
//           description: "Your order is being packed",
//           icon: "cube-outline",
//           color: "#FF6B6B",
//           stage: false,
//         },
//         {
//           title: "Weight Conformation",
//           description: "Your package is on its way",
//           icon: "bicycle-outline",
//           color: "#FFA500",
//           stage: false,
//         },
//         {
//           title: "Delivered",
//           description: "Package has been delivered",
//           icon: "checkmark-done-circle-outline",
//           color: "#8E44AD",
//           stage: false,
//         },
//       ],
//       username: "Test",
//       email: "test@gmail.com",
//     },
//   };

//   // Image carousel state
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const flatListRef = useRef(null);
//   const scrollX = useSharedValue(0);

//   // Scroll handler for image carousel
//   const scrollHandler = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       scrollX.value = event.contentOffset.x;
//     },
//   });

//   // Track state
//   const [trackingStages, setTrackingStages] = useState(product.track || []);

//   // Calculate progress percentage
//   const calculateProgress = () => {
//     const completedStages = trackingStages.filter(
//       (stage) => stage.stage
//     ).length;
//     return (completedStages / trackingStages.length) * 100;
//   };

//   // Animated progress bar
//   const progressValue = useSharedValue(calculateProgress());

//   // Update progress when stages change
//   useEffect(() => {
//     progressValue.value = withTiming(calculateProgress(), {
//       duration: 500,
//     });
//   }, [trackingStages]);

//   // Animated progress style
//   const animatedProgressStyle = useAnimatedStyle(() => {
//     return {
//       width: `${progressValue.value}%`,
//     };
//   });

//   // Find current active stage
//   const currentStage = Math.max(
//     trackingStages.findIndex((stage) => !stage.stage) - 1,
//     0
//   );

//   // Function to render dot indicators for image carousel
//   const renderDotIndicators = () => {
//     return (
//       <View style={styles.paginationContainer}>
//         {product.images.map((_, index) => {
//           const animatedDotStyle = useAnimatedStyle(() => {
//             const opacity = interpolate(
//               scrollX.value,
//               [(index - 1) * width, index * width, (index + 1) * width],
//               [0.3, 1, 0.3],
//               "clamp"
//             );

//             const scale = interpolate(
//               scrollX.value,
//               [(index - 1) * width, index * width, (index + 1) * width],
//               [1, 1.2, 1],
//               "clamp"
//             );

//             return {
//               opacity,
//               transform: [{ scale }],
//               backgroundColor: index === currentImageIndex ? "#4CAF50" : "#ccc",
//             };
//           });

//           return (
//             <Animated.View key={index} style={[styles.dot, animatedDotStyle]} />
//           );
//         })}
//       </View>
//     );
//   };

//   // Detect when image changes
//   const onViewableItemsChanged = useRef(({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       setCurrentImageIndex(viewableItems[0].index);
//     }
//   }).current;

//   const viewabilityConfig = useRef({
//     itemVisiblePercentThreshold: 50,
//   }).current;

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}
//         >
//           <Icon name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>{product.productType}</Text>
//         <TouchableOpacity style={styles.shareButton}>
//           <Icon name="share-social-outline" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Image Carousel */}
//         <View style={styles.carouselContainer}>
//           <Animated.FlatList
//             ref={flatListRef}
//             data={product.images}
//             keyExtractor={(item) => item.id}
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             onScroll={scrollHandler}
//             onViewableItemsChanged={onViewableItemsChanged}
//             viewabilityConfig={viewabilityConfig}
//             renderItem={({ item }) => (
//               <View style={styles.imageContainer}>
//                 <Image source={{ uri: item.url }} style={styles.productImage} />
//               </View>
//             )}
//           />
//           {renderDotIndicators()}
//         </View>

//         {/* Product Info Card */}
//         <LinearGradient
//           colors={["#ffffff", "#f8f9fa"]}
//           style={styles.productInfoCard}
//         >
//           <View style={styles.productHeader}>
//             <View>
//               <Text style={styles.productType}>{product.productType}</Text>
//               <Text style={styles.productPrice}>₹{product.price}</Text>
//             </View>
//             <TouchableOpacity style={styles.favoriteButton}>
//               <Icon name="heart-outline" size={24} color="#FF6B6B" />
//             </TouchableOpacity>
//           </View>

//           {/* Product Details */}
//           <View style={styles.detailsContainer}>
//             <View style={styles.detailRow}>
//               <View style={styles.detailItem}>
//                 <Icon name="water-outline" size={20} color="#4A90E2" />
//                 <Text style={styles.detailLabel}>Moisture</Text>
//                 <Text style={styles.detailValue}>{product.moisture}%</Text>
//               </View>

//               <View style={styles.detailItem}>
//                 <Icon name="analytics-outline" size={20} color="#50C878" />
//                 <Text style={styles.detailLabel}>Sands</Text>
//                 <Text style={styles.detailValue}>{product.sands}%</Text>
//               </View>
//             </View>

//             <View style={styles.detailRow}>
//               <View style={styles.detailItem}>
//                 <Icon name="scale-outline" size={20} color="#FF6B6B" />
//                 <Text style={styles.detailLabel}>Weight</Text>
//                 <Text style={styles.detailValue}>{product.totalWeight} kg</Text>
//               </View>

//               <View style={styles.detailItem}>
//                 <Icon name="car-outline" size={20} color="#FFA500" />
//                 <Text style={styles.detailLabel}>Vehicle</Text>
//                 <Text style={styles.detailValue}>{product.vechileNo}</Text>
//               </View>
//             </View>
//           </View>

//           {/* Vehicle Info */}
//           <View style={styles.vehicleInfoContainer}>
//             <Text style={styles.sectionTitle}>Vehicle Information</Text>
//             <View style={styles.vehicleDetails}>
//               <View style={styles.vehicleDetailItem}>
//                 <Icon name="car-sport-outline" size={22} color="#4A90E2" />
//                 <Text style={styles.vehicleDetailText}>
//                   Number: {product.vechileNo}
//                 </Text>
//               </View>
//               <View style={styles.vehicleDetailItem}>
//                 <Icon name="apps-outline" size={22} color="#50C878" />
//                 <Text style={styles.vehicleDetailText}>
//                   Number of Vehicles: {product.noOfVechile}
//                 </Text>
//               </View>
//             </View>
//           </View>

//           {/* Supplier Info */}
//           <View style={styles.supplierContainer}>
//             <Text style={styles.sectionTitle}>Supplier Information</Text>
//             <View style={styles.supplierCard}>
//               <View style={styles.supplierIconContainer}>
//                 <Icon name="person-outline" size={28} color="#fff" />
//               </View>
//               <View style={styles.supplierInfo}>
//                 <Text style={styles.supplierName}>{product.username}</Text>
//                 <Text style={styles.supplierEmail}>{product.email}</Text>
//               </View>
//               <TouchableOpacity style={styles.contactButton}>
//                 <Icon name="call-outline" size={20} color="#fff" />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Tracking Section */}
//           <View style={styles.trackingContainer}>
//             <Text style={styles.sectionTitle}>Order Status</Text>

//             {/* Progress Bar */}
//             <View style={styles.progressContainer}>
//               <Animated.View
//                 style={[
//                   styles.progressBar,
//                   animatedProgressStyle,
//                   {
//                     backgroundColor:
//                       currentStage >= 0
//                         ? trackingStages[currentStage].color
//                         : "#E0E0E0",
//                   },
//                 ]}
//               />
//             </View>

//             {/* Tracking Stages */}
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               style={styles.stagesContainer}
//             >
//               {trackingStages.map((stage, index) => (
//                 <View
//                   key={stage.title}
//                   style={[styles.stageItem, stage.stage && styles.activeStage]}
//                 >
//                   <View
//                     style={[
//                       styles.stageIconContainer,
//                       {
//                         backgroundColor: stage.stage ? stage.color : "#E0E0E0",
//                       },
//                     ]}
//                   >
//                     <Icon name={stage.icon} size={24} color="white" />
//                   </View>
//                   <Text style={styles.stageTitle}>{stage.title}</Text>
//                 </View>
//               ))}
//             </ScrollView>

//             {/* Current Stage Details */}
//             {currentStage >= 0 && (
//               <View style={styles.stageDetailsContainer}>
//                 <Text style={styles.stageDetailsTitle}>
//                   {trackingStages[currentStage].title}
//                 </Text>
//                 <Text style={styles.stageDetailsDescription}>
//                   {trackingStages[currentStage].description}
//                 </Text>
//               </View>
//             )}
//           </View>
//         </LinearGradient>
//       </ScrollView>

//       {/* Bottom Action Buttons */}
//       <View style={styles.bottomActions}>
//         <TouchableOpacity style={styles.cartButton}>
//           <Icon name="cart-outline" size={22} color="#fff" />
//           <Text style={styles.buttonText}>Add to Cart</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.buyButton}>
//           <Icon name="flash-outline" size={22} color="#fff" />
//           <Text style={styles.buttonText}>Buy Now</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: "#fff",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   backButton: {
//     padding: 8,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   shareButton: {
//     padding: 8,
//   },
//   carouselContainer: {
//     height: height * 0.4,
//     width: width,
//   },
//   imageContainer: {
//     width: width,
//     height: height * 0.4,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   productImage: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   paginationContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     position: "absolute",
//     bottom: 16,
//     width: "100%",
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginHorizontal: 4,
//   },
//   productInfoCard: {
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     marginTop: -20,
//     paddingHorizontal: 16,
//     paddingTop: 24,
//     paddingBottom: 100, // Extra padding for bottom button space
//   },
//   productHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 16,
//   },
//   productType: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 4,
//   },
//   productPrice: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#4CAF50",
//   },
//   favoriteButton: {
//     padding: 8,
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   detailsContainer: {
//     marginBottom: 24,
//   },
//   detailRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },
//   detailItem: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//     padding: 12,
//     borderRadius: 10,
//     alignItems: "center",
//     marginHorizontal: 4,
//   },
//   detailLabel: {
//     fontSize: 12,
//     color: "#666",
//     marginTop: 4,
//   },
//   detailValue: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//     marginTop: 2,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 12,
//   },
//   vehicleInfoContainer: {
//     marginBottom: 24,
//   },
//   vehicleDetails: {
//     backgroundColor: "#f8f9fa",
//     borderRadius: 10,
//     padding: 12,
//   },
//   vehicleDetailItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   vehicleDetailText: {
//     marginLeft: 8,
//     fontSize: 15,
//     color: "#333",
//   },
//   supplierContainer: {
//     marginBottom: 24,
//   },
//   supplierCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f8f9fa",
//     borderRadius: 10,
//     padding: 12,
//   },
//   supplierIconContainer: {
//     backgroundColor: "#4A90E2",
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   supplierInfo: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   supplierName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   supplierEmail: {
//     fontSize: 14,
//     color: "#666",
//   },
//   contactButton: {
//     backgroundColor: "#4CAF50",
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   trackingContainer: {
//     marginBottom: 24,
//   },
//   progressContainer: {
//     height: 6,
//     backgroundColor: "#E0E0E0",
//     borderRadius: 3,
//     overflow: "hidden",
//     marginBottom: 16,
//   },
//   progressBar: {
//     height: "100%",
//     borderRadius: 3,
//   },
//   stagesContainer: {
//     flexDirection: "row",
//     marginBottom: 16,
//   },
//   stageItem: {
//     alignItems: "center",
//     marginRight: 16,
//     width: 60,
//     opacity: 0.5,
//   },
//   activeStage: {
//     opacity: 1,
//   },
//   stageIconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   stageTitle: {
//     fontSize: 12,
//     color: "#333",
//     textAlign: "center",
//   },
//   stageDetailsContainer: {
//     backgroundColor: "#f8f9fa",
//     borderRadius: 10,
//     padding: 12,
//   },
//   stageDetailsTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 4,
//     color: "#333",
//   },
//   stageDetailsDescription: {
//     color: "#666",
//   },
//   bottomActions: {
//     flexDirection: "row",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     backgroundColor: "#fff",
//     borderTopWidth: 1,
//     borderTopColor: "#e9ecef",
//   },
//   cartButton: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FF6B6B",
//     paddingVertical: 12,
//     borderRadius: 10,
//     marginRight: 8,
//   },
//   buyButton: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#4CAF50",
//     paddingVertical: 12,
//     borderRadius: 10,
//     marginLeft: 8,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     marginLeft: 8,
//   },
// });

// export default ProductDetailsScreen;
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
  StatusBar,
  SafeAreaView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import Display from "../utils/Display";

const { width, height } = Dimensions.get("window");

// Default product data
const DEFAULT_PRODUCT = {
  _id: "67e8078c595737b96dff87ea",
  productType: "Turmeric Waste",
  moisture: "11",
  sands: "4",
  kg: "3",
  price: "200",
  images: [
    {
      id: "2710eb43-b873-4f41-ad4f-cee9154e4288",
      url: "http://localhost:3000/uploads/tags/1743259415348-IMG_0012.jpg",
      key: "tags/1743259415348-IMG_0012.jpg",
      createdAt: "2025-03-29T14:43:35.350Z",
      _id: "67e80717595737b96dff87e7",
    },
    {
      id: "a1e0b9f3-32eb-4006-9455-ed334ae007eb",
      url: "http://localhost:3000/uploads/tags/1743259528859-IMG_0007.jpg",
      key: "tags/1743259528859-IMG_0007.jpg",
      createdAt: "2025-03-29T14:45:28.860Z",
      _id: "67e80788595737b96dff87e9",
    },
  ],
  vechileNo: "KL23K7373",
  noOfVechile: "2",
  totalWeight: "60",
  track: [
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
  ],
  username: "Test",
  email: "test@gmail.com",
};

const ProductDetailsScreen = ({ route, navigation }) => {
  // Safely get product from route.params with fallback to DEFAULT_PRODUCT
  const product = route.params?.product;
  console.log("product track", product.track);
  // Image carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useSharedValue(0);

  // Track state - initialize with product.track or empty array
  const [trackingStages, setTrackingStages] = useState(product?.track || []);

  // Scroll handler for image carousel
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  // Calculate progress percentage
  const calculateProgress = () => {
    const completedStages = trackingStages.filter(
      (stage) => stage.stage
    ).length;
    return trackingStages.length > 0
      ? (completedStages / trackingStages.length) * 100
      : 0;
  };

  // Animated progress bar
  const progressValue = useSharedValue(calculateProgress());

  // Update progress when stages change
  useEffect(() => {
    progressValue.value = withTiming(calculateProgress(), {
      duration: 500,
    });
  }, [trackingStages]);

  // Animated progress style
  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value}%`,
    };
  });

  // Find current active stage
  const currentStage = Math.max(
    trackingStages.findIndex((stage) => !stage.stage) - 1,
    0
  );

  // Function to render dot indicators for image carousel
  const renderDotIndicators = () => {
    return (
      <View style={styles.paginationContainer}>
        {product.images.map((_, index) => {
          const animatedDotStyle = useAnimatedStyle(() => {
            const opacity = interpolate(
              scrollX.value,
              [(index - 1) * width, index * width, (index + 1) * width],
              [0.3, 1, 0.3],
              "clamp"
            );

            const scale = interpolate(
              scrollX.value,
              [(index - 1) * width, index * width, (index + 1) * width],
              [1, 1.2, 1],
              "clamp"
            );

            return {
              opacity,
              transform: [{ scale }],
              backgroundColor: index === currentImageIndex ? "#4CAF50" : "#ccc",
            };
          });

          return (
            <Animated.View key={index} style={[styles.dot, animatedDotStyle]} />
          );
        })}
      </View>
    );
  };

  // Detect when image changes
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentImageIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{product.productType}</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Icon name="share-social-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Carousel */}
        <View style={styles.carouselContainer}>
          <Animated.FlatList
            ref={flatListRef}
            data={product.images}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={scrollHandler}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.url }} style={styles.productImage} />
              </View>
            )}
          />
          {renderDotIndicators()}
        </View>

        {/* Product Info Card */}
        <LinearGradient
          colors={["#ffffff", "#f8f9fa"]}
          style={styles.productInfoCard}
        >
          <View style={styles.productHeader}>
            <View>
              <Text style={styles.productType}>{product.productType}</Text>
              <Text style={styles.productPrice}>₹{product.price}</Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Icon name="heart-outline" size={24} color="#FF6B6B" />
            </TouchableOpacity>
          </View>

          {/* Product Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Icon name="water-outline" size={20} color="#4A90E2" />
                <Text style={styles.detailLabel}>Moisture</Text>
                <Text style={styles.detailValue}>{product.moisture}%</Text>
              </View>

              <View style={styles.detailItem}>
                <Icon name="analytics-outline" size={20} color="#50C878" />
                <Text style={styles.detailLabel}>Sands</Text>
                <Text style={styles.detailValue}>{product.sands}%</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Icon name="scale-outline" size={20} color="#FF6B6B" />
                <Text style={styles.detailLabel}>Weight</Text>
                <Text style={styles.detailValue}>{product.totalWeight} kg</Text>
              </View>

              <View style={styles.detailItem}>
                <Icon name="car-outline" size={20} color="#FFA500" />
                <Text style={styles.detailLabel}>Vehicle</Text>
                <Text style={styles.detailValue}>{product.vechileNo}</Text>
              </View>
            </View>
          </View>

          {/* Vehicle Info */}
          <View style={styles.vehicleInfoContainer}>
            <Text style={styles.sectionTitle}>Vehicle Information</Text>
            <View style={styles.vehicleDetails}>
              <View style={styles.vehicleDetailItem}>
                <Icon name="car-sport-outline" size={22} color="#4A90E2" />
                <Text style={styles.vehicleDetailText}>
                  Number: {product.vechileNo}
                </Text>
              </View>
              <View style={styles.vehicleDetailItem}>
                <Icon name="apps-outline" size={22} color="#50C878" />
                <Text style={styles.vehicleDetailText}>
                  Number of Vehicles: {product.noOfVechile}
                </Text>
              </View>
            </View>
          </View>

          {/* Supplier Info */}
          <View style={styles.supplierContainer}>
            <Text style={styles.sectionTitle}>Supplier Information</Text>
            <View style={styles.supplierCard}>
              <View style={styles.supplierIconContainer}>
                <Icon name="person-outline" size={28} color="#fff" />
              </View>
              <View style={styles.supplierInfo}>
                <Text style={styles.supplierName}>{product.username}</Text>
                <Text style={styles.supplierEmail}>{product.email}</Text>
              </View>
              <TouchableOpacity style={styles.contactButton}>
                <Icon name="call-outline" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tracking Section */}
          {trackingStages.length > 0 && (
            <View style={styles.trackingContainer}>
              <Text style={styles.sectionTitle}>Order Status</Text>

              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <Animated.View
                  style={[
                    styles.progressBar,
                    animatedProgressStyle,
                    {
                      backgroundColor:
                        currentStage >= 0
                          ? trackingStages[currentStage].color
                          : "#E0E0E0",
                    },
                  ]}
                />
              </View>

              {/* Tracking Stages */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.stagesContainer}
              >
                {trackingStages.map((stage, index) => (
                  <View
                    key={`${stage.title}-${index}`}
                    style={[
                      styles.stageItem,
                      stage.stage && styles.activeStage,
                    ]}
                  >
                    <View
                      style={[
                        styles.stageIconContainer,
                        {
                          backgroundColor: stage.stage
                            ? stage.color
                            : "#E0E0E0",
                        },
                      ]}
                    >
                      <Icon name={stage.icon} size={24} color="white" />
                    </View>
                    <Text style={styles.stageTitle}>{stage.title}</Text>
                  </View>
                ))}
              </ScrollView>

              {/* Current Stage Details */}
              {currentStage >= 0 && (
                <View style={styles.stageDetailsContainer}>
                  <Text style={styles.stageDetailsTitle}>
                    {trackingStages[currentStage].title}
                  </Text>
                  <Text style={styles.stageDetailsDescription}>
                    {trackingStages[currentStage].description}
                  </Text>
                </View>
              )}
            </View>
          )}
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  shareButton: {
    padding: 8,
  },
  carouselContainer: {
    height: height * 0.4,
    width: width,
  },
  imageContainer: {
    width: width,
    height: height * 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: Display.setHeight(5),
    width: "100%",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginHorizontal: 4,
  },
  productInfoCard: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 100, // Extra padding for bottom button space
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  productType: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  favoriteButton: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  detailsContainer: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  vehicleInfoContainer: {
    marginBottom: 24,
  },
  vehicleDetails: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 12,
  },
  vehicleDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  vehicleDetailText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#333",
  },
  supplierContainer: {
    marginBottom: 24,
  },
  supplierCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 12,
  },
  supplierIconContainer: {
    backgroundColor: "#4A90E2",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  supplierInfo: {
    flex: 1,
    marginLeft: 12,
  },
  supplierName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  supplierEmail: {
    fontSize: 14,
    color: "#666",
  },
  contactButton: {
    backgroundColor: "#4CAF50",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  trackingContainer: {
    marginBottom: 24,
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 16,
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  stagesContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  stageItem: {
    alignItems: "center",
    marginRight: 16,
    width: 60,
    opacity: 0.5,
  },
  activeStage: {
    opacity: 1,
  },
  stageIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  stageTitle: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  stageDetailsContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 12,
  },
  stageDetailsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  stageDetailsDescription: {
    color: "#666",
  },
  bottomActions: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  cartButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 8,
  },
  buyButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 10,
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default ProductDetailsScreen;
