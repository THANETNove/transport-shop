const initialState = {
  productTypeId: null,
  errors: null,
  price_user: null,
  price_user_errors: null,
  users_code: null,
  users_code_error: null,
  user_address: null,
  BillData: null,
  BillDataAll: null,
  BillProduct: null,
  points: 0,
  dataSlip: null,
  dataSlipAll: null,
  userAll: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "ID_PRODUCT_TYPE_SUCCESS":
      return {
        ...state,
        productTypeId: action.payload,
      };
    case "ID_PRODUCT_TYPE_ERROR":
      return {
        ...state,
        errors: action.payload,
      };
    case "PRICE_USER_SUCCESS":
      return {
        ...state,
        price_user: action.payload,
      };
    case "PRICE_USER_ERROR":
      return {
        ...state,
        price_user_errors: action.payload,
      };
    case "USERS_CODE_SUCCESS":
      return {
        ...state,
        users_code: action.payload,
      };
    case "USERS_CODE_ERROR":
      return {
        ...state,
        users_code_errors: action.payload,
      };
    case "ADDRESS_SUCCESS":
      return {
        ...state,
        user_address: action.payload,
      };
    case "ADDRESS_ERROR":
      return {
        ...state,
      };
    case "BILL_SUCCESS":
      return {
        ...state,
        BillData: action.payload,
      };
    case "BILL_SUCCESS_ALL":
      return {
        ...state,
        BillDataAll: action.payload,
      };
    case "BILL_PRODUCT_SUCCESS":
      return {
        ...state,
        BillProduct: action.payload,
      };
    case "POINTS_SUCCESS":
      return {
        ...state,
        points: action.payload,
      };
    case "SLIP_SUCCESS":
      return {
        ...state,
        dataSlip: action.payload,
      };
    case "SLIP_ALL_SUCCESS":
      return {
        ...state,
        dataSlipAll: action.payload,
      };
    case "USERS_ALL_SUCCESS":
      return {
        ...state,
        userAll: action.payload,
      };
    case "ADDRESS_ERROR":
      return {
        ...state,
      };
    default:
      return state;
  }
}
