import React, { useState } from "react";
import { Header, ModsTable } from "../../components";
import { Sidebar } from "../../components/Sidebar";

export type DashBoardView = "mods" | "resource_packs" | "shaders";

const DashBoard: React.FC = () => {
  const [view, setView] = useState<DashBoardView>("mods");

  return (
    <div className="h-full">
      <Header />

      <div className="flex h-full overflow-hidden">
        <aside className="p-6 w-[18rem]">
          <Sidebar
            view={view}
            onChange={(view: DashBoardView) => setView(view)}
          />
        </aside>
        <main className="p-6 w-full h-full">
          {view === "mods" && <ModsTable />}
        </main>
      </div>
    </div>
  );
};

export default DashBoard;
