

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import GerenciarUsuarios from "./pages/GerenciarUsuarios";

const queryClient = new QueryClient();

const App = () => (
   
      <BrowserRouter>
      <QueryClientProvider client={queryClient}> 
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
           <Route path="/gerenciar-usuarios" element={<GerenciarUsuarios />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    
);

export default App;
