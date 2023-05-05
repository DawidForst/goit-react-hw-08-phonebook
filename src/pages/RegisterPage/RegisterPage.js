import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/actions/authActions";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ email, password }));
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  const error = useSelector((state) => state.auth.error);
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
          <Box sx={{ mt: 2 }}>
            <Typography>
              Already have an account?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
          </Box>
          {error && (
            <Box sx={{ mt: 2 }}>
              <Typography color="error">{error.message}</Typography>
            </Box>
          )}
        </form>
      </Box>
    </Container>
  );
}
