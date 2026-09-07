import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Overlay from "./components/Overlay";
import "./App.css";

function App() {
  return (
    <>
      <div className="flex w-full h-full p-4 gap-4">
        <Sidebar />
        
        <main className="flex-1 glass-panel rounded-2xl overflow-hidden relative flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
      
      <Overlay />
    </>
  );
}

export default App;
