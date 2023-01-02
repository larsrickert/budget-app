describe("CreateProfileView", () => {
  beforeEach(() => {
    cy.intercept("**/api/collections/users/records").as("createProfile");
    cy.visit("/profile/new");
  });

  it("should show error when entering invalid data", () => {
    cy.get("input[name=username]").as("username");
    cy.get("input[name=email]").as("email");
    cy.get("input[name=password]").as("password");
    cy.get("input[name=passwordConfirm]").as("passwordConfirm");

    // to short values
    cy.get("@username").type("a".repeat(2));
    cy.get("@email").type("this-is-not-an-email");
    cy.get("@password").type("a".repeat(7));
    cy.get("@passwordConfirm").type("a".repeat(7));
    cy.get(".el-form-item__error").should("have.length", 4);

    // too long values
    cy.get("@username").clear().type("a".repeat(101), { delay: 0 });
    cy.get("@email").clear().type("a".repeat(256), { delay: 0 });
    cy.get("@password").clear().type("a".repeat(73), { delay: 0 });
    cy.get("@passwordConfirm").clear().type("a".repeat(73), { delay: 0 });
    cy.get(".el-form-item__error").should("have.length", 4);

    // empty values
    cy.get("@username").clear();
    cy.get("@email").clear();
    cy.get("@password").clear();
    cy.get("@passwordConfirm").clear();
    cy.get(".el-form-item__error").should("have.length", 4);
  });

  it("should create profile", () => {
    cy.get("input[name=username]").type("johndoe");
    cy.get("input[name=email]").type("john.doe@example.com");
    cy.get("input[name=password]").type("12345678");
    cy.get("input[name=passwordConfirm]").type("12345678");

    cy.get('[data-cy="submit"]').click();
    cy.wait("@createProfile");
    cy.location("pathname").should("equal", "/");
  });
});
