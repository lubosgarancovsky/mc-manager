import React from "react";
import { CreeperIcon } from "../../icons";
import { GameRunner } from "../GameRunner";

const Header: React.FC = () => {
  return (
    <header className="px-6 py-3 flex items-center justify-between">
      <div className="flex gap-3 items-center">
        <div className="p-4 bg-success rounded-full">
          <CreeperIcon className="w-5 text-black" />
        </div>
        <div>
          <h2>MC Manager</h2>
          <p className="text-foreground-500">All in one Minecraft manager</p>
        </div>
      </div>
      <GameRunner />
    </header>
  );
};

export default Header;
