import {
  Container,
  Stack,
  OutlinedInput,
  Button,
  Typography,
  TextField,
} from "@mui/material";

import LogoImg from "../../assets/Enamo.png";
import ImageEl from "../../components/utils/ImageEl";
import { useState } from "react";
import { auth } from "../../firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import useStore from "../../store.js";

const initForm = {
  email: "",
  password: "",
};

const AuthScreen = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState(initForm);
  const { setToastr } = useStore();

  const authText = isLogin
    ? "Do not have an account?"
    : "already have an account?";

  const handleChange = (event) => {
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAuth = async () => {
    try {
      setLoading(true);
      if (isLogin) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } else {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      }
    } catch (error) {
      const msg = error.code.split("auth/")[1].split("-").join(" ");
      // console.log(msg);
      setToastr(msg);
      setLoading(false);
    }
  };

  // console.log(form);

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 10,
      }}
    >
      <Stack mb={6} spacing={4} alignItems="center" textAlign="center">
        <ImageEl height={"45px"} src={LogoImg} alt="Enamo" />
        <Typography color="rgba(255,255,255, .6)">
          Visualize Your Workflow for Increased Productivity.
          <br />
          Access Your Tasks Anytime, Anywhere
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <TextField
          value={form.email}
          name="email"
          onChange={handleChange}
          label="Email"
        />
        <TextField
          value={form.password}
          name="password"
          onChange={handleChange}
          label="Password"
        />
        <Button
          disabled={loading || !form.email.trim() || !form.password.trim()}
          onClick={handleAuth}
          size="large"
          variant="contained"
        >
          {isLogin ? "Login" : "Register"}
        </Button>
      </Stack>
      <Typography
        sx={{
          cursor: "pointer",
        }}
        mt={3}
        textAlign="center"
        onClick={() => setIsLogin((current) => !current)}
      >
        {authText}
      </Typography>
    </Container>
  );
};

export default AuthScreen;
