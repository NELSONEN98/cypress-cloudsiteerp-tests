const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://stage.cloudsiteerp.com',

    setupNodeEvents(on, config) {
      // node events aquí si los necesitas
    }
  },
});
