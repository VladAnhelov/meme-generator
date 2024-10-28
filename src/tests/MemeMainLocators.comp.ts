import { AutotestId } from "./AutotestId";
import { Base } from "./base";

export class MemeMainLocators extends Base {
  public readonly topTextInputField = this.derivedByTestId(AutotestId.TOP_TEXT);
  public readonly bottomInputField = this.derivedByTestId(
    AutotestId.BUTTON_TEXT,
  );
  public readonly addMoreMemeTextButton = this.derivedByTestId(
    AutotestId.ADD_MORE_MEME_TEXT_BUTTON,
  );
  public readonly downloadMemeButton = this.derivedByTestId(
    AutotestId.DOWNLOAD_MEME_BUTTON,
  );
  public readonly memeImage = this.derivedByTestId(AutotestId.MEME_IMAGE);
}
