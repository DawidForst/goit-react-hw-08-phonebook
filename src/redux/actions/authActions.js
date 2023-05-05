import { auth, db } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../actionTypes";

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      console.log("Attempting to sign in");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(loginSuccess(user));
      console.log("Sign in successful");
    } catch (error) {
      console.log("Sign in failed", error);
      dispatch(loginFailure(error));
    }
  };

export const registerUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {});

      dispatch({ type: REGISTER_SUCCESS, payload: user });
    } catch (error) {
      dispatch({ type: REGISTER_FAILURE, payload: error });
    }
  };

export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
