import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './components/Login';
import FileManager from './components/FileManager';
import Layout from './components/Layout';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      <Route path="/" element={
        isAuthenticated ? (
          <Layout>
            <FileManager />
          </Layout>
        ) : (
          <Navigate to="/login" />
        )
      } />
    </Routes>
  );
}

export default App;