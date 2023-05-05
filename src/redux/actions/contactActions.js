import { db } from "../../firebase";
import { ADD_CONTACT, REMOVE_CONTACT, SET_CONTACTS } from "../actionTypes";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import { auth } from "../../firebase";

export const addContact = (contact) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "contacts"), contact);
    dispatch({
      type: ADD_CONTACT,
      payload: { ...contact, id: docRef.id },
    });
  } catch (error) {
    console.error("Error adding contact: ", error);
  }
};

export const deleteContact = (id) => async (dispatch) => {
  try {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const contactRef = doc(userRef, "contacts", id);
    await deleteDoc(contactRef);

    dispatch({
      type: REMOVE_CONTACT,
      payload: id,
    });
  } catch (error) {
    console.error("Error deleting contact: ", error);
  }
};

export const fetchContacts = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, "contacts"));
    const contacts = [];
    querySnapshot.forEach((doc) =>
      contacts.push({ ...doc.data(), id: doc.id })
    );
    dispatch({
      type: SET_CONTACTS,
      payload: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts: ", error);
  }
};
