import React, { useState } from "react";
import { ModsTable } from "../../components";
import { GameRunner } from "../../components/GameRunner";
import { Sidebar } from "../../components/Sidebar";
import { CreeperIcon } from "../../icons";

export type DashBoardView = "mods" | "resource_packs" | "shaders";

const DashBoard: React.FC = () => {
  const [view, setView] = useState<DashBoardView>("mods");

  return (
    <div className="h-full">
      <header className="px-6 py-3 flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <div className="p-4 bg-success rounded-full">
            <CreeperIcon className="w-5 text-black" />
          </div>
          <div>
            <h2>MC Manager</h2>
            <p className="text-foreground-500">
              All in one minecraft manager tool
            </p>
          </div>
        </div>
        <GameRunner />
      </header>

      <div className="flex h-full overflow-hidden">
        <aside className="p-6 w-[24rem]">
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

/*
<div className="h-full bg-purple-500">
      <div className="bg-orange-400 p-6 py-2">Titlebar</div>
      <header className="bg-green-600 p-6">Header</header>

      <div className="flex h-full bg-blue-500 overflow-hidden">
        <aside className="p-6 w-[24rem]">
          <Sidebar
            view={view}
            onChange={(view: DashBoardView) => setView(view)}
          />
        </aside>
        <main className="p-6 w-full bg-red-500 h-full">
          {view === "mods" && <ModsTable />}
        </main>
      </div>
    </div>

*/

/*
<div className="px-6 py-3 w-full border-b border-default-50 sticky top-12 flex justify-between items-center bg-background z-50">
        <div className="flex gap-3 items-center">
          <div className="p-4 bg-success rounded-full">
            <CreeperIcon className="w-5 text-black" />
          </div>
          <div>
            <h2>MC Manager</h2>
            <p className="text-foreground-500">
              All in one minecraft manager tool
            </p>
          </div>
        </div>
        <GameRunner />
      </div>

      <div className="flex gap-8 bg-background">
        <Sidebar
          view={view}
          onChange={(view: DashBoardView) => setView(view)}
        />

        <div className="w-full">{view === "mods" && <ModsTable />}</div>
      </div>
*/
