import { useState } from "react";
import { TextField } from "@mui/material";

export default function Filter({ onFilter }) {
  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
    onFilter(event.target.value);
  };

  return (
    <div
      style={{
        maxWidth: 400,
        padding: "12px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TextField
        label="Filter contacts"
        value={filterText}
        onChange={handleFilterChange}
        fullWidth
        margin="normal"
        variant="standard"
        sx={{
          backgroundColor: "#f7f7f7",
          borderRadius: "4px",
          marginY: "12px",
          color: "#333",
        }}
      />
    </div>
  );
}
