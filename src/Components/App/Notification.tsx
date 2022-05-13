import maybe from "maybe-for-sure";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { ContentBody, Row, Column, colors, Size, Card } from "../styled";

interface Props {
  notification: string;
}

const NotificationContentBody = styled(ContentBody)<{
  error?: boolean;
  height?: string;
  width?: string;
}>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.2;
  background-color: ${(props) =>
    props.error ? `${colors.dread}` : `${colors.blueInTheGreen}`};
`;

export const Notification: FC<Props> = ({ notification }: Props) => {
  const defaultSize = { width: "0px", height: "0px" };
  const [size, setSize] = useState(defaultSize);
  useEffect(() => {
    if (!!notification) {
      maybe(document.querySelector("#container"))
        .nothingIf((it) => it === null)
        .map((it) => it!.getBoundingClientRect())
        .map(({ width, height }) =>
          setSize({ width: `${width}px`, height: `${height}px` })
        )
        .valueOr(defaultSize);
    }
  }, [notification]);

  return maybe(notification)
    .map((it) => (
      <NotificationContentBody width={size!.width} height={size!.height}>
        <Card>{it}</Card>
      </NotificationContentBody>
    ))
    .valueOr(<></>);
};
