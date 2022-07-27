import { Column, ContentBody, DreadButton, Row, UglyButton } from "../styled";

import { Bin, Eye, Off } from "../../assets/icons";
import { DispatchAction } from "../../redux/store";
import { getTexts } from "../../services/texts";
import { colors, Submit } from "../styled";

export interface Props {
  clearStorage: DispatchAction<void>;
  syncWantList: DispatchAction<void>;
  logOut: DispatchAction<void>;
  isSyncing: boolean;
}

const Settings = ({ clearStorage, syncWantList, isSyncing, logOut }: Props) => {
  const [resyncBtn, resyncExplained, binBtn, binExplained, logOutTxt] =
    getTexts(
      "settings.resync.btn",
      "settings.resync.explained",
      "settings.clear.storage",
      "settings.clear.storage.explained",
      "log.out"
    );

  return (
    <ContentBody filled>
      <Row width={44}>
        <Column width={15}>
          <Submit disabled={isSyncing} onClick={() => syncWantList()}>
            <Eye {...{ fill: colors.bright }} />
            {resyncBtn}
          </Submit>
          {resyncExplained}
        </Column>
        <Column width={2}></Column>
        <Column width={15}>
          <UglyButton disabled={isSyncing} onClick={() => clearStorage()}>
            <Bin />
            {binBtn}
          </UglyButton>
          {binExplained}
        </Column>
      </Row>

      <Row width={44}>
        <Column width={15}>
          <DreadButton onClick={() => logOut()}>
            <Off />
            {logOutTxt}
          </DreadButton>
        </Column>
        <Column width={2}></Column>
      </Row>
    </ContentBody>
  );
};

export default Settings;
