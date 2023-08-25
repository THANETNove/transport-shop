const initialState = {
  status_list: null,
  errors: null,
  product_type: null,
  product_type_errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "STATUS_LIST_SUCCESS":
      return {
        ...state,
        status_list: action.payload,
      };
    case "STATUS_LIST_ERROR":
      return {
        ...state,
        errors: action.payload,
      };
    case "PRODUCT_TYPE_SUCCESS":
      return {
        ...state,
        product_type: action.payload,
      };
    case "PRODUCT_TYPE_ERROR":
      return {
        ...state,
        product_type_errors: action.payload,
      };
    default:
      return state;
  }
}
