module.exports = {
    transformIgnorePatterns: ["/node_modules/"],
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest"
      },
    testEnvironment: "node",
    moduleFileExtensions: ["js"],
    testMatch: ["**/?(*.)spec.js"],
    roots: ["<rootDir>"],
};
