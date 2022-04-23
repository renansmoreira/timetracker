import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

export default function App() {
  return (
    <div className="container">
      <Navbar />
      <Outlet />
    </div>
  );
}
