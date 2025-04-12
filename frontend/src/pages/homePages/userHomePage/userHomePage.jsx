import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<UserHomePage />} />
        {/* You can add additional routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
