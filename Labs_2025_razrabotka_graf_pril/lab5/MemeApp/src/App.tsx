import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Homepage from "./pages/Home.tsx";
import EditPage from "./pages/Edit.tsx";

function App() {
  return (
    <div className="App">
      <h1>Генератор мемов</h1>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/edit" element={<EditPage />} />
      </Routes>
    </div>
  );
}

export default App;