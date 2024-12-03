import { AutotestId } from "./AutotestId";
import { Base } from "./base";

export class AboutModalLocators extends Base {
  public readonly checkBox = this.derivedByTestId(AutotestId.CHECKBOX);
  public readonly switch = this.derivedByTestId(AutotestId.SWITCH);
  public readonly text_input = this.derivedByTestId(AutotestId.TEXT_INPUT);
  public readonly dropdown = this.derivedByTestId(AutotestId.DROPDOWN);
  public readonly radio_dog = this.derivedByTestId(AutotestId.RADIO_DOG);
  public readonly radio_cat = this.derivedByTestId(AutotestId.RADIO_CAT);
  public readonly slider = this.derivedByTestId(AutotestId.SLIDER);
  public readonly slider_value = this.derivedByTestId(AutotestId.SLIDER_VALUE);
  public readonly text_area = this.derivedByTestId(AutotestId.TEXT_AREA);
  public readonly save_button = this.derivedByTestId(AutotestId.SAVE_BUTTON);
  public readonly close_button = this.derivedByTestId(AutotestId.CLOSE_BUTTON);
  public readonly about_button = this.derivedByTestId(AutotestId.ABOUT);
}
