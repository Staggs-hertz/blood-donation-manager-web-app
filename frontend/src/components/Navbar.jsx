import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
  return (
    <div className="bg-white/50 shadow">
      <div className="py-4 flex justify-between items-center w-4/5 mx-auto bg-transparent">
        <img
          src={assets.logo_light}
          className="w-20 max-md:w-20 max-lg:w-29"
          alt="Bloodlink logo"
        />

        <div className="flex gap-5 items-center ">
          <a href="#">Home</a>
          <Link to="/dashboard">
            <a href="#">Dashboard</a>
          </Link>

          <Button text="Donate Now" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
