import { createContext, useReducer, useContext, useEffect } from "react";

const AuthContext = createContext();

const authReducerFunc = (authState, action) =>{
    switch (action.type) {
        case "CHECK_USER":
              return {
                ...authState,
                user: action.payload.user,
                token: action.payload.token,
              };
              case "LOGIN":
                return {
                  ...authState,
                  user: action.payload.user,
                  token: action.payload.token,
                };
                case "SIGNUP":
                  return {
                    ...authState,
                    user: action.payload.user,
                    token: action.payload.token,
                  };
                  case "LOGOUT":
                    return { 
                      ...authState, 
                      user: null, 
                      token: null 
                    };
         default:
              return authState;
          }
}

const AuthProvider = ({children}) => {
    const [authState, authDispatch] = useReducer(authReducerFunc, {
        user: "",
        token: "",
      });

      const checkUserAuth = () => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        authDispatch({ type: "CHECK_USER", payload: { user, token } });
      };
    
      useEffect(() => checkUserAuth(), []);

    return (<AuthContext.Provider value={{authState, authDispatch}}>{children}</AuthContext.Provider>);
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider};