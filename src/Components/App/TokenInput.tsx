import React, { FC, useState } from "react";
import { AppActionTypes } from "../../redux/app";
import { Submit, Card, base, Column, ContentBody, Input, Row } from "../styled";

export interface TokenInputProps {
  setUserToken: Fn<[string], AppActionTypes>;
}

const TokenInput: FC<TokenInputProps> = ({
  setUserToken: onClick,
}: TokenInputProps) => {
  const [token, setToken] = useState<string>("");

  return (
    <ContentBody>
      <Row>
        <Column width={20}>
          <Card>
            <h3>Missing access TOKEN</h3>
            Fyll inn din personlige <b>Discogs</b>-api nøkkel. Den finnes på
            &nbsp;
            <a
              aria-label="www.discogs.com"
              href="https://www.discogs.com/settings/developers"
              title="developer token"
            >
              www.discogs.com
            </a>
          </Card>
        </Column>
        <Column width={5} />
        <Column width={20}>
          <Card>
            <Input
              type="text"
              width={18}
              placeholder="token: ###"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            ></Input>
            <Submit style={{ marginTop: base }} onClick={() => onClick(token)}>
              submit
            </Submit>
          </Card>
        </Column>
      </Row>
    </ContentBody>
  );
};

export default TokenInput;
