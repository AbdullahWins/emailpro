import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  updateEmail,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { firebaseApp } from "../firebase.config/firebase.config";

export const AuthContext = createContext();

const auth = getAuth(firebaseApp);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateUser = (profile) => {
    setIsLoading(true);
    return updateProfile(auth.currentUser, profile);
  };

  const updateEmailAddress = (newEmail) => {
    updateEmail(auth.currentUser, newEmail)
      .then(() => {
        console.log("Email Updated");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const providerLogin = (provider) => {
    setIsLoading(true);
    return signInWithPopup(auth, provider);
  };

  const loginUserEmail = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetUserPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("password reset email sent");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const deletCurrentUser = () => {
    deleteUser(user)
      .then(() => {
        console.log("User deleted");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("verification email sent");
    });
  };

  const createNewUserEmail = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setIsLoading(true);
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log(user);

  const authInfo = {
    user,
    setUser,
    updateUser,
    verifyEmail,
    deletCurrentUser,
    updateEmailAddress,
    createNewUserEmail,
    loginUserEmail,
    resetUserPassword,
    providerLogin,
    logout,
    isLoading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
