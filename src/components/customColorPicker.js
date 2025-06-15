import { useEffect } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

export default function CustomColorPicker({
  value = "#111111",
  onChangeColor,
}) {
  const [color, setColor] = useColor("hex", value);

  useEffect(() => {
    onChangeColor(color.hex);
  }, [color]);

  return (
    <div style={{ maxWidth: "456px", width: "100%", padding: "20px`" }}>
      <ColorPicker color={color} onChange={setColor} />
    </div>
  );
}
