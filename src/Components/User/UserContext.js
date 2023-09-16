import { createContext, useContext } from "react";

export const CurrentUserContext = createContext(undefined)

export function useUserContext() {
  var user = useContext(CurrentUserContext)
  if (user === undefined)
  {
    throw new Error("user is undefined")
  }
  return user;
}

