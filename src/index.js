import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RobotsTxt from "./RobotsTxt";
import ReactDOM from "react-dom/client";
import "./index.scss";
import MemeGenerator from "./MemeGenerator";
import { ThemeProvider } from "./utils/ThemeContext.js";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <MemeGenerator />
        <Routes>
          <Route exact path="/robots.txt" element={<RobotsTxt />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
