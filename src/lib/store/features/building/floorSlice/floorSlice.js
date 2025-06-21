import { createSlice } from "@reduxjs/toolkit";
import { actionTypes } from "../actionTypes";

/**
 *
 * ############ Initial States Descriptions: ############
 *
 * 1. width : Width of the floor.
 * 2. length: Length of the floor.
 * 3. tileLength : Length of a single tile.
 * 4. tileWidth : Width of a single tile.
 * 5. tilefillingColor : Color of the filling between the tile.
 * 6. tileTexture : Texture of the tile (Image)
 *
 */

const initialState = {
  width: 41,
  length: 27,
  tileLength: 3,
  tileWidth: 3,
  tileThickness: 0.1,
  tileFillingColor: "#f2f2f2",
  tileTexture: "tile13.jpg",
};

export const floorSlice = createSlice({
  name: "floor",
  initialState,
  reducers: {
    /**
     * handleFloorDimensionChange : Function to handle dimension changes of the floor
     * @param {*} state : reducer state
     * @param {*} action : Object { key, value }
     *
     * 1. key : width, length
     * 2. value : value
     */
    handleFloorDimensionChange: (state, action) => {
      switch (action.payload.key) {
        case actionTypes.WIDTH:
          state.width = parseFloat(action.payload.value);
          return state;

        case actionTypes.LENGTH:
          state.length = parseFloat(action.payload.value);
          return state;

        default:
          return state;
      }
    },

    /**
     * handleTileDimensionChange : Function to handle dimension changes of the tile
     *
     * @param {*} state : reducer state
     * @param {*} action : Object { key, value }
     *
     * 1. key : tileWidth, tileLength, tilethickness
     * 2. value : value
     */

    handleTileDimensionChange: (state, action) => {
      switch (action.payload.key) {
        case actionTypes.TILE_WIDTH:
          state.tileWidth = parseInt(action.payload.value);
          break;

        case actionTypes.TILE_LENGTH:
          state.tileLength = parseInt(action.payload.value);
          break;

        case actionTypes.TILE_THICKNESS:
          state.tileThickness = parseFloat(action.payload.value);
          break;

        default:
          return state;
      }
    },

    /**
     * handleTileAttributesChange : Function to handle attribute changes of the tile (Ex: color, gap color)
     * @param {*} state : reducer state
     * @param {*} action : { key, value }
     *
     * 1. key : tilefillingColor, tileTexture
     * 2. value : value
     */

    handleTileAttributesChange: (state, action) => {
      switch (action.payload.key) {
        case actionTypes.TILE_FILLING_COLOR:
          state.tileFillingColor = action.payload.value;
          return state;

        case actionTypes.TILE_TEXTURE:
          console.log(action.payload.value, "handleTileTextureChange");
          state.tileTexture = `${action.payload.value}.jpg`;
          return state;

        default:
          return state;
      }
    },
  },
});

export const {
  handleFloorDimensionChange,
  handleTileDimensionChange,
  handleTileAttributesChange,
} = floorSlice.actions;

export default floorSlice.reducer;
