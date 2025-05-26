import { useAuthStore } from "../../stores/useAuthStore";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Nav = () => {

  const { logout } = useAuthStore.getState();

  return (
    <div className="w-full flex items-center justify-between max-w-[1900px] pt-[1.75rem] md:py-[2rem] px-[1.5rem] md:px-[2.5rem]">
      <div>    
      </div>      
        <Link to={"/login"}>
          <LogOut onClick={() => {logout()}}/>
        </Link>
      
    </div>
  );
};

export default Nav;
