import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

export default function CustomColorPicker() {
  const [color, setColor] = useColor("rgb(86 30 203)");

  return (
    <div
      className="app"
      style={{ maxWidth: "456px", width: "100%", padding: "20px`" }}
    >
      <ColorPicker color={color} onChange={setColor} />
    </div>
  );
}
