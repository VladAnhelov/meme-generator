import selectors from "../fixtures/selectors.json";

const baseURL = "https://memebulance.netlify.app/";

describe("Visit home page and sign in", () => {
  beforeEach(() => {
    cy.visit(baseURL);
  });

  it("should check the signIn form", () => {
    const {
      SIGNIN_BUTTON, 
      SIGN_FORM 
    } = selectors;

    cy.get(SIGNIN_BUTTON)
    .click()

    cy.get(SIGN_FORM).contains("Sign In")

  });
});
