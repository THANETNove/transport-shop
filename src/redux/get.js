const initialState = {
  productTypeId: null,
  errors: null,
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
    default:
      return state;
  }
}
