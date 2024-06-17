import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import FileArea from "./components/fileArea";
<<<<<<< HEAD
import { Provider } from "react-redux";
import RegisterPage from "./COMPONENT/registerPage";
import SignUpPage from "./COMPONENT/createAccount";
import FileArea from "./COMPONENT/fileArea";
import { store, persistor } from "./reactRedux/store";
import PrivateRoute from "./COMPONENT/PrivateRoute";
import { PersistGate } from "redux-persist/integration/react";
=======
import { Provider, useDispatch } from "react-redux";
import RegisterPage from "./COMPONENT/registerPage";
import SignUpPage from "./COMPONENT/createAccount";
import FileArea from "./COMPONENT/fileArea";
import store from "./reactRedux/store";
import PrivateRoute from "./COMPONENT/PrivateRoute";
>>>>>>> 4a40780c8889de48ef17dbc976686d1b35c7ba12
// import store from "./store";

function App() {
  return (
    <Provider store={store}>
<<<<<<< HEAD
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
=======
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
>>>>>>> 4a40780c8889de48ef17dbc976686d1b35c7ba12
    </Provider>
  );
}

export default App;
