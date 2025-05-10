import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Write from './pages/Write';
import Myposts from './pages/Myposts';
import EditPost from './pages/EditPage';
import ProtectedRoute from './Helpers/ProtectedRoute'; 
import { useEffect } from 'react';





function App() {
  useEffect(() => {
    document.title = 'BlogVerse';
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/write"
          element={
            <ProtectedRoute>
              <Write />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myposts"
          element={
            <ProtectedRoute>
              <Myposts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
