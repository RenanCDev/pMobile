import styled from 'styled-components/native';
import colors from '../constants/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.dark.background};
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 30px;
  color: ${colors.text.inverted};
  text-align: center;
`;
