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
    1: "JANUARY",
    2: "FEBRUARY",
    3: "MARCH",
    4: "APRIL",
    5: "MAY",
    6: "JUNE",
    7: "JULY",
    8: "AUGUST",
    9: "SEPTEMBER",
    10: "OCTOBER",
    11: "NOVERMBER",
    12: "DECEMBER",
  };

  if (mode === "r") {
    return `${day} ${monthFullNames[month]} ${year}`;
  }

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};