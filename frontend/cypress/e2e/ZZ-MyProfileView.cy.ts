describe("LoginView", () => {
  beforeEach(() => {
    cy.intercept("**/api/collections/users/auth-with-password").as("login");
    cy.visit("/profile");
    cy.get("input[name=usernameOrEmail]").type("johndoe");
    cy.get("input[name=password]").type("12345678");
    cy.get('[data-cy="submit"]').click();
    cy.wait("@login");
  });

  it("should display profile information", () => {
    cy.get("input[name=username]").should("have.value", "johndoe");
    cy.get("input[name=email]").should("have.value", "john.doe@example.com");
  });

  it("should logout user", () => {
    cy.get('[data-cy="headerButton"]').click();
    cy.location("pathname").should("equal", "/login");
  });

  it("should delete user", () => {
    cy.get('[data-cy="deleteUser"]').click();
    cy.get(".el-popconfirm button").last().click();
    cy.location("pathname").should("equal", "/login");
  });
});
