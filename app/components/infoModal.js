import React from "react";
import { View, StyleSheet, Modal } from "react-native";

const InfoModal = ({ children, style }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        style={[styles.modalContainer, style]}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          onLeave();
        }}
      >
        <View>
          {children}
          <IconButton
            iconName={"check"}
            onPress={() => {
              setModalVisible(false);
              onAccept();
              onLeave();
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
});

export default InfoModal;
