// Import the controllers functions
const registerUser = require("./registerUser.js");
const validateToken = require("./validateToken.js");
const getCategories = require("./getCategories");
const getLabels = require("./getLabels");
const getUser = require("./getUser");
const getDiscounts = require("./getDiscounts");
const getOrders = require("./getOrders.js");
const postOrder = require("./postOrder.js");
const getMenu = require("./getMenu.js");
const putProduct = require("./putProduct.js");
const tableStates = require("./tableStates.js");
const getOrdersStaff = require("./getOrdersStaff.js");
const deleteOrdered = require("./deleteOrdered");
const postFeedbacks = require("./postFeedbacks");
const getFeedbacks = require("./getFeedbacks");
const getSoldOrder = require("./getSoldOrder");

// ...

module.exports = {
  registerUser,
  validateToken,
  getCategories,
  getLabels,
  getUser,
  getDiscounts,
  getOrders,
  postOrder,
  getMenu,
  putProduct,
  tableStates,
  getOrdersStaff,
  deleteOrdered,
  postFeedbacks,
  getFeedbacks,
  getSoldOrder,
  // ...
};
