import React from "react";
import { Modal } from "react-native";
import CustomButton from "./CustomButton";
import * as S from "../styles/Register.styles";

type Props = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function LogoutConfirmModal({ visible, onCancel, onConfirm }: Props) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <S.Overlay>
        <S.ModalContent>
          <S.Title>Logout</S.Title>
          <S.Message>Deseja realmente sair do app?</S.Message>

          <S.ButtonRow>
            <CustomButton title="Cancelar" onPress={onCancel} type="secondary" />
            <CustomButton title="Sair" onPress={onConfirm} type="danger" />
          </S.ButtonRow>
        </S.ModalContent>
      </S.Overlay>
    </Modal>
  );
}
