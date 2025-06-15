"use client";
import { useAppSelector } from "@/src/lib/store/hooks";
import { useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";

// depth of floorExtrudeSettings will be considered for the length of the floor.
// first argument of the floorModel.moveTo will be considered for the width of the floor

const FloorModel2 = ({
  length,
  width,
  tileLength,
  tileWidth,
  gapColor = "red",
  texture = "images/tile11.jpg",
}) => {
  const [tilesData, setTilesData] = useState([]);

  console.log(texture, "TextureLoader");
  if (texture === "images/undefined.jpg") {
    texture = "images/tile11.jpg";
  }

  const tileTexture = useLoader(THREE.TextureLoader, texture);
  const tileGapColor = new THREE.Color(gapColor);

  // ################### Repeating Tile Texture ###################
  tileTexture.repeat.set(1, 1);
  // tileTexture.rotation = Math.PI / 2;
  tileTexture.wrapS = THREE.RepeatWrapping;
  tileTexture.wrapT = THREE.RepeatWrapping;

  // ################### Floor Tile Model ###################
  // Subtracted tile gap value from tile size = tileWidth - 0.01
  const floorTileModel = new THREE.Shape();
  floorTileModel.moveTo(0, 0); // Start point
  floorTileModel.lineTo(0, 0.1); // Top left
  floorTileModel.lineTo(tileWidth, 0.1); // Top right
  floorTileModel.lineTo(tileWidth, 0); // Bottom right
  floorTileModel.lineTo(0, 0); // Back to the start point
  floorTileModel.closePath(); // Close the path

  // ################### Floor Tile Extrude Setting  ###################
  const floorTileExtrudeSettings = {
    depth: -tileLength,
    bevelEnabled: false,
    bevelSegments: 1,
    steps: 8,
    bevelSize: 3,
    bevelThickness: 1,
  };

  useEffect(() => {
    // let tilesData = verticalTileMesh();
    // setTilesData([...tilesData]);
  }, [length, width, tileLength, tileWidth, gapColor, texture]);

  const floor = useAppSelector((state) => state.floor);

  console.log(floor, "floorModel================");

  const createTilesInXDirection = useMemo(() => {
    let meshInXDirection = [];

    // ############# Array with x-cordinates of the tile#############
    let xDirectionStartingCordinates = Array.from(
      { length: Math.ceil(width / tileWidth) },
      (_, i) => i * (tileWidth + 0.02)
    );

    // ############# Array with z-cordinates of the tile#############
    let zDirectionStartingCordinates = Array.from(
      { length: length / tileLength },
      (_, i) => i * (tileLength + 0.02)
    );

    let tilePositionData = [];

    console.log(
      xDirectionStartingCordinates,
      "xDirectionStartingCordinates",
      Math.ceil(width / tileWidth)
    );
    for (let i = 0; i < xDirectionStartingCordinates.length; i++) {
      let positionObj = {};
      let endPoint =
        parseFloat(xDirectionStartingCordinates[i]) + parseFloat(tileWidth);
      if (
        parseFloat(xDirectionStartingCordinates[i]) + parseFloat(tileWidth) >
        width
      ) {
        endPoint = width;
      }
      positionObj = {
        xPosition: {
          start: parseFloat(xDirectionStartingCordinates[i]),
          end: parseFloat(endPoint),
        },
      };
      for (let j = 0; j < zDirectionStartingCordinates.length; j++) {
        positionObj = {
          ...positionObj,
          zPosition: zDirectionStartingCordinates[j],
        };
        tilePositionData.push(positionObj);
      }
    }

    console.log("xDirectionStartingCordinates", tilePositionData);

    // ############# Creating tiles meshes in x-direction ############# : Code Starts
    // meshInXDirection = tilePositionData?.map((Coordinate, index) => {
    //   return (
    //     <mesh
    //       position-z={parseFloat(Coordinate.zPosition)}
    //       position-y={0}
    //       position-x={parseFloat(Coordinate.xPosition.start)}
    //       key={index}
    //     >
    //       {console.log(
    //         parseFloat(Coordinate.xPosition.start),
    //         "xDirectionStartingCordinates",
    //         parseFloat(Coordinate.xPosition.end),
    //         parseFloat(Coordinate.xPosition.end) -
    //           parseFloat(Coordinate.xPosition.start)
    //       )}
    //       <boxGeometry
    //         args={[
    //           parseFloat(Coordinate.xPosition.end) -
    //             parseFloat(Coordinate.xPosition.start),
    //           0.1,
    //           tileLength,
    //         ]}
    //       />
    //       <meshStandardMaterial
    //         // color={"red"}
    //         map={tileTexture}
    //         side={THREE.DoubleSide}
    //       />
    //     </mesh>
    //   );
    // });

    meshInXDirection = tilePositionData?.map((Coordinate, index) => {
      const tileWidthValue =
        parseFloat(Coordinate.xPosition.end) -
        parseFloat(Coordinate.xPosition.start);

      const tileCenterOffsetX = tileWidthValue / 2;

      return (
        <mesh
          key={index}
          position={[
            parseFloat(Coordinate.xPosition.start) + tileCenterOffsetX, // corrected X position
            0,
            parseFloat(Coordinate.zPosition) + tileLength / 2, // also center in Z
          ]}
        >
          <boxGeometry args={[tileWidthValue, 0.1, tileLength]} />
          <meshStandardMaterial map={tileTexture} side={THREE.DoubleSide} />
        </mesh>
      );
    });

    // ############# Creating tiles meshes in x-direction ############# : Code Ends

    return meshInXDirection;
  }, [width, length, tileWidth, tileLength, tileTexture]);

  useEffect(() => {}, [floor.width]);

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight castShadow position={[0, 10, 0]} intensity={2} />

      {/* ############# Creating tiles meshes in x-direction ############# : Code Starts */}

      {/* ############# Creating tiles meshes in x-direction ############# : Code Ends */}

      {/* ############# Creating tiles meshes in y-direction ############# : Code Starts */}
      {...createTilesInXDirection}
      {/* <mesh position-z={-2.01} position-y={0} position-x={0}>
        <boxGeometry args={[tileWidth, 0.05, tileLength]} />
        <meshStandardMaterial
          // color={"red"}
          map={tileTexture}
          side={THREE.DoubleSide}
        />
      </mesh> */}
      {/* ############# Creating tiles meshes in y-direction ############# : Code Ends */}

      {/* <mesh position-z={-2.01} position-y={0} position-x={3.01}>
        <boxGeometry args={[tileWidth, 0.05, tileLength]} />
        <meshStandardMaterial
          // color={"red"}
          map={tileTexture}
          side={THREE.DoubleSide}
        />
      </mesh> */}

      {/* <mesh position-z={-2.01} position-y={0} position-x={6.02}>
        <boxGeometry args={[tileWidth, 0.05, tileLength]} />
        <meshStandardMaterial
          // color={"red"}
          map={tileTexture}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position-z={-2.01} position-y={0} position-x={9.03}>
        <boxGeometry args={[tileWidth, 0.05, tileLength]} />
        <meshStandardMaterial
          // color={"red"}
          map={tileTexture}
          side={THREE.DoubleSide}
        />
      </mesh> */}
    </>
  );
};

export default FloorModel2;
