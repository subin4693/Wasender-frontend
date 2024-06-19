import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import FileArea from "./components/fileArea";
import { Provider } from "react-redux";
import RegisterPage from "./COMPONENT/registerPage";
import SignUpPage from "./COMPONENT/createAccount";
import FileArea from "./COMPONENT/fileArea";
import { store, persistor } from "./reactRedux/store";
import PrivateRoute from "./COMPONENT/PrivateRoute";
import { PersistGate } from "redux-persist/integration/react";
// import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/*" element={<RegisterPage />} />
            <Route path="/SignUp" element={<SignUpPage />} />
            <Route
              path="/filearea/*"
              element={
                <PrivateRoute>
                  <FileArea />
                </PrivateRoute>
              }
            />
            {/* <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterAdmin />} />
        <Route path="/filearea/*" element={<FileArea />} /> */}
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
