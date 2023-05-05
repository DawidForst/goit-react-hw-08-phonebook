import React, { useEffect, useState, useMemo } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import { db, auth } from "../../firebase";
import { doc, onSnapshot, updateDoc, arrayRemove } from "@firebase/firestore";

export default function ContactList({ filterText }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const uid = auth.currentUser.uid;
    const userRef = doc(db, "users", uid);

    const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        if (data.contacts) {
          setContacts(data.contacts);
        } else {
          setContacts([]);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const filteredContacts = useMemo(() => {
    if (!filterText) {
      return contacts;
    }
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [contacts, filterText]);

  const handleDelete = async (index) => {
    try {
      const uid = auth.currentUser.uid;
      const userRef = doc(db, "users", uid);
      const contactToDelete = contacts[index];

      await updateDoc(userRef, {
        contacts: arrayRemove(contactToDelete),
      });

      setContacts((prevContacts) => prevContacts.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <List>
      {filteredContacts.map((contact, index) => (
        <ListItem key={index}>
          <ListItemText primary={contact.name} secondary={contact.phone} />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(index)}
            >
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}
