import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";

interface headerProps {
  type?: string;
}

const Header = ({ type }: headerProps) => {
  return (
    <header className="bg-background border-b border-foreground flex justify-between items-center py-2 px-2 md:px-8 sticky z-50 top-0">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <CheckCircle className="h-5 w-5 text-primary-foreground" />
        </div>
        <Link to="/" className="text-xl font-bold text-foreground">
          CatatanKu
        </Link>
      </div>

      <div className="flex gap-2">
        <ModeToggle />
        {type === "login" && (
          <div className="flex items-center space-x-2">
            <Link to="/register">
              <Button className="font-medium">Register</Button>
            </Link>
          </div>
        )}

        {type === "register" && (
          <div className="flex items-center space-x-2">
            <Link to="/Login">
              <Button className="font-medium">Login</Button>
            </Link>
          </div>
        )}

        {type === "home" && (
          <div className="flex items-center space-x-2">
            <Link to="/register">
              <Button className="font-medium">Get started</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
