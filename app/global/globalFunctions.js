import hexRgb from "hex-rgb";

export const isLightColor = (bgColor) => {

  const rgb = hexRgb(bgColor ? bgColor : "#000");

  const luminance =
    (0.299 * rgb.red + 0.587 * rgb.green + 0.114 * rgb.blue) / 255;
  return luminance > 0.5;
};

export const handleDate = (date, mode) => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();

  const monthFullNames = {
    1: "STYCZNIA",
    2: "LUTEGO",
    3: "MARCA",
    4: "KWIETNIA",
    5: "MAJA",
    6: "CZERWCA",
    7: "LIPCA",
    8: "SIERPNIA",
    9: "WRZEŚNIA",
    10: "PAŹDZIERNIKA",
    11: "LISTOPADA",
    12: "GRUDNIA",
  };

  if (mode === "r") {
    return `${day} ${monthFullNames[month]} ${year}`;
  }

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};