export default {
	preset: "ts-jest/presets/default-esm",
	testEnvironment: "node",
	extensionsToTreatAsEsm: [".ts"],
	moduleNameMapper: {
		/*
		 * Redirect imports of src/db/*.js to tests/*.ts
		 * so tests use the test pool instead of the app pool
		 */
		"^(\\.{1,2}/db/)(.+)\\.js$": "<rootDir>/tests/$2",

		// Strip .js extensions from imports so Jest can resolve .ts source files
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	setupFilesAfterEnv: ["./tests/setup.ts"],
};
