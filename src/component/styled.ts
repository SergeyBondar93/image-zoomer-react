import styled from "styled-components";

export const SizeElem = styled.span`
  position: absolute;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  color: red;
`;

export const PreviewImage = styled.img`
  width: ${({ width }) => width + "px"};
`;
