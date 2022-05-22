import maybe from "maybe-for-sure";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { base, Card, colors, Column, ContentBody, Row } from "../styled";

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

  transition: 1s ease-in-out;
  background-color: ${colors.dark}80;
  top: 0;
  left: 0;

  .card {
    min-width: calc(${base} * 20);
    padding: calc(${base} * 2);
    background-color: ${colors.bright};
    color: ${colors.kindOfBlue};
  }
`;

export const Notification: FC<Props> = ({
  notification,

  refObject,
}: Props) => {
  const [size, setSize] = useState({ width: 580, height: 50 });

  useEffect(() => {
    const interval = setInterval(() => {
      maybe(refObject)
        .mapTo("current")
        .map((it) => (it as unknown as Element).getBoundingClientRect())
        .map(({ width, height }) => setSize({ width, height }))
        .valueOr({ width: 580, height: 50 });
    }, 200);
    return () => clearInterval(interval);
  }, [refObject]);

  return maybe(notification)
    .map((it) => (
      <>
        <NotificationContentBody {...{ ...size }}>
          <Row center>
            <Column center width={46}>
              <Card className="card">{it}</Card>
            </Column>
          </Row>
        </NotificationContentBody>
      </>
    ))
    .valueOr(<></>);
};
