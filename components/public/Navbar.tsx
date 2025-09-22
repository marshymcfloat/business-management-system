import Link from "next/link";
import { Button } from "../ui/button";
import AuthButton from "./auth/AuthButton";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-2">
      <h1 className="font-bold text-2xl tracking-widest">Beautyfeel</h1>
      <ul className="flex gap-4 items-center text-md">
        <li>Home</li>
        <li>About us</li>

        <li>
          <AuthButton />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
