import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  height: 12px;
  width: 12px;
  margin-right: 5px;
  display: inline;
`;
type Props = { fill: string };
export const List = ({ fill }: Props) => (
  <Svg
    fill={fill}
    aria-hidden="true"
    viewBox="0 0 1024 1024"
    role="presentation"
  >
    <path d="M146 750v109q0 8-5 13t-13 6H18q-7 0-13-6t-5-13V750q0-8 5-13t13-6h110q7 0 13 6t5 13zm0-220v110q0 7-5 13t-13 5H18q-7 0-13-5t-5-13V530q0-7 5-13t13-5h110q7 0 13 5t5 13zm0-219v110q0 7-5 12t-13 6H18q-7 0-13-6t-5-12V311q0-8 5-13t13-5h110q7 0 13 5t5 13zm878 439v109q0 8-5 13t-13 6H238q-8 0-13-6t-6-13V750q0-8 6-13t13-6h768q7 0 13 6t5 13zM146 91v110q0 8-5 13t-13 5H18q-7 0-13-5t-5-13V91q0-7 5-12t13-6h110q7 0 13 6t5 12zm878 439v110q0 7-5 13t-13 5H238q-8 0-13-5t-6-13V530q0-7 6-13t13-5h768q7 0 13 5t5 13zm0-219v110q0 7-5 12t-13 6H238q-8 0-13-6t-6-12V311q0-8 6-13t13-5h768q7 0 13 5t5 13zm0-220v110q0 8-5 13t-13 5H238q-8 0-13-5t-6-13V91q0-7 6-12t13-6h768q7 0 13 6t5 12z"></path>
  </Svg>
);
export const Collection = ({ fill }: Props) => (
  <Svg fill={fill} viewBox="0 0 1061 1024" role="presentation">
    <path d="M971 986c-42 0-76-34-76-76V114a76 76 0 01152 0v796c0 42-34 76-76 76zM770 986c-42 0-76-34-76-76V114a76 76 0 01152 0v796c0 42-34 76-76 76zM569 986c-42 0-76-34-76-76V114a76 76 0 01152 0v796c0 42-34 76-76 76zM99 963c-8 0-17-2-25-5a76 76 0 01-46-97l268-749a76 76 0 11143 51L171 912a76 76 0 01-72 51z"></path>
  </Svg>
);

export const Eye = ({ fill }: Props) => (
  <Svg fill={fill} viewBox="0 0 1024 1024" role="presentation">
    <path d="M951 549q-87-135-218-202 35 59 35 128 0 106-75 181t-181 75-181-75-75-181q0-69 35-128-131 67-218 202 76 117 191 186t248 70 248-70 191-186zM539 329q0-11-8-19t-19-8q-71 0-123 51t-51 122q0 12 8 20t20 8 19-8 8-20q0-49 35-84t84-34q11 0 19-8t8-20zm485 220q0 19-11 39-80 131-216 211t-285 79-285-80T11 588Q0 568 0 549t11-40q80-131 216-210t285-80 285 80 216 210q11 20 11 40z"></path>
  </Svg>
);
