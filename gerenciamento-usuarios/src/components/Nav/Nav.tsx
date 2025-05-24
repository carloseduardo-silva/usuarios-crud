import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="w-full flex items-center justify-between bg-gray-100 p-[1.8rem]">
      <div>
        
      </div>
      
        <Link to={"/login"}>
          <LogOut/>
        </Link>
      
    </div>
  );
};

export default Nav;
