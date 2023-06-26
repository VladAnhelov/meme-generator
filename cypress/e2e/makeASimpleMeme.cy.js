const baseURL = "https://memebulance.netlify.app/";
const PREVIEW_BLOCK_MEME = ".MemePreviewBlock_memePreview__AARvz";
const PREVIEW_BLOCK_IMAGE = ".MemePreviewBlock_image__VEwYN";
const ADD_TEXT_FORM = ".AddMoreMemeText_form__-LE4Y";
const ADD_TEXT_FORM_INPUT = ".AddMoreMemeText_formInput__oF9Z1";
const DOWNLOAD_MEME_BUTTON = ".DownloadMemeComponent_downloadBtn__9Qk74";

describe("visit home page and make a meme", () => {
  beforeEach(() => {
    cy.visit(baseURL);
  });

  it("make a simple meme", () => {
    cy.get(PREVIEW_BLOCK_MEME).find(PREVIEW_BLOCK_IMAGE).eq(1).click();

    cy.get(ADD_TEXT_FORM)
      .find(ADD_TEXT_FORM_INPUT)
      .eq(0)
      .click()
      .type("Hello, cypress!");

    cy.wait(1000);
    cy.get(DOWNLOAD_MEME_BUTTON).click();
  });
});
