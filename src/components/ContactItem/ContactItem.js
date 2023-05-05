import React from "react";
import { useDispatch } from "react-redux";
import { removeContact } from "../../redux/actions/contactsActions";
import { ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ContactItem({ contact }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeContact(contact.id));
  };

  return (
    <ListItem>
      <ListItemText primary={contact.name} secondary={contact.phone} />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={handleRemove}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
