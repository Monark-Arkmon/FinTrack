import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignUpSignIn from "./components/Signup";
import Header from "./components/Header";
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider>
      <Router>
        <Header />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<SignUpSignIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
}
export default App;
