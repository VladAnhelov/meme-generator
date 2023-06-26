const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'u29ffr',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
