import React from "react";
import { Modal, View, Text } from "react-native";
import colors from "../constants/colors";
import CustomButton from "./CustomButton";
import * as S from "../styles/Register.styles";

type Props = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
};

export default function ConfirmDeleteModal({
  visible,
  onCancel,
  onConfirm,
  title = "Confirmar exclusão",
  message = "Deseja realmente excluir este item?",
}: Props) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <S.Overlay>
        <S.ModalContent>
          <S.Title>{title}</S.Title>
          <S.Message>{message}</S.Message>

          <S.ButtonRow>
            <CustomButton title="Cancelar" onPress={onCancel} type="secondary" />
            <CustomButton title="Excluir" onPress={onConfirm} type="danger" />
          </S.ButtonRow>
        </S.ModalContent>
      </S.Overlay>
    </Modal>
  );
}
