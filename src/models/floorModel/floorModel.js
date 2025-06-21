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
  tileFillingColor,
  tileThickness,
  texture = "images/tile11.jpg",
}) => {
  if (texture === "images/undefined.jpg") {
    texture = "images/tile11.jpg";
  }

  const tileTexture = useLoader(THREE.TextureLoader, texture);

  /**
   * Repeating Tile Texture
   */
  tileTexture.repeat.set(1, 1);
  tileTexture.wrapS = THREE.RepeatWrapping;
  tileTexture.wrapT = THREE.RepeatWrapping;

  const floor = useAppSelector((state) => state.floor);

  const createTilesMesh = useMemo(() => {
    /**
     * Creating tiles meshes
     *
     * : ########################## Code Starts ########################## :
     */

    let tilesMesh = [];
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
      (_, i) => i * (tileLength + 0.02)
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

    tilesMesh = tilePositionData?.map((Coordinate, index) => {
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

      /**
       * verticalTileFillingModel : Model for vertical tile gap that runs along the length of the floor.
       */
      const verticalTileFillingModel = new THREE.Shape();
      /** Starting point */
      verticalTileFillingModel.moveTo(
        Coordinate.xPosition.end + 0.001,
        -tileThickness / 2
      );
      /** Top left point */
      verticalTileFillingModel.lineTo(
        Coordinate.xPosition.end + 0.001,
        tileThickness / 2
      );
      /** Top right point */
      verticalTileFillingModel.lineTo(
        Coordinate.xPosition.end - 0.001 + 0.02,
        tileThickness / 2
      );
      /** Bottom right point */
      verticalTileFillingModel.lineTo(
        Coordinate.xPosition.end - 0.001 + 0.02,
        -tileThickness / 2
      );
      /** Bottom left point */
      /** Starting point */
      verticalTileFillingModel.lineTo(
        Coordinate.xPosition.end + 0.001,
        -tileThickness / 2
      );
      /** Closing the path */
      verticalTileFillingModel.closePath();

      /**
       * fillingLengthCorrection : As we have included a gap of 0.02 between every tiles so the actual length of
       * the whole 3d model has been increased, so we have to add a correction unit to the length
       *
       * Length of floor / length of tile = number of tiles
       * 1 is subtracted from the tile counts as first tile will not have additional 0.02 length
       *
       * fillingLengthCorrection = ((Length of floor / length of tile = number of tiles) - 1) * 0.02;
       */

      let fillingLengthCorrection =
        Math.floor(parseFloat(length / tileLength) - 1) * 0.02;

      /**
       * verticalTileFillingExtrudeSettings : extrude setting for vertical tile gap
       */
      const verticalTileFillingExtrudeSettings = {
        depth: length + fillingLengthCorrection,
        bevelEnabled: false,
        bevelSegments: 0,
        steps: 1,
        bevelSize: 0.1,
        bevelThickness: 1,
      };

      return (
        <>
          <mesh
            key={index}
            position={[
              parseFloat(Coordinate.xPosition.start) + tileCenterOffsetX, // corrected X position
              0,
              parseFloat(Coordinate.zPosition.start) + tileCenterOffsetZ, // corrected Z position
            ]}
          >
            <boxGeometry
              args={[actualTileWidth, tileThickness, actualTileLength]}
            />
            <meshStandardMaterial map={tileTexture} side={THREE.DoubleSide} />
          </mesh>

          {Coordinate.xPosition.end < width && (
            <mesh>
              <extrudeGeometry
                args={[
                  verticalTileFillingModel,
                  verticalTileFillingExtrudeSettings,
                ]}
              />
              <meshStandardMaterial
                color={tileFillingColor}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}
        </>
      );
    });

    /**
     * horizontalTileFillingModel : Model for horizontal tile gap that runs along the width of the floor.
     */

    const horizontalTileFillingModel = new THREE.Shape();
    /** Starting point */
    horizontalTileFillingModel.moveTo(0, -tileThickness / 2);
    /** Top left point */
    horizontalTileFillingModel.lineTo(0, tileThickness / 2);
    /** Top right point */
    horizontalTileFillingModel.lineTo(0.018, tileThickness / 2);
    /** Bottom right point */
    horizontalTileFillingModel.lineTo(0.018, -tileThickness / 2);
    /** Bottom left point */
    /** Starting point */
    horizontalTileFillingModel.lineTo(0, -tileThickness / 2);
    /** Closing the path */
    horizontalTileFillingModel.closePath();

    /**
     * Creating tile filling gap in horizontal direction that runs along width of floor
     *
     * : ########################## Code Starts ########################## :
     */

    for (let x = 0; x < xDirectionStartingCordinates.length; x++) {
      let actualTileFillingWidth = tileWidth;
      if (
        parseFloat(xDirectionStartingCordinates[x]) + parseFloat(tileWidth) >
        width
      ) {
        actualTileFillingWidth = Math.ceil(
          parseFloat(width) - parseFloat(xDirectionStartingCordinates[x])
        );
      }

      /**
       * HorizontalTileFillingExtrudeSettings : extrude setting for horizontal tile gap that runs along width
       * of the floor
       */

      const horizontalTileFillingExtrudeSettings = {
        depth: actualTileFillingWidth,
        bevelEnabled: false,
        bevelSegments: 0,
        steps: 1,
        bevelSize: 0.1,
        bevelThickness: 1,
      };

      for (let z = 1; z < zDirectionStartingCordinates.length; z++) {
        tilesMesh.push(
          <mesh
            position={[
              xDirectionStartingCordinates[x],
              0,
              zDirectionStartingCordinates[z] - 0.001,
            ]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <extrudeGeometry
              args={[
                horizontalTileFillingModel,
                horizontalTileFillingExtrudeSettings,
              ]}
            />
            <meshStandardMaterial
              color={tileFillingColor}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      }
    }

    /**
     * Creating tile filling gap in horizontal direction that runs along width of floor
     *
     * : ########################## Code Ends ########################## :
     */

    /**
     * Creating tiles meshes
     *
     * : ########################## Code Ends ########################## :
     */

    return tilesMesh;
  }, [
    width,
    length,
    tileWidth,
    tileLength,
    tileTexture,
    tileThickness,
    tileFillingColor,
  ]);

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight castShadow position={[0, 10, 0]} intensity={2} />

      {...createTilesMesh}
    </>
  );
};

export default FloorModel;
