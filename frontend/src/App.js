import './App.css';
import {Container, Row, Col, Navbar} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { AuthProvider } from './contexts/AuthContext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';


function App() {

  

  return (
    <>
      <Router>
        <AuthProvider>
          <NavBar />
            <Container>
              <Routes>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/" element={<Home />} />
              </Routes>
            </Container>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
