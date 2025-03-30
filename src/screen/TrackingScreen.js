import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const TrackingScreen = ({ route, navigation }) => {
  const { orderDetails } = route.params;
  const [trackingStages, setTrackingStages] = useState([
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
      title: "Packaging",
      description: "Your order is being packed",
      icon: "cube-outline",
      color: "#FF6B6B",
      stage: true,
    },
    {
      title: "Out for Delivery",
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
      stage: true,
    },
  ]);

  // Calculate progress percentage
  const calculateProgress = () => {
    const completedStages = trackingStages.filter(
      (stage) => stage.stage
    ).length;
    return (completedStages / (trackingStages.length - 1)) * 100;
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
  const currentStage = trackingStages.findIndex(
    (stage) => stage.stage === true
  );

  // Update stage method
  const updateStage = (index) => {
    const updatedStages = trackingStages.map((stage, idx) => ({
      ...stage,
      stage: idx <= index,
    }));
    setTrackingStages(updatedStages);
  };

  return (
    <LinearGradient colors={["#F0F4F8", "#FFFFFF"]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Tracking</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Order Summary */}
      <View style={styles.orderSummaryContainer}>
        <Text style={styles.orderNumberText}>
          Order #{Math.floor(Math.random() * 1000000)}
        </Text>
        <Text style={styles.totalAmountText}>
          Total: ${orderDetails.totalAmount.toFixed(2)}
        </Text>
      </View>

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
          <TouchableOpacity
            key={stage.title}
            style={[styles.stageItem, stage.stage && styles.activeStage]}
            // onPress={() => updateStage(index)}
          >
            <View
              style={[
                styles.stageIconContainer,
                {
                  backgroundColor: stage.stage ? stage.color : "#E0E0E0",
                },
              ]}
            >
              <Icon name={stage.icon} size={24} color="white" />
            </View>
            <Text style={styles.stageTitle}>{stage.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Current Stage Details */}
      <View style={styles.stageDetailsContainer}>
        <Text style={styles.stageDetailsTitle}>
          {trackingStages[currentStage].title}
        </Text>
        <Text style={styles.stageDetailsDescription}>
          {trackingStages[currentStage].description}
        </Text>
      </View>

      {/* Order Items */}
      <ScrollView style={styles.itemsContainer}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        {orderDetails.items.map((item) => (
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
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "transparent",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  orderSummaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  orderNumberText: {
    fontSize: 16,
    color: "#666",
  },
  totalAmountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 16,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  stagesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  stageItem: {
    alignItems: "center",
    marginHorizontal: 8,
    opacity: 0.5,
  },
  activeStage: {
    opacity: 1,
  },
  stageIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  stageTitle: {
    fontSize: 12,
    color: "#333",
  },
  stageDetailsContainer: {
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.8)",
    marginHorizontal: 16,
    borderRadius: 10,
  },
  stageDetailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  stageDetailsDescription: {
    color: "#666",
  },
  itemsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 8,
  },
  orderItemName: {
    fontSize: 14,
  },
  orderItemQuantity: {
    fontSize: 12,
    color: "#666",
  },
  orderItemPrice: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default TrackingScreen;
