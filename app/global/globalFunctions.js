import hexRgb from "hex-rgb";

export const isLightColor = (bgColor) => {

  const rgb = hexRgb(bgColor ? bgColor : "#000");

  const luminance =
    (0.299 * rgb.red + 0.587 * rgb.green + 0.114 * rgb.blue) / 255;
  return luminance > 0.5;
};
