

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import GerenciarUsuarios from "./pages/GerenciarUsuarios";
import { NotificationProvider } from "./context/notificationContext/notificationContext";
import { useAuthStore } from "./stores/useAuthStore";

function App() {

const queryClient = new QueryClient();
// const {token} = useAuthStore.getState()
// const [isLogged, setIsLogged] = useState(false)


// useEffect(() => {
//   isLoggedUser()
// },[token])

// const isLoggedUser = ()=>{

//   console.log(token)

//   if(token){
//     setIsLogged(true)
    
//   }
//   else{
//     setIsLogged(false)
//   }
// }

return (
  <>
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
  
  </>
)
}

export default App;
