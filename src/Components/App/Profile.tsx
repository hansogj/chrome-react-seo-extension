import maybe from "maybe-for-sure";
import React, { FC } from "react";
import styled from "styled-components";
import { User } from "../../domain";
import { logOut } from "../../redux/app/app.actions";
import { base, ContentBody, DreadButton, shade, Thumb } from "../styled";

export interface Props {
  user: Optional<User>;
  logOut: typeof logOut;
}

const HeaderContent = styled(ContentBody)`
  align-items: end;
  position: relative;
  height: calc(${base} * 6);
  img {
    ${shade};
    border-radius: calc(${base} * 5);
  }
  &:hover {
    cursor: pointer;
    button {
      display: block;
    }
  }
  button {
    position: absolute;
    right: calc(${base} * 1);
    top: calc(${base} * 6);
    display: none;
  }
`;

const Profile: FC<Props> = ({ user, logOut }: Props) => {
  return (
    <HeaderContent>
      {maybe(user)
        .mapTo("avatar_url")
        .map((src) => <Thumb {...{ src }} />)
        .valueOr(<></>)}
      <DreadButton
        onClick={() => {
          debugger;
          logOut();
        }}
      >
        Log out
      </DreadButton>
    </HeaderContent>
  );
};
export default Profile;
