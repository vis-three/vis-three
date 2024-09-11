describe("index test", () => {
  it("Visits the examples website", () => {
    cy.visit("http://localhost:3000/examples/index.html")
      .window()
      .then(() => {
        cy.get(".children-box > a").then(($el) => {
          const num = $el.length;
          cy.log(num);

          let index = 70;

          Cypress.on("window:before:load", (win) => {
            cy.spy(win.console, "error").as("consoleError");
          });
          const loop = () => {
            cy.wait(200);
            cy.get(".children-box > a").eq(index).click({ force: true });

            const aDom = $el[index];

            cy.log(aDom.href);

            const url = aDom.href.split(".")[0];
            const nameList = url.replace(/\\/g, "/").split("/");

            const filename = nameList.pop();
            const flodername = nameList.pop();

            cy.log(filename);
            cy.log(flodername);

            cy.window().then((win) => {
              cy.get("@consoleError").should("not.be.called");
              cy.wait(2500);
              cy.screenshot(`/${flodername}/${filename}`, {
                overwrite: true
              });
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
});
