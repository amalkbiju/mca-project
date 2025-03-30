const BACKEND_BASE_URL = "http://192.168.113.202:3000/v1/";
const BACKEND_URLS = {
  LOGIN: "auth/login",
  REGSITER: "auth/register",
  USER_DEATILS: "auth/user-details",
  ADMIN_LOGIN: "auth/admin/login",
  SECURITY_LOGIN: "auth/security/login",
  LAB_LOGIN: "auth/lab/login",
  PRODUCT: "product",
  CREATE_USER_PRODUCTC: "product/user-products",
  IMAGE_UPLOAD: "product/upload-multiple",
};

export default {
  BACKEND_BASE_URL,
  BACKEND_URLS,
};
