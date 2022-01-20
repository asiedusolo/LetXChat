const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetchingUser: true,
        error: false,
      };
      case "LOGIN_SUCCESS":
          return {
              user: action.payload,
              isFetchingUser: false,
              error: false,
          }
      case "LOGIN_FAILURE":
          return {
              user: null,
              isFetchingUser: false,
              error: true
          }
      default:
          return state
  }
};


export default AuthReducer
