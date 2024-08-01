import React from "react";
import { Button } from "@nextui-org/button";
import { DashBoardView } from "../../views/Dashboard/Dashboard";
import { cn } from "@nextui-org/theme";

interface SidebarProps {
  view: DashBoardView;
  onChange: (view: DashBoardView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ view, onChange }) => {
  const styles = (viewIfActive: DashBoardView) => {
    const isActive = view === viewIfActive;
    return cn("justify-start", { "bg-transparent ": !isActive });
  };

  return (
    <div className="flex flex-col gap-1.5">
      <Button
        className={styles("mods")}
        fullWidth
        onPress={() => onChange("mods")}
      >
        Mods
      </Button>

      <Button
        className={styles("resource_packs")}
        fullWidth
        onPress={() => onChange("resource_packs")}
      >
        Resource packs
      </Button>

      <Button
        className={styles("shaders")}
        fullWidth
        onPress={() => onChange("shaders")}
      >
        Shader packs
      </Button>
    </div>
  );
};

export default Sidebar;
