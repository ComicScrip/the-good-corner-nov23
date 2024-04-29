const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// https://github.com/sindresorhus/query-string/issues/366#issuecomment-1425881167
const esModules = [
  "other_modules_based_on_your_needs",
  "query-string",
  "decode-uri-component",
  "split-on-first",
  "filter-obj",
];

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.test.ts+(x)"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
//module.exports = createJestConfig(customJestConfig);

module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  transformIgnorePatterns: esModules.length
    ? [`/node_modules/(?!${esModules.join("|")})`]
    : [],
});
