import styles from "../assets/sass/buildingPanel.module.scss";

import React from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "../components/Experience";

const BuildingPanel = () => {
  return (
    <div className={styles.building_panel_container}>
      <Canvas
        shadows
        camera={{
          fov: 75,
          near: 1,
          far: 500,
          position: [15.188620523312036, 10, 5.601433195040627],

          // x: 14.51858152476826, y: 8.549395477302165, z: 21.407729872222447
        }}
      >
        <Experience />
      </Canvas>
    </div>
  );
};

export default BuildingPanel;
