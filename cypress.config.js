const { defineConfig } = require("cypress");
const path = require('path');
const AccessibilityReportGenerator = require('./cypress/utils/AccessibilityReportGenerator');

async function setupNodeEvents(on, config) {

  on('task', {
    log(message) {
      console.log(message);
      return null;
    },
    table(data) {
      console.table(data);
      return null;
    },
    generateAccessibilityReport({ violations, screenshotName }) {
      const reportPath = path.resolve(`cypress/reports/accessibility-report-${new Date().getTime()}.html`);

      const reportGenerator = new AccessibilityReportGenerator(violations, screenshotName);
      const savedReportPath = reportGenerator.saveReport(reportPath);

      return `Report generated at: ${savedReportPath}`;
    }
  });

  return config;
}

module.exports = defineConfig({
  viewportWidth: 1024,
  viewportHeight: 768,
  defaultCommandTimeout: 8000,
  chromeWebSecurity: false,
  video: false,

  e2e: {
    specPattern: "cypress/e2e/tests/*.spec.js",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents,
  },
});