import React, { FC } from "react";
import styled from "styled-components";
import { base, colors, contentKidStyle, spacings } from "../styled";
import record from "../../assets/round-record.png";
import { User } from "../../api/domain";
import maybe from "maybe-for-sure";

const rpm33 = 60 / 33.3333;
const ContentHeader = styled.header`
  ${contentKidStyle};
  align-items: center;
`;

const AppLogo = styled.img`
  opacity: 0.3;
  pointer-events: none;
  height: calc(${base} * 10);
  width: calc(${base} * 10);
  @media (prefers-reduced-motion: no-preference) {
    animation: App-logo-spin infinite ${rpm33}s linear;
  }


  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;

const Stage = styled.div`
  display: flex;
  width: calc(${base} * 10);
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2rem 0;
  margin: 0 -5%;
  overflow: hidden;

  .dots {
  position: relative;
  width: ${spacings.large};
  height: ${spacings.large};
  border-radius:${spacings.small};
  background-color: ${colors.kindOfBlue};
  color: ${colors.kindOfBlue};
  animation: dotElastic 1s infinite linear;
  }
  
  .dots::before, .dots::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
  }
  
  .dots::before {
    left: -15px;
    width: ${spacings.large};
    height: ${spacings.large};
    border-radius:${spacings.small};
    background-color: ${colors.kindOfBlue};
    color: ${colors.kindOfBlue};
    animation: dotElasticBefore 1s infinite linear;
  }
  
  .dots::after {
    left: 15px;
    width: ${spacings.large};
    height: ${spacings.large};
    border-radius:${spacings.small};
    background-color: ${colors.kindOfBlue};
    color: ${colors.kindOfBlue};
    animation: dotElasticAfter 1s infinite linear;
  }
  
  @keyframes dotElasticBefore {
    0% { transform: scale(1, 1); }
    25% { transform: scale(1, 1.5); }
    50% { transform: scale(1, 0.67); }
    75% { transform: scale(1, 1); }
    100% { transform: scale(1, 1); }
  }
  
  @keyframes dotElastic {
    0% { transform: scale(1, 1); }
    25% { transform: scale(1, 1); }
    50% { transform: scale(1, 1.5); }
    75% { transform: scale(1, 1); }
    100% { transform: scale(1, 1); }
  }
  
  @keyframes dotElasticAfter {
    0% { transform: scale(1, 1); }
    25% { transform: scale(1, 1); }
    50% { transform: scale(1, 0.67); }
    75% { transform: scale(1, 1.5); }
    100% { transform: scale(1, 1); }
  
`;

type Props = { user: Optional<User> };
const AppHeader: FC<Props> = ({ user }: Props) => (
  <ContentHeader>
    <h1>
      {maybe(user)
        .mapTo("name")
        .map((it) => `Hei ${it}`)
        .valueOr(
          <Stage>
            <span className="dots" />
          </Stage>
        )}
    </h1>
    <AppLogo src={record} alt="logo" />
  </ContentHeader>
);
export default AppHeader;
