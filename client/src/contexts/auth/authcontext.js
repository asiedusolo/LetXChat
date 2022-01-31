import React, { useEffect, useReducer, createContext } from "react";
import AuthReducer from "./authReducer";

const INITIAL_STATE = {
  user: null,
  isFetchingUser: false,
  error: false
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthcontextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetchingUser: state.isFetchingUser,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthcontextProvider;
