//hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { login } from "../api/Auth/login";


//components
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";

//icons
import { Mail, User } from "lucide-react";

const Login = () => {

  //#region States and Constants
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //#endregion

  //#region Requisição API
  const {mutateAsync: authenticate} = useMutation({
    mutationFn:login,
    onSuccess: (response) => {
      console.log(response)
      setLoading(false);
      navigate("/gerenciar-usuarios");
     },
     onError: (error) => {
       console.error('Error fetching data:', error);
      
     }
   })
   //#endregion

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      window.alert('Usuário ou senha invalidos')
      return;
    }
    
    setLoading(true);
    
    const formData = {
      email,
      password
    }

    authenticate(formData)
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg">

        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center bg-blue-100">
              <User className="h-12 w-12 text-primary text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-3xl pb-[11px] font-bold text-center">Login</CardTitle>
          <p className="text-center text-gray-500 text-muted-foreground">
            Entre com suas credenciais para acessar o sistema
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email"
                  type="email"
                  placeholder="seu@email.com" 
                  className="pl-10 mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
               
              </div>
              <Input 
                id="password"
                type="password" 
                placeholder="••••••••"
                className="mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-vivid text-white cursor-pointer"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <a href="#" className="text-sm font-medium text-primary text-blue-vivid hover:underline">
                  Esqueci minha senha
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
