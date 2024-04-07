import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const IsOperator = createContext({
  isOperator: false,
  operator: () => {},
  notOperator: () => {},
});