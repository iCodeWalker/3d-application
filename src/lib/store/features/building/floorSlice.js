import { createSlice } from "@reduxjs/toolkit";
import { original } from "immer";

const initialState = {
  width: 30,
  length: 30,
  height: 11,
  tileLength: 2,
  tileWidth: 2,
  tileGapColor: "#f1f39c",
  texture: "tile.jpg",
  selectedTileTexture: "tile.jpg",
  selectedTableTExture: "table_texture.jpg",
  selectedWallTexture: {
    front: "",
    back: "",
    left: "",
    right: "",
  },
  isAllWallHidden: true,
  items: [],
};

export const floorSlice = createSlice({
  name: "floor",
  initialState,
  reducers: {
    handleFloorDimensionChange: (state, action) => {
      console.log(action, "handleDimensionChange", state);
      if (action.payload.key === "width") {
        state.width = action.payload.value;
      }
      if (action.payload.key === "length") {
        state.length = action.payload.value;
      }
      // state.items.push(action.payload);
    },

    handleTileDimensionChange: (state, action) => {
      console.log(action, "handleDimensionChange", state.width);
      // state.items.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleFloorDimensionChange, handleTileDimensionChange } =
  floorSlice.actions;

export default floorSlice.reducer;
