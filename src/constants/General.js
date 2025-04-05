const WELCOME_CONTENTS = [
  {
    image: require("../assets/images/cowImage.jpg"),
    title: "Build Your Dream Home",
    content:
      "Homedot is an integrated online platform for the entire construction industry that will assist you in designing, building and maintaining your home .",
  },
  {
    image: require("../assets/images/cowImage.jpg"),
    title: "Find The Best Professionals In Your Area.",
    content: " You can choose and hire the best professionals from homedot.",
  },
  {
    image: require("../assets/images/cowImage.jpg"),
    title: "Your Home Demands",
    content: "For your future home, Choose us. We will work for you.",
  },
];
const ALERT_MESSAGE_TYPE = {
  NORMAL: "NORMAL",
  AUTO_CLOSER: "AUTO_CLOSER",
  RETRY: "RETRY",
};

const ALERT_MESSAGE_LEVEL = {
  WARNING: "WARNING",
  SUCCESS: "SUCCESS",
  DANGER: "DANGER",
};
export default { WELCOME_CONTENTS, ALERT_MESSAGE_LEVEL, ALERT_MESSAGE_TYPE };
