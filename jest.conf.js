module.exports = {
  setupFiles: ["./fixtures/expectHandlers.js"],
  "reporters": [
    "default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": "Test Report"
    }]
  ]
};

