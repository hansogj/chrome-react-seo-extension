import maybe from "maybe-for-sure";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Card, colors, Column, ContentBody, Row } from "../styled";

interface Props {
  notification: string;
  refObject?: React.MutableRefObject<any>;
  height?: number;
  width?: number;
}

const NotificationContentBody = styled(ContentBody)<
  { error?: boolean } & Pick<Props, "height" | "width">
>`
  position: fixed;
  width: ${(props) => props.width + "px" || "100%"};
  height: ${(props) => props.height + "px" || "100%"};
  background-color: ${colors.dread}80;
  top: 0;
  left: 0;
`;

export const Notification: FC<Props> = ({
  notification,

  refObject,
}: Props) => {
  const [size, setSize] = useState({ width: 580, height: 580 });

  useEffect(() => {
    const interval = setInterval(() => {
      maybe(refObject)
        .mapTo("current")
        .map((it) => (it as unknown as Element).getBoundingClientRect())
        .map(({ width, height }) => setSize({ width, height }))
        .valueOr({ width: 580, height: 580 });
      console.log("is this running");
    }, 1000);
    return () => clearInterval(interval);
  }, [refObject]);

  console.log(size);

  return maybe(notification)
    .map((it) => (
      <>
        <NotificationContentBody {...{ ...size }}>
          <Row width={46}>
            <Column>
              <Card>{it}</Card>
            </Column>
          </Row>
        </NotificationContentBody>
      </>
    ))
    .valueOr(<></>);
};
