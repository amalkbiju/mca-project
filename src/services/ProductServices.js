import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import ApiConstants from "../constants/ApiConstants";
import ApiServices from "./ApiServices";

const uploadImage = async (images) => {
  console.log("image array__", images);

  try {
    const data = new FormData();

    images.forEach((image, index) => {
      console.log("image apii", image?.uri);
      data.append("images", {
        uri: image?.uri,
        type: image?.type || "image/jpeg", // Use the image type if available, otherwise default to 'image/jpeg'
        name: image?.fileName || `image_${index}.jpg`, // Use the image name if available, otherwise default to a generic name
      });
    });
    console.log("api urls", ApiConstants?.BACKEND_URLS?.IMAGE_UPLOAD);
    let response = await ApiServices.HttpRequest.post(
      ApiConstants?.BACKEND_URLS?.IMAGE_UPLOAD,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }
    );

    if (response.status === 200) {
      return {
        data: response.data,
        status: true,
      };
    } else {
      return {
        status: false,
        data: response.data,
      };
    }
  } catch (error) {
    console.error(
      "Error uploading images:",
      error.response?.data || error.message
    ); // Log the actual error
    return {
      status: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};
const createProduct = async (
  token,
  selectedProductName,
  imagesUrls,
  moisture,
  sands,
  da,
  calcium,
  kg,
  price
) => {
  console.log("api data", imagesUrls, moisture, sands, da, calcium, kg, price);
  try {
    let response = await ApiServices.HttpRequest.post(
      ApiConstants?.BACKEND_URLS?.PRODUCT,
      {
        productType: selectedProductName,
        moisture: moisture,
        sands: sands,
        calcium: calcium,
        kg: kg,
        da: da,
        price: price,
        images: imagesUrls ? imagesUrls : [],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return {
        status: true,
        data: response.data,
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};
const createUserProduct = async (
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
) => {
  console.log("api data", imagesUrls, moisture, sands, da, calcium, kg, price);
  try {
    let response = await ApiServices.HttpRequest.post(
      ApiConstants?.BACKEND_URLS?.CREATE_USER_PRODUCTC,
      {
        productType: selectedProductName,
        moisture: moisture,
        sands: sands,
        calcium: calcium,
        kg: kg,
        da: da,
        price: price,
        images: imagesUrls ? imagesUrls : [],
        vechileNo: vechileNumber,
        noOfVechile: noOfVechile,
        totalWeight: totalWeight,
        username: userDetails?.username,
        email: userDetails?.email,
        track: productTrack,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return {
        status: true,
        data: response.data,
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};
const getProduct = async (token) => {
  try {
    let response = await ApiServices.HttpRequest.get(
      ApiConstants?.BACKEND_URLS?.PRODUCT,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return {
        status: true,
        data: response.data,
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};
const getUserProduct = async (token) => {
  try {
    let response = await ApiServices.HttpRequest.get(
      ApiConstants?.BACKEND_URLS?.CREATE_USER_PRODUCTC,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return {
        status: true,
        data: response.data,
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};
export default {
  uploadImage,
  createProduct,
  getProduct,
  createUserProduct,
  getUserProduct,
};
