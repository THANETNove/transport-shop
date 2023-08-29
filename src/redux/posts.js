const initialState = {
  status_list: null,
  errors: null,
  product_type: null,
  product_type_errors: null,
  product: null,
  statusProduct: "default",
  status_code: "default",
  status_code_errors: "default",
  status_code_data: null,
  status_code_data_errors: null,
  product_errors: null,
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
    case "PRODUCT_SUCCESS":
      return {
        ...state,
        product: action.payload,
      };
    case "STATUS_PRODUCT_SUCCESS":
      return {
        ...state,
        statusProduct: action.payload,
      };
    case "PRODUCT_ERROR":
      return {
        ...state,
        product_errors: action.payload,
        statusProduct: "error",
      };
    case "CODE_SUCCESS":
      return {
        ...state,
        status_code: action.payload,
      };
    case "PRODUCT_ERROR":
      return {
        ...state,
        status_code_errors: action.payload,
      };
    case "PRODUCT_CODE_SUCCESS":
      return {
        ...state,
        status_code_data: action.payload,
      };
    case "PRODUCT_CODE_ERROR":
      return {
        ...state,
        status_code_data_errors: action.payload,
      };
    default:
      return state;
  }
}
