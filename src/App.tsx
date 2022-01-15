import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor, RootState } from "../src/redux/store";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
// views
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Home from "./views/Home";
import { UserLocalSesion } from "./types/UserLocalSesion";
import { useAppSelector } from "./hooks/redux";

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <PersistGate loading={"loading..."} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="*"  element={<Navigate to="/"/>}/>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
      <Toaster
        toastOptions={{
          duration: 4000,
        }}
      />
    </React.Fragment>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth: UserLocalSesion = useAppSelector(
    (state: RootState) => state.sesion
  );

  let location = useLocation();

  if (!auth.access_token) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
