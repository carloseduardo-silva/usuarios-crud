import { Link } from "react-router-dom";


const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-[3rem]">
      <div className="text-center max-w-[1400px]">
        <h1 className="text-4xl font-bold mb-4">Seja bem vindo ao meu projeto de Gerenciamento de Usuários!</h1>
        <p className="text-xl text-gray-600 mt-[2rem]">Para ter acesso ao sistema, você será submetido à uma autenticação onde você deverá utilizar as seguintes credenciais:</p>
        <p className="text-xl text-gray-600 font-bold mt-8 mb-2">Email: Admin@admin.com</p>
        <p className="text-xl text-gray-600 font-bold mb-8">Senha: admin</p>
        <p className="text-xl text-gray-600">Após realizar a autenticação no sistema, você tera acesso a tela de gerenciamento de usuários, onde será possível: criar, editar, excluir usuários além de realizar consultas personalizadas utilizando os filtros! </p>
        <Link to={"/login"}>  
          <p className="text-[20px] font-semibold pt-[2rem] underline">Realizar Login </p> 
        </Link>
      </div>
    </div>
  );
};

export default Index;
