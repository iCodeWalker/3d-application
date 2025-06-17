"use client";
import { useAppSelector } from "@/src/lib/store/hooks";
import { useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";

/**
 * Floor model to create floor section in 3D
 */

/**
 *
 * @param {length, width, tileLength, tileWidth, tileFillingColor, texture}
 * length : length of floor
 * width : width of floor
 * tileWidth : width of tile
 * tileLength : length of tile
 * tileFillingColor : color between the gap tiles
 * texture : tile image
 *
 * @returns Floor Model
 */

const FloorModel = ({
  length,
  width,
  tileLength,
  tileWidth,
  tileFillingColor = "red",
  texture = "images/tile11.jpg",
}) => {
  if (texture === "images/undefined.jpg") {
    texture = "images/tile11.jpg";
  }

  const tileTexture = useLoader(THREE.TextureLoader, texture);
  const tileGapColor = new THREE.Color(tileFillingColor);

  /**
   * Repeating Tile Texture
   */
  tileTexture.repeat.set(1, 1);
  tileTexture.wrapS = THREE.RepeatWrapping;
  tileTexture.wrapT = THREE.RepeatWrapping;

  const floor = useAppSelector((state) => state.floor);

  const createTilesMesh = useMemo(() => {
    let meshInXDirection = [];
    /**
     * xDirectionStartingCordinates : Array with x-coordinates of the tile
     */

    let xDirectionStartingCordinates = Array.from(
      { length: Math.ceil(width / tileWidth) },
      (_, i) => i * (tileWidth + 0.02)
    );

    /**
     * zDirectionStartingCordinates : Array with z-coordinates of the tile
     */

    let zDirectionStartingCordinates = Array.from(
      { length: Math.ceil(length / tileLength) },
      (_, i) => (i + 1) * (-tileLength - 0.02)
    );

    let tilePositionData = [];

    for (let i = 0; i < xDirectionStartingCordinates.length; i++) {
      /**
       * looping through the x-coordinate data to create position object that have start & end points data
       */
      let positionObj = {};
      let xEndPoint =
        parseFloat(xDirectionStartingCordinates[i]) + parseFloat(tileWidth);
      /**
       * Checking if last tile width is going out of given floor width
       */
      if (
        parseFloat(xDirectionStartingCordinates[i]) + parseFloat(tileWidth) >
        width
      ) {
        xEndPoint = width;
      }
      /**
       * positionObj :Position object containing start & end points data
       */
      positionObj = {
        xPosition: {
          start: parseFloat(xDirectionStartingCordinates[i]),
          end: parseFloat(xEndPoint),
        },
      };

      for (let j = 0; j < zDirectionStartingCordinates.length; j++) {
        /**
         * looping through the z-coordinate data to create position object that have start & end points data
         */
        let zEndPoint =
          parseFloat(zDirectionStartingCordinates[j]) + parseFloat(tileLength);

        /**
         * Checking if last tile length is going out of given floor length
         */
        if (
          parseFloat(zDirectionStartingCordinates[j]) + parseFloat(tileLength) >
          length
        ) {
          zEndPoint = length;
        }
        /**
         * positionObj : Position object containing start & end points data
         */
        positionObj = {
          ...positionObj,
          zPosition: {
            start: parseFloat(zDirectionStartingCordinates[j]),
            end: parseFloat(zEndPoint),
          },
        };
        tilePositionData.push(positionObj);
      }
    }

    meshInXDirection = tilePositionData?.map((Coordinate, index) => {
      console.log(Coordinate, "Coordinate");
      /**
       *  actualTileWidth : Calculating actual tile width to create a tile
       */
      let actualTileWidth =
        Math.ceil(
          parseFloat(Coordinate.xPosition.end) -
            parseFloat(Coordinate.xPosition.start)
        ) <= tileWidth
          ? Math.ceil(
              parseFloat(Coordinate.xPosition.end) -
                parseFloat(Coordinate.xPosition.start)
            )
          : Math.floor(
              parseFloat(Coordinate.xPosition.end) -
                parseFloat(Coordinate.xPosition.start)
            );
      /**
       *  actualTileLength : Calculating actual tile length to create a tile
       */
      let actualTileLength =
        Math.ceil(
          parseFloat(Coordinate.zPosition.end) -
            parseFloat(Coordinate.zPosition.start)
        ) <= tileLength
          ? Math.ceil(
              parseFloat(Coordinate.zPosition.end) -
                parseFloat(Coordinate.zPosition.start)
            )
          : Math.floor(
              parseFloat(Coordinate.zPosition.end) -
                parseFloat(Coordinate.zPosition.start)
            );
      /**
       * tileCenterOffsetX : Offset value for shifting tiles towards the origin in x direction
       */
      let tileCenterOffsetX = actualTileWidth / 2;
      /**
       * tileCenterOffsetZ : Offset value for shifting tiles towards the origin in z direction
       */
      let tileCenterOffsetZ = actualTileLength / 2;

      return (
        <mesh
          key={index}
          position={[
            parseFloat(Coordinate.xPosition.start) + tileCenterOffsetX, // corrected X position
            0,
            parseFloat(Coordinate.zPosition.start) + tileCenterOffsetZ, // corrected Z position
          ]}
        >
          <boxGeometry
            args={[actualTileWidth, floor?.tileThickness, actualTileLength]}
          />
          <meshStandardMaterial map={tileTexture} side={THREE.DoubleSide} />
        </mesh>
      );
    });

    /**
     * Creating tiles meshes in x-direction : Code Ends :
     */

    return meshInXDirection;
  }, [width, length, tileWidth, tileLength, tileTexture, floor?.tileThickness]);

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight castShadow position={[0, 10, 0]} intensity={2} />

      {...createTilesMesh}
    </>
  );
};

export default FloorModel;
