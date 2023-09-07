const initialState = {
  productTypeId: null,
  errors: null,
  price_user: null,
  price_user_errors: null,
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
    default:
      return state;
  }
}
