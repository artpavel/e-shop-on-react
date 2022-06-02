import { createContext, useEffect, useState } from 'react';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  // auth user with help function firebase
  useEffect(() => {
    return onAuthStateChangedListener(user => {
      if(user){
        createUserDocumentFromAuth(user).then();
      }
      setCurrentUser(user);
    });
  }, []);

  return <UserContext.Provider value={ value }>{ children }</UserContext.Provider>;
};