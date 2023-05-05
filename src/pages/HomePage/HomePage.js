import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

export default function HomePage() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleGetStartedClick = () => {
    navigate("/register");
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box>
        {user ? (
          <>
            <Typography
              variant="h6"
              component="p"
              sx={{ marginBottom: (theme) => theme.spacing(2) }}
            >
              Welcome {user.email}.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: "none" }}
              onClick={() => navigate("/contacts")}
            >
              Go to Contacts
            </Button>
          </>
        ) : (
          <>
            <Typography
              variant="h3"
              component="h1"
              sx={{ marginBottom: (theme) => theme.spacing(2) }}
            >
              Welcome to the PhoneBook
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{ marginBottom: (theme) => theme.spacing(3) }}
            >
              One place to store all your contacts
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: "none" }}
              onClick={handleGetStartedClick}
            >
              Get started
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}
