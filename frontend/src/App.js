import './App.css';
import {Container} from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import MyPosts from './pages/MyPosts';
import Profile from './pages/Profile';


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
                <Route path="/posts/create" element={<CreatePost />}/>
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/my-posts" element={<MyPosts />}/>
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Container>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
