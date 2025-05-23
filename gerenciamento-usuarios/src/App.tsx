

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";


const App = () => (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/index" element={<Index />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/gerenciar-usuarios" element={<GerenciarUsuarios />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    
);

export default App;
