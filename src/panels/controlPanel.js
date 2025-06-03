"use client";
import styles from "../assets/sass/controlPanel.module.scss";
import React, { useEffect } from "react";
import {
  handleFloorDimensionChange,
  handleTileDimensionChange,
} from "../lib/store/features/building/floorSlice/floorSlice";
import { useAppDispatch, useAppSelector } from "../lib/store/hooks";
import ControlledAccordions from "../components/accordion";

const ControlPanel = () => {
  const dispatch = useAppDispatch();

  const floorData = {
    widthOptions: [
      { label: "10", value: "10" },
      { label: "20", value: "20" },
      { label: "30", value: "30" },
      { label: "40", value: "40" },
      { label: "50", value: "50" },
      { label: "60", value: "60" },
      { label: "70", value: "70" },
    ],
    lengthOptions: [
      { label: "10", value: "10" },
      { label: "20", value: "20" },
      { label: "30", value: "30" },
      { label: "40", value: "40" },
      { label: "50", value: "50" },
      { label: "60", value: "60" },
      { label: "70", value: "70" },
    ],
  };
  const floor = useAppSelector((state) => state.floor);

  useEffect(() => {}, [floor]);

  console.log(floor, "control panel");
  return (
    <div className={styles.control_panel_container}>
      <ControlledAccordions />
    </div>
  );
};

export default ControlPanel;
