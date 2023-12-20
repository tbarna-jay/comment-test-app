describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
    cy.get('h1:contains("Comments list page 1")').should("be.visible");
    cy.get('button:contains("⇨")').should("be.visible").click();
    cy.get('h1:contains("Comments list page 2")').should("be.visible");
  });
});
