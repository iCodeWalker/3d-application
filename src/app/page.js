"use client";
import control_panel_styles from "../assets/sass/controlPanel.module.scss";
import header_panel_styles from "../assets/sass/headerPanel.module.scss";
import footer_panel_styles from "../assets/sass/footerPanel.module.scss";
import building_panel_styles from "../assets/sass/buildingPanel.module.scss";

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
      <div className={header_panel_styles.header_panel_wrapper}>
        <HeaderPanel />
      </div>
      <div className={building_panel_styles.building_panel_wrapper}>
        <BuildingPanel />
      </div>
      <div className={control_panel_styles.control_panel_wrapper}>
        <ControlPanel />
      </div>
      <div className={footer_panel_styles.footer_panel_wrapper}>
        <FooterPanel />
      </div>
    </>
  );
};
export default App;
