import React from "react";
import { Modal } from "react-native";
import CustomButton from "./CustomButton";
import * as S from "../styles/Register.styles";

type Props = {
  visible: boolean;
  onClose: () => void;
  message?: string;
};

export default function AlreadyExistsModal({ visible, onClose, message }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <S.Overlay>
        <S.ModalContent>
          <S.Title>Já Cadastrado</S.Title>
          <S.Message>{message || "Esse item já está cadastrado no sistema."}</S.Message>

          <S.ButtonRow>
            <CustomButton title="OK" onPress={onClose} type="primary" />
          </S.ButtonRow>
        </S.ModalContent>
      </S.Overlay>
    </Modal>
  );
}
