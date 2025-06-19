import Image from "next/image";
import React from "react";

import { useAppDispatch, useAppSelector } from "../lib/store/hooks";
import { handleTileAttributesChange } from "../lib/store/features/building/floorSlice/floorSlice";
import { actionTypes } from "../lib/store/features/building/actionTypes";

const ColorCard = ({ imagePath, imageName }) => {
  const floor = useAppSelector((state) => state.floor);

  const dispatch = useAppDispatch();

  const handleTileTextureChange = (event) => {
    console.log(event, "handleTileTextureChange");
    dispatch(
      handleTileAttributesChange({
        key: actionTypes.TILE_TEXTURE,
        value: event.target?.alt,
      })
    );
  };

  return (
    <div
      style={{
        height: "100px",
        width: "120px",
        backgroundColor: "white",
        borderRadius: "4px",
        // margin: "10px",
        boxShadow:
          "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
      }}
      onClick={handleTileTextureChange}
    >
      <Image
        style={{ borderRadius: "4px", overflow: "hidden" }}
        src={imagePath} // relative to the `public/` directory
        alt={imageName}
        width={120}
        height={100}
      />
    </div>
  );
};

export default ColorCard;
