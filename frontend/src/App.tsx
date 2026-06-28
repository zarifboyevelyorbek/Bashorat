import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProfileForm from "./pages/ProfileForm";
import Result from "./pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forma" element={<ProfileForm />} />
        <Route path="/natija/:slug" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;