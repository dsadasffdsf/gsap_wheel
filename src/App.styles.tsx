import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1400px;
  margin: auto;
  height: 100%;
`;

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 115px;
  height: 100%;
`;
export const CircleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 530px;
  position: relative;
`;

export const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #42567a;
  position: absolute;
  top: 50%;
  left: 0;
  opacity: 0.1;
`;

export const SwitchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 80px;
  margin-right: 80px;
`;

export const SliderWrapper = styled.div`
  margin: auto;
  margin-top: 96px;
  margin-left: 80px;
  margin-right: 80px;
`;

export const VerticalLine = styled.div<{ position: string }>`
  width: 1px;
  height: 100%;
  background-color: #42567a;
  position: absolute;
  top: 0;
  opacity: 0.1;
  ${({ position }) => position && `left: ${position};`}
  transform: rotate(180deg);
`;
