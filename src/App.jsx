import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthScreen from "./screens/auth-screen/AuthScreen";
import { useEffect } from "react";
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import useStore from "./store.js";
import AppLoader from "./components/layout/AppLoader.jsx";
import PublicOnlyRoute from "./components/utils/PublicOnlyRoute.jsx";
import BoardsScreen from "./screens/boards-screen/BoardsScreen.jsx";
import PrivateRoute from "./components/utils/PrivateRoute.jsx";
import SnackBarManager from "./components/layout/SnackBarManager.jsx";
import BoardScreen from "./screens/board-screnn/BoardScreen.jsx";

const App = () => {
  const { loader, setLoginStatus } = useStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLoginStatus(!!user);
    });
    return () => unsub();
  }, []);

  if (loader) return <AppLoader />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackBarManager />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<PublicOnlyRoute Component={AuthScreen} />}
          />
          <Route
            path="/boards"
            element={<PrivateRoute Component={BoardsScreen} />}
          />
          <Route
            path="/boards/:boardId"
            element={<PrivateRoute Component={BoardScreen} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
