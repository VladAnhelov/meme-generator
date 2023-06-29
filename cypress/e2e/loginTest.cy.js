import selectors from "../fixtures/selectors.json";
import userCredentials from "../fixtures/userCredentials.json";

const baseURL = "https://memebulance.netlify.app/";

describe("Visit home page and sign in", () => {
  beforeEach(() => {
    cy.visit(baseURL);
    cy.get(selectors.SIGNIN_BUTTON)
    .click()
  });

  it("should check the signIn form", () => {
    const {
      SIGN_FORM 
    } = selectors;

    cy.get(SIGN_FORM).contains("Sign In")

  });

  it('should check input fields', () => {
    const {
      EMAIL_INPUT, PASSWORD_INPUT
    } = selectors;

    const {
      email, password
    } = userCredentials;
    cy.get(EMAIL_INPUT).type(email);
    cy.get(PASSWORD_INPUT).type(password);
  });

  it('should fill in input fields and submit the form', () => {
    const {
      SUBMIT_BUTTON
    } = selectors;
    cy.get(SUBMIT_BUTTON).click();
  })

  it('should display an error message for invalid email', () => {
    const {
      SUBMIT_BUTTON
    } = selectors;
    cy.get(SUBMIT_BUTTON).click();

    cy.get(".NavBarMenu_errorMessage__adhjR")
    cy.contains('Please enter a valid email.').should('exist');
  });
});
