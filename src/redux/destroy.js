const initialState = {
  status_list: null,
  errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "DELETE_STATUS_LIST_SUCCESS":
      return {
        ...state,
        status_list: action.payload,
      };
    case "DELETE_STATUS_LIST__ERROR":
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
}
