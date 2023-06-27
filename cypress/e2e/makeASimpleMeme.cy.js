/* eslint-disable cypress/unsafe-to-chain-command */
import selectors from "../fixtures/selectors.json";

const baseURL = "https://memebulance.netlify.app/";


describe("Visit home page and make a meme", () => {
  beforeEach(() => {
    cy.visit(baseURL);
  });

  it("should create a simple meme", () => {
    const {
      MEME_PREVIEW_BLOCK_SELECTOR,
      IMAGE_SELECTOR,
      ADD_TEXT_FORM_INPUT,
      DOWNLOAD_MEME_BUTTON
    } = selectors;

    cy.get(MEME_PREVIEW_BLOCK_SELECTOR)
      .find(IMAGE_SELECTOR)
      .eq(1)
      .click();

      cy.get(ADD_TEXT_FORM_INPUT)
      .eq(1)
      .click()
      .type("Hello, Cypress!");
    

    cy.get(DOWNLOAD_MEME_BUTTON).click();
  });
});
