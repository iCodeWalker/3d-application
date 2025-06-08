"use client";
import styles from "../assets/sass/controlPanel.module.scss";
import React, { useEffect } from "react";
import {
  handleFloorDimensionChange,
  handleTileDimensionChange,
} from "../lib/store/features/building/floorSlice/floorSlice";
import { useAppDispatch, useAppSelector } from "../lib/store/hooks";
import CustomizedSelect from "../components/accordion";
import Divider from "@mui/material/Divider";

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

  return (
    <div className={styles.control_panel_container}>
      <Divider />

      <CustomizedSelect />

      <div
        style={{
          marginTop: "20px",
          paddingBottom: "50px",
          height: "20px",
          backgroundColor: "red",
        }}
      ></div>
    </div>
  );
};

export default ControlPanel;
