import {
  SET_CONTACTS,
  ADD_CONTACT,
  REMOVE_CONTACT,
  UPDATE_CONTACT,
} from "../actionTypes";

const initialState = {
  contacts: [],
};

export default function contactReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case REMOVE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    default:
      return state;
  }
}
