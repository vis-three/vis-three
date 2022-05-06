describe("index test", () => {
  it("Visits the examples website", () => {
    cy.visit("http://localhost:3000/examples/index.html")
      .window()
      .then(() => {
        cy.get(".children-box > a").then(($el) => {
          const num = $el.length;
          cy.log(num);

          let index = 0;

          Cypress.on("window:before:load", (win) => {
            cy.spy(win.console, "error").as("consoleError");
          });
          const loop = () => {
            cy.wait(200);
            cy.get(".children-box > a").eq(index).click({ force: true });
            cy.window().then((win) => {
              cy.get("@consoleError").should("not.be.called");
              cy.wait(200);
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
});
