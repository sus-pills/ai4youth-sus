import React from "react"
import { StyleSheet } from "react-native"

export const CustomColors = {
  "customBackground": "#FFFFFF",
  "customMain": "#47B8E0",
  "customSecondary": "#134074",
  "customAffirmation": "#0BC11D",
  "customNegation": "#F26419",
  "customDarkGray": "#666666",
  "customLightGray": "#dddddd",
  "customText": "#000000",
}

export const ColorsDark = {
  "customBackground": "#0E2A3E",
  "customMain": "#1A5A7D",
  "customSecondary": "#0B344E",
  "customAffirmation": "#0AAE1A",
  "customNegation": "#E75A0D",
  "customText": "#FFFFFF",
}

export const CustomBorder = {
  "customRadius": 8,
}

export const CustomSpacing = {
  "customPadding": 6,
  "customMargin": 12,
  "customGap": 12,
}

export const GlobalStyles = StyleSheet.create({
  customShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
})