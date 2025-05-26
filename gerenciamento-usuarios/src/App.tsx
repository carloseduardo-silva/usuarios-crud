

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import GerenciarUsuarios from "./pages/GerenciarUsuarios";
import { NotificationProvider } from "./context/notificationContext/notificationContext";

const queryClient = new QueryClient();

const App = () => (
   
      <BrowserRouter>
      <QueryClientProvider client={queryClient}> 
        <NotificationProvider> 
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
           <Route path="/gerenciar-usuarios" element={<GerenciarUsuarios />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
        </NotificationProvider>
        </QueryClientProvider>
      </BrowserRouter>
    
);

export default App;
