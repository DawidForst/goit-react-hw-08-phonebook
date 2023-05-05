import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { db, auth } from "../../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { Notify } from "notiflix/build/notiflix-notify-aio";

export default function AddContact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    validateForm();
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    validateForm();
  };

  const validateForm = () => {
    const isPhoneValid = /^\d+$/.test(phone);
    if (name && isPhoneValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    setIsPhoneInvalid(!isPhoneValid && phone !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      Notify.failure(
        "Name and phone number are required and phone number should not contain letters."
      );
      return;
    }

    const contact = {
      name,
      phone,
    };

    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        contacts: arrayUnion(contact),
      });

      setName("");
      setPhone("");
      setIsValid(false);
      setIsPhoneInvalid(false);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" component="h2">
        Add Contact
      </Typography>
      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        margin="normal"
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        fullWidth
        label="Phone Number"
        variant="outlined"
        margin="normal"
        value={phone}
        onChange={handlePhoneChange}
        inputProps={{
          pattern: "[0-9]*",
        }}
        onInvalid={() => setIsPhoneInvalid(true)}
        error={isPhoneInvalid}
        helperText={
          isPhoneInvalid ? "Phone number should only contain digits." : ""
        }
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isValid}
        onClick={handleSubmit}
      >
        Add Contact
      </Button>
    </Box>
  );
}
