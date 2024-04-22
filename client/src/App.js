import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { useState } from 'react';
import HomeRoute from './Components/HomeRoute';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/home" element={<Home showAlert={showAlert} />}>
            </Route>
            <Route exact path="/" element={<HomeRoute />}></Route>
            <Route exact path="/about" element={<About />}>
            </Route>
            <Route exact path="/login" element={<Login showAlert={showAlert} />}>
            </Route>
            <Route exact path="/signup" element={<SignUp showAlert={showAlert} />}>
            </Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
