import { lazy, Suspense, useState } from "react";
import BlurCircle from "./components/BlurCircle";
import Sidebar from "./sections/Sidebar";
import Rekrypt from "./sections/Rekrypt";
import GithubIcon from "./components/icons/GithubIcon";

const Wireframe = lazy(() => import("./components/Wireframe"));

function App() {
  const [selectedMethods, setSelectedMethods] = useState<string[]>([
    "SHA_256",
    "BASE 64",
  ]);

  return (
    <div className="relative flex lg:items-center justify-center w-screen h-screen text-base-white bg-background font-display">
      <main className="z-10 h-screen w-screen lg:h-[85%] lg:w-[70%] shadow-custom overflow-hidden lg:rounded-3xl">
        <div className="bg-background flex flex-row h-full w-full">
          
          <Sidebar selectedMethods={selectedMethods} onMethodsChange={setSelectedMethods}/>

          <Rekrypt selectedMethods={selectedMethods} />
          
          <aside className="flex-col-reverse hidden h-full pr-8 lg:py-14 pl-7 lg:flex">
            <a
              target="_blank"
              href="https://github.com/m4icol/rekrypt"
              rel="noopener noreferrer"
              title="View Rekrypt on GitHub"
              aria-label="View Rekrypt on GitHub"
            >
              <GithubIcon className="text-subtext hover:text-base-white lg:w-8" />
            </a>
          </aside>
        </div>

        {/* */}
        <BlurCircle x={150} y={550} size={420} color="rgba(140, 47, 173, 0.28)"/>
        <BlurCircle x={1100} y={10} size={420} color="rgba(140, 47, 173, 0.28)"/>
      </main>

      {/* */}
      <Suspense fallback={null}>
        <Wireframe />
      </Suspense>
    </div>
  );
}

export default App;
