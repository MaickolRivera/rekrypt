import { lazy, Suspense } from "react";
import BlurCircle from "./components/BlurCircle";
import Sidebar from "./sections/Sidebar";
import Rekrypt from "./sections/Rekrypt";
import GithubIcon from "./components/icons/GithubIcon";
import { useMethods } from "./hooks/useMethods";
import { useUrlSyncedMethods } from "./hooks/useUrlSyncedMethods";

const Wireframe = lazy(() => import("./components/Wireframe"));

function App() {
  const methods = useMethods();
  const [selectedMethods, setSelectedMethods] = useUrlSyncedMethods(methods);

  return (
    <div className="relative flex lg:items-center justify-center w-screen h-screen text-base-white bg-background font-display">
      <main className="z-10 h-screen w-screen lg:h-[90%] lg:w-[80%] shadow-custom overflow-hidden lg:rounded-3xl">
        <div className="bg-background flex flex-row h-full w-full">

          <Sidebar
            methods={methods}
            selectedMethods={selectedMethods}
            onMethodsChange={setSelectedMethods}
          />

          <Rekrypt selectedMethods={selectedMethods} />

          <aside
            aria-label="Project links"
            className="flex-col-reverse hidden h-full pr-8 lg:py-13 pl-7 lg:flex"
          >
            <a
              target="_blank"
              href="https://github.com/MaickolRivera/rekrypt"
              rel="noopener noreferrer"
              title="View Rekrypt on GitHub"
              aria-label="View Rekrypt on GitHub (opens in a new tab)"
            >
              <GithubIcon className="text-subtext hover:text-base-white lg:w-5" />
            </a>
          </aside>
        </div>

        {/* */}
        <BlurCircle x={200} y={50} size={420} color="rgba(140, 47, 173, 0.28)"/>
        <BlurCircle x={1400} y={700} size={420} color="rgba(140, 47, 173, 0.28)"/>
      </main>

      {/* */}
      <Suspense fallback={null}>
        <Wireframe />
      </Suspense>
    </div>
  );
}

export default App;
