import Login from './Login';
import Register from './Register';
import UserList from "./Pagination";
import {Routes, Route} from 'react-router-dom';
import "./App.css";
import Layout from './Layout';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path='/' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='list' element={<UserList />} />
      </Route>
    </Routes>
  );
}

export default App;
