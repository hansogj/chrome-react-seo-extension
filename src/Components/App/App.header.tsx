import maybe from "maybe-for-sure";
import React, { FC } from "react";
import record from "../../assets/round-record.png";
import { User } from "../../domain";
import { AppLogo, ContentHeader, Stage } from "./style";

type Props = { user: Optional<User> };
const AppHeader: FC<Props> = ({ user }: Props) => (
  <ContentHeader>
    <AppLogo src={record} alt="logo" />
    <h1>
      {maybe(user)
        .mapTo("name")
        .map((it) => `Hi ${it}!`)
        .valueOr(
          <Stage>
            <span className="dots" />
          </Stage>
        )}
    </h1>
  </ContentHeader>
);
export default AppHeader;
