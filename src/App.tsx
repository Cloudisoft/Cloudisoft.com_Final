import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CloudiCore from "./pages/cloudicore";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cloudicore" element={<CloudiCore />} />
      </Routes>
    </Router>
  );
}

export default App;
