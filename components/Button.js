import cc from "classcat";

import { useThemeState } from "../context/theme";

const buttonStyle = (theme) => {
  switch (theme) {
    case "kitchen-sink-journal-chopchop-shop":
      return "bg-clementine text-black";
    case "walnut-cooks-tools-chopchop-shop":
      return "bg-tumbleweed text-black";
    case "essential-knife-set-chopchop-shop":
      return "bg-hawkes-blue text-black";
    case "private-cooking-class-chopchop-shop":
      return "bg-asparagus text-black";
    case "ceramic-dutch-oven-chopchop-shop":
      return "bg-goldenrod text-black";
    default:
      return "bg-white-rock";
  }
};

function Button({ className, ...props }) {
  const theme = useThemeState();

  const buttonClass = cc([
    "appearance-none border-none px-1 md:px-2 text-lg md:text-xl rounded",
    buttonStyle(theme),
    className,
  ]);

  return <button {...props} className={buttonClass} />;
}

export default Button;
