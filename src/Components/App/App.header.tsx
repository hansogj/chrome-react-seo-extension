import React, { FC } from "react";
import styled from "styled-components";
import { User } from "../../domain";
import { Thumb as StyledThumb } from "../styled";
import { ContentHeader } from "./style";

const Thumb = styled(StyledThumb)``;

type Props = { user: Optional<User> };
const AppHeader: FC<Props> = ({ user }: Props) => {
  return <ContentHeader></ContentHeader>;
};
export default AppHeader;
