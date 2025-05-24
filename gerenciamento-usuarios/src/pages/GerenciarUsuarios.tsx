
import { useState, useEffect } from "react";
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
import { Edit, Trash2, User, Mail } from "lucide-react";
import Nav from "../components/Nav/Nav";

// Definir tipo para usuário
interface Usuario {
  id: number;
  nome: string;
  email: string;
}

const GerenciarUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<Usuario[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [alertaExcluirAberto, setAlertaExcluirAberto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
  const [usuarioExcluindo, setUsuarioExcluindo] = useState<Usuario | null>(null);
  
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  
  // Carregar dados iniciais (simulação)
  useEffect(() => {
    const dadosIniciais = [
      { id: 1, nome: "Ana Silva", email: "ana@exemplo.com" },
      { id: 2, nome: "Bruno Costa", email: "bruno@exemplo.com" },
      { id: 3, nome: "Carla Mendes", email: "carla@exemplo.com" },
      { id: 4, nome: "Daniel Oliveira", email: "daniel@exemplo.com" },
      { id: 5, nome: "Eduarda Santos", email: "eduarda@exemplo.com" },
    ];
    
    setUsuarios(dadosIniciais);
    setUsuariosFiltrados(dadosIniciais);
  }, []);
  
  // Filtrar usuários baseado na pesquisa
  useEffect(() => {
    if (pesquisa.trim() === "") {
      setUsuariosFiltrados(usuarios);
    } else {
      const filtrados = usuarios.filter(
        (usuario) =>
          usuario.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
          usuario.email.toLowerCase().includes(pesquisa.toLowerCase())
      );
      setUsuariosFiltrados(filtrados);
    }
  }, [pesquisa, usuarios]);
  
  // Abrir modal para adicionar novo usuário
  const adicionarUsuario = () => {
    setNome("");
    setEmail("");
    setUsuarioEditando(null);
    setModalAberto(true);
  };
  
  // Abrir modal para editar usuário existente
  const editarUsuario = (usuario: Usuario) => {
    setNome(usuario.nome);
    setEmail(usuario.email);
    setUsuarioEditando(usuario);
    setModalAberto(true);
  };
  
  // Preparar exclusão de usuário
  const prepararExclusao = (usuario: Usuario) => {
    setUsuarioExcluindo(usuario);
    setAlertaExcluirAberto(true);
  };
  
  // Excluir usuário
  const confirmarExclusao = () => {
    if (usuarioExcluindo) {
      const novosUsuarios = usuarios.filter(
        (usuario) => usuario.id !== usuarioExcluindo.id
      );
      
      setUsuarios(novosUsuarios);
      //notificação
      
      setAlertaExcluirAberto(false);
      setUsuarioExcluindo(null);
    }
  };
  
  // Salvar ou atualizar usuário
  const salvarUsuario = () => {
    if (!nome || !email) {
        window.alert("Por favor, preencha todos os campos.")
      return;
    }
    
    if (usuarioEditando) {
      // Atualizar usuário existente
      const novosUsuarios = usuarios.map((usuario) =>
        usuario.id === usuarioEditando.id
          ? { ...usuario, nome, email }
          : usuario
      );
      
      setUsuarios(novosUsuarios);
      //notificação
      
    } else {
      // Adicionar novo usuário
      const novoUsuario = {
        id: usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1,
        nome,
        email,
      };
      
      setUsuarios([...usuarios, novoUsuario]);
      //notificação
    }
    
    setModalAberto(false);
  };

  return (
    <>
      <Nav/>


      <div className="container mx-auto py-8 px-4">

        {/* Gerenciar usuários Container */}
        <Card className="shadow-md">
          <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Gerenciamento de Usuários</CardTitle>
              <p className="text-muted-foreground">Adicione, edite ou remova usuários do sistema</p>
            </div>
            <Button onClick={adicionarUsuario} className="shrink-0 bg-blue-vivid cursor-pointer text-white">
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
                className="max-w-md"
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
                        <TableCell className="font-medium">{usuario.nome}</TableCell>
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
                    value={nome}
                    onChange={(e:any) => setNome(e.target.value)}
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
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button onClick={salvarUsuario}>
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
                <strong>{usuarioExcluindo?.nome}</strong>? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmarExclusao}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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