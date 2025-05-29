"use client";
import styles from "../assets/sass/controlPanel.module.scss";
import React, { useEffect } from "react";
import {
  handleFloorDimensionChange,
  handleTileDimensionChange,
} from "../lib/store/features/building/floorSlice/floorSlice";
import { useAppDispatch, useAppSelector } from "../lib/store/hooks";

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
      <div style={{ margin: "10px" }}>
        <label htmlFor="width">Choose a width:</label>

        <select
          name="width"
          id="width"
          onChange={(e) =>
            dispatch(
              handleFloorDimensionChange({
                key: "width",
                value: e.target.value,
              })
            )
          }
        >
          {floorData.widthOptions?.map((item, index) => {
            return (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
      <div style={{ margin: "10px" }}>
        <label htmlFor="length">Choose a length:</label>

        <select
          name="length"
          id="length"
          onChange={(e) =>
            dispatch(
              handleFloorDimensionChange({
                key: "length",
                value: e.target.value,
              })
            )
          }
        >
          {floorData.lengthOptions?.map((item, index) => {
            return (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default ControlPanel;
