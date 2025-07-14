import React from "react";
import { Modal } from "react-native";
import CustomButton from "./CustomButton";
import * as S from "../styles/Register.styles";

type Props = {
  visible: boolean;
  onClose: () => void;
  message: string;
};

export default function ErrorModal({ visible, onClose, message }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <S.Overlay>
        <S.ModalContent>
          <S.Title>Erro</S.Title>
          <S.Message>{message}</S.Message>

          <S.ButtonRow>
            <CustomButton title="Fechar" onPress={onClose} type="secondary" />
          </S.ButtonRow>
        </S.ModalContent>
      </S.Overlay>
    </Modal>
  );
}
