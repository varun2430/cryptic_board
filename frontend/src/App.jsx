import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Topic from "./pages/Topic";

const App = () => {
  return (
    <div className=" min-h-screen w-full bg-black">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/topic" element={<Topic />} /> */}
          <Route path="/topic/:topic" element={<Topic />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
