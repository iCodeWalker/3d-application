import { useEffect } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

export default function CustomColorPicker({ value, onChangeColor }) {
  const [color, setColor] = useColor("hex", value);

  useEffect(() => {
    console.log(color, "handleColorChange");
    onChangeColor(color.hex);
  }, [color, onChangeColor]);

  return (
    <div style={{ maxWidth: "456px", width: "100%", padding: "20px`" }}>
      <ColorPicker color={color} onChange={setColor} />
    </div>
  );
}
