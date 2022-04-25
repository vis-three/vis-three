describe("index test", () => {
  it("Visits the examples website", () => {
    cy.visit("http://localhost:3000/examples/index.html")
      .window()
      .then((win) => {
        const num = Cypress.$(".children-box > a").length;
        let index = 0;
        const loop = () => {
          cy.wait(500);
          cy.get(".children-box > a").eq(index).click({ force: true });
          cy.window().then((win) => {
            cy.stub(win.console, "error").as("consoleError");
            cy.get("@consoleError").should("be.callCount", 0);
            cy.wait(500);
            cy.go("back");
            index += 1;
            if (index < num) {
              loop();
            }
          });
        };
        loop();
      });
  });
});
