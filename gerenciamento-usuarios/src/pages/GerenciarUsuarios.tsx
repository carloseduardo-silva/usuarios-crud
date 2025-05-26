
//hooks
import { useState, useEffect } from "react";
import { useMutation } from '@tanstack/react-query';

//Icons
import { Edit, Trash2, User, Mail } from "lucide-react";

//API Requisition Events
import { getUsers } from "../api/Users/get-users";
import { createUser } from "../api/Users/post-user";
import { editUser } from "../api/Users/put-user";
import { excludeUser } from "../api/Users/delete.user";
import type { UserInterface } from "../api/Users/get-users";

//WebSocket Client
import { io } from 'socket.io-client';

//components
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Label } from "../components/ui/label";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import Nav from "../components/Nav/Nav";

//Context
import { useNotification } from "../context/notificationContext/notificationContext";


const GerenciarUsuarios = () => {
  const [usuarios, setUsuarios] = useState<UserInterface[]>([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<UserInterface[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [alertaExcluirAberto, setAlertaExcluirAberto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<UserInterface | null>(null);
  const [usuarioExcluindo, setUsuarioExcluindo] = useState<UserInterface | null>(null);
  
  //URL do servidor de eventos: ws://localhost:3000
  const socket = io('ws://localhost:3000');

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyId] = useState(1);   

  const { showNotification} = useNotification()

  //#region Requisições API
    const {mutateAsync: getUsuarios} = useMutation({
    mutationFn:getUsers,
    onSuccess: (response) => {

      setUsuarios(response);
      setUsuariosFiltrados(response);
     
     },
     onError: (error) => {
       console.error('Error fetching data:', error);
      
     }
   })

    const {mutateAsync: postUser} = useMutation({
    mutationFn:createUser,
    onSuccess: () => {
      getUsuarios()
      return true
              
     },
     onError: (error) => {
       console.error('Error fetching data:', error);
       return false
      
     }
   })
   
   const {mutateAsync: putUser} = useMutation({
    mutationFn:editUser,
    onSuccess: () => {
      return true
     },
     onError: (error) => {
       console.error('Error fetching data:', error);
        return false
     }
   })

   const {mutateAsync: deleteUser} = useMutation({
    mutationFn:excludeUser,
    onSuccess: () => {
      return true
     },
     onError: (error) => {
       console.error('Error fetching data:', error);
        return false
     }
   })

  //#endregion
  
  //#region Eventos assicronos 
    
     useEffect(() => {
       socket.on('userUpdated', (userEdited: UserInterface) => {

          const novosUsuarios = usuarios.map((usuario) =>
          usuario.id === userEdited.id
            ? { ...usuario, name, email }
            : usuario
          );
          
          setUsuarios(novosUsuarios);
          showNotification({message:`${userEdited.name} foi editado com sucesso!`, type:"success"})
         
       });

       socket.on('userDeleted', (userExcluded: UserInterface) => {
        const novosUsuarios = usuarios.filter(
        (usuario) => usuario.id !== userExcluded!.id
        );
      
        setUsuarios(novosUsuarios);
      
        showNotification({message:`${usuarioExcluindo!.name} foi excluido com sucesso!`, type:"warning"}) 
       
       });

      
       return () => {
         socket.off('userUpdated');
         socket.off('userDeleted');
       };
     }, []);
   
   

  //#endregion

  //#region Carregar usuarios
    useEffect(() => { 
      getUsuarios()
    }, []);
  //#endregion
  
  //#region Filtrar usuários baseado na pesquisa
  useEffect(() => {
    if (pesquisa.trim() === "") {
      setUsuariosFiltrados(usuarios);
    } else {
      const filtrados = usuarios.filter(
        (usuario) =>
          usuario.name.toLowerCase().includes(pesquisa.toLowerCase()) ||
          usuario.email.toLowerCase().includes(pesquisa.toLowerCase())
      );
      setUsuariosFiltrados(filtrados);
    }
  }, [pesquisa, usuarios]);
  //#endregion
  
  //#region Abrir modal para adicionar novo usuário
  const adicionarUsuario = () => {
    setName("");
    setEmail("");
    setPassword("")
    setUsuarioEditando(null);
    setModalAberto(true);
  };
  //#endregion
  
  //#region Abrir modal para editar usuário existente
  const editarUsuario = (usuario: UserInterface) => {
    setName(usuario.name);
    setEmail(usuario.email);
    setUsuarioEditando(usuario);
    setModalAberto(true);
  };
  //#endregion
  
  //#region Preparar exclusão de usuário
  const prepararExclusao = (usuario: UserInterface) => {
    setUsuarioExcluindo(usuario);
    setAlertaExcluirAberto(true);
  };
  //#endregion
  
  //#region Excluir usuário
  const confirmarExclusao = async () => {

    if(await deleteUser(usuarioExcluindo!.id)){
       const novosUsuarios = usuarios.filter(
        (usuario) => usuario.id !== usuarioExcluindo!.id
      );
      
      setUsuarios(novosUsuarios);
     
      showNotification({message:`${usuarioExcluindo!.name} foi excluido com sucesso!`, type:"warning"}) 
      
      setAlertaExcluirAberto(false);
      setUsuarioExcluindo(null);
    }

  };
  //#endregion
  
  //#region Salvar ou Atualizar usuário
    const salvarUsuario = async () => {
      if(usuarioEditando){
        if (!name || !email ) {
          window.alert("Por favor, preencha todos os campos.")
        return;
      }
      }
      else{
        if (!name || !email || !password) {
          window.alert("Por favor, preencha todos os campos.")
        return;
      }
      }
      
      if (usuarioEditando) {
      
        const usuarioEditado: UserInterface = { ...usuarioEditando, name, email }

        if(await putUser(usuarioEditado)){

          const novosUsuarios = usuarios.map((usuario) =>
          usuario.id === usuarioEditando.id
            ? { ...usuario, name, email }
            : usuario
        );
          setUsuarios(novosUsuarios);
          showNotification({message:`${usuarioEditado.name} foi editado com sucesso!`, type:"success"})
        }
        
        
      } 
      else {

        // Adicionar novo usuário     
        const novoUsuario = {
          id: usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1,
          name,
          email,
          password,
          companyId,
          createdAt: getCurrentTimestamp()
        };

        if(await  postUser(novoUsuario)){
          showNotification({message:`${novoUsuario.name} foi criado com sucesso!`, type:"success"})
        }
            
        
      }
      
      setModalAberto(false);
    };
  //#endregion

  //#region Funções
  const getCurrentTimestamp = (): string => {
    const now = new Date();
    return now.toISOString();
  };
  //#endregion


  return (
    <>
      <Nav/>


      <div className="container mx-auto py-8 px-4">

        {/* Gerenciar usuários Container */}
        <Card className="shadow-md">
          <CardHeader className="flex flex-col md:flex-row justify-between md:items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-center md:text-left">Gerenciamento de Usuários</CardTitle>
              <p className="text-muted-foreground text-center md:text-left">Adicione, edite ou remova usuários do sistema</p>
            </div>
            <Button onClick={adicionarUsuario} className="shrink-0 bg-blue-vivid cursor-pointer hover:bg-blue-600! text-white mx-auto md:mx-0">
              <User className="h-6 w-6" />
              Adicionar Usuário
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Input
                placeholder="Pesquisar usuários..."
                value={pesquisa}
                onChange={(e:any) => setPesquisa(e.target.value)}
                className="md:max-w-md border-gray-300!"
              />
            </div>
      
            <div className="rounded-md border-1 border-gray-300">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuariosFiltrados.length > 0 ? (
                    usuariosFiltrados.map((usuario) => (
                      <TableRow key={usuario.id}>
                        <TableCell className="font-medium">{usuario.name}</TableCell>
                        <TableCell>{usuario.email}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="cursor-pointer"
                              onClick={() => editarUsuario(usuario)}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive text-red-500 cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => prepararExclusao(usuario)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Excluir</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-6">
                        {usuarios.length === 0
                          ? "Nenhum usuário cadastrado."
                          : "Nenhum usuário encontrado para a pesquisa."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>


        {/* Modal para adicionar/editar usuário */}
        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {usuarioEditando ? "Editar Usuário" : "Adicionar Usuário"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="nome"
                    placeholder="Nome completo"
                    className="pl-10"
                    value={name}
                    onChange={(e:any) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    className="pl-10"
                    value={email}
                    onChange={(e:any) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {!usuarioEditando && 
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="******"
                    className="pl-10"
                    value={password}
                    onChange={(e:any) => setPassword(e.target.value)}
                  />
                </div>
              </div> }
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="cursor-pointer hover:bg-gray-100" variant="outline">Cancelar</Button>
              </DialogClose>
              <Button className="bg-blue-vivid text-white! cursor-pointer hover:bg-blue-600!" onClick={salvarUsuario}>
                {usuarioEditando ? "Atualizar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>


        {/* Modal de confirmação para excluir usuário */}
        <AlertDialog open={alertaExcluirAberto} onOpenChange={setAlertaExcluirAberto}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o usuário{" "}
                <strong>{usuarioExcluindo?.name}</strong>? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer hover:bg-gray-100">Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmarExclusao}
                className="bg-red-600 hover:bg-red-700! text-white! cursor-pointer text-destructive-foreground hover:bg-destructive/90"
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>


      </div>
    </>
  );
};

export default GerenciarUsuarios;