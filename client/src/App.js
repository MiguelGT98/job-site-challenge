import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/header/Header";
import CreateJobPage from "./pages/CreateJobPage";
import HomePage from "./pages/HomePage";
import JobPage from "./pages/JobPage";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs/:id" element={<JobPage />} />
        <Route path="/post" element={<CreateJobPage />} key={}/>
      </Routes>
    </div>
  );
}

export default App;
