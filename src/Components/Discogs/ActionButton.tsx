import React, { FC, PropsWithChildren } from "react";
import { Button } from "../styled";

interface ActionButtonProps
  extends Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "style"
  > {
  options?: any;
}

const ActionButton: FC<PropsWithChildren<ActionButtonProps>> = ({
  children,
  onClick,
  options,
  style,
}: PropsWithChildren<ActionButtonProps>) => (
  <Button style={style} onClick={onClick}>
    {children}
  </Button>
);
export default ActionButton;
