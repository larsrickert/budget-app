describe("LoginView", () => {
  beforeEach(() => {
    cy.intercept("**/api/collections/users/auth-with-password").as("login");
    cy.visit("/login");
  });

  it("should show error when entering invalid data", () => {
    cy.get("input[name=usernameOrEmail]").as("usernameOrEmail");
    cy.get("input[name=password]").as("password");

    // to short values
    cy.get("@usernameOrEmail").type("a".repeat(2));
    cy.get("@password").type("a".repeat(7));
    cy.get(".el-form-item__error").should("have.length", 2);

    // too long values
    cy.get("@usernameOrEmail").clear().type("a".repeat(101));
    cy.get("@password").clear().type("a".repeat(73));
    cy.get(".el-form-item__error").should("have.length", 2);

    // empty values
    cy.get("@usernameOrEmail").clear();
    cy.get("@password").clear();
    cy.get(".el-form-item__error").should("have.length", 2);
  });

  it("should login with username", () => {
    cy.get("input[name=usernameOrEmail]").type("johndoe");
    cy.get("input[name=password]").type("12345678");

    cy.get('[data-cy="submit"]').click();
    cy.wait("@login");
    cy.location("pathname").should("equal", "/");
  });

  it("should login with email", () => {
    cy.get("input[name=usernameOrEmail]").type("john.doe@example.com");
    cy.get("input[name=password]").type("12345678");

    cy.get('[data-cy="submit"]').click();
    cy.wait("@login");
    cy.location("pathname").should("equal", "/");
  });
});
