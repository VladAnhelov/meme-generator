/* eslint-disable cypress/unsafe-to-chain-command */
import selectors from "../fixtures/selectors.json";

const baseURL = "https://memebulance.netlify.app/";

describe("CanvasMeme", () => {
    beforeEach(() => {
      cy.visit(baseURL); // Замініть "шлях/до/вашої/сторінки" на реальний шлях до вашої сторінки з компонентом CanvasMeme
    });

    it("should create a simple meme", () => {
        const {
          MEME_PREVIEW_BLOCK_SELECTOR,
          IMAGE_SELECTOR,
          ADD_TEXT_FORM_INPUT
        } = selectors;
    
        cy.get(MEME_PREVIEW_BLOCK_SELECTOR)
          .find(IMAGE_SELECTOR)
          .eq(1)
          .click();
    
          cy.get(ADD_TEXT_FORM_INPUT)
          .eq(1)
          .click()
          .type("Hello, Cypress!");
    })
  });
  