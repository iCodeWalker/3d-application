"use client";
import BuildingPanel from "@/src/panels/buildingPanel";
import ControlPanel from "@/src/panels/controlPanel";
import FooterPanel from "@/src/panels/footerPanel";
import HeaderPanel from "@/src/panels/headerPanel";
import { useAppSelector } from "../lib/store/hooks";

const App = () => {
  const authentication = useAppSelector((state) => state.authentication);

  console.log(authentication, "Experience");

  return (
    <>
      <header>
        <HeaderPanel />
      </header>
      <section>
        <BuildingPanel />
      </section>
      <section>
        <ControlPanel />
      </section>
      <section>
        <FooterPanel />
      </section>
    </>
  );
};
export default App;
