import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { isLightColor } from "../global/globalFunctions";
import {
  CustomBorder,
  CustomColors,
  GlobalStyles,
} from "../global/globalStyles";
import IconButton from "./iconButton";

const SingleModalButton = ({
  title,
  iconName,
  textColor,
  communityIcons,
  buttonStyle,
  onLeave,
  onAccept,
  modalStyle,
  children,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          onLeave();
        }}
      >
        <TouchableWithoutFeedback onPress={() => {
          setModalVisible(false);
          onLeave();
        }}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, GlobalStyles.customShadow, modalStyle]}>
                <View>
                  {children}
                </View>
                <IconButton 
                  iconName={'check'}
                  onPress={() => {
                    setModalVisible(false);
                    onAccept();
                    onLeave();
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <IconButton
        communityIcons={communityIcons}
        iconName={iconName}
        title={title}
        textColor={textColor}
        onPress={() => setModalVisible(true)}
        style={buttonStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: CustomBorder.customRadius,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  modalContainer: {
    position: "absolute",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fafafa",
    justifyContent: 'space-between',
    borderRadius: CustomBorder.customRadius,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  
});

export default SingleModalButton;
