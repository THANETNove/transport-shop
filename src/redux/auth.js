const initialState = {
  user: null,
  errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };
    case "REGISTER_ERROR":
      return {
        ...state,
        errors: action.payload,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
}
