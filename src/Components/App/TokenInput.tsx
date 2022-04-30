import React, { FC, useState } from "react";
import { DiscogsActionTypes } from "../../redux/discogs";
import { Button, Input } from "../Discogs/Inputs";
import { Card, Column, ContentBody, Row } from "../styled";

export interface TokenInputProps {
  setUserToken: Fn<[string], DiscogsActionTypes>;
}

const TokenInput: FC<TokenInputProps> = ({
  setUserToken: onClick,
}: TokenInputProps) => {
  const [token, setToken] = useState<string>("");
  return (
    <ContentBody>
      <Row>
        <Column>
          <Card>
            <h1>Mangler tilgangsnøkkel</h1>
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
        <Column>
          <Card>
            <Input
              type="text"
              placeholder="token: ###"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            ></Input>
            <Button onClick={() => onClick(token)}>submit</Button>
          </Card>
        </Column>
      </Row>
    </ContentBody>
  );
};

export default TokenInput;
