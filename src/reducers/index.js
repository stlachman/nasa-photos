import {
  INITIALIZE_REQUEST,
  SUCCESSFUL_REQUEST,
  FAILED_REQUEST
} from "../actions";

const initialState = {
  photoInfo: null,
  isLoading: false,
  error: ""
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case INITIALIZE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: ""
      }
    case SUCCESSFUL_REQUEST:
      return {
        ...state,
        isLoading: false,
        photoInfo: action.payload,
        error: ""
      }
    case FAILED_REQUEST:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return state;
  }
}

export default reducer;