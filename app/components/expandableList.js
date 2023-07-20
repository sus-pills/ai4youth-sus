import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { GlobalStyles, CustomBorder, CustomColors } from "../global/globalStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ExpandableList = ({ title, items, width, style, listStyle, onChoose }) => {
  const [expanded, setExpanded] = useState(false);

  const [listHeight, setListHeight] = useState(0);

  // const onListLay

  return (
    <View 
      // style={
      //   [{ marginBottom: 400 }]
      // }
    >
      <TouchableOpacity
        activeOpacity={0.6}
        style={[
          styles.listButton,
          GlobalStyles.customShadow,
          { width: width },
          style,
          expanded && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        ]}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.text}>{title}</Text>
        <MaterialCommunityIcons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={30}
          color={"black"}
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>
      {expanded && (
        <ScrollView
          style={[
            styles.itemContainer,
            GlobalStyles.customShadow,
            { width: width },
            listStyle,
          ]}
        >
          {items.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.6}
              key={index}
              style={styles.listItemButton}
              onPress={onChoose}
            >
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listButton: {
    backgroundColor: "#f6f6f6",
    borderRadius: CustomBorder.customRadius,
    padding: 12,
    margin: 18,
    minHeight: 48, // <-- Default Height
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  itemContainer: {
    flex: 1,
    position: "absolute",
    marginHorizontal: 18,
    marginTop: 48 + 24,
    maxHeight: 150,
    overflow: "scroll",
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#f6f6f6",
    borderBottomLeftRadius: CustomBorder.customRadius,
    borderBottomRightRadius: CustomBorder.customRadius,
  },
  listItemButton: {
    padding: 8,
    margin: 4,
    width: "96%",
    backgroundColor: "#f6f6f6",
    borderRadius: CustomBorder.customRadius,
  }
});

export default ExpandableList;
