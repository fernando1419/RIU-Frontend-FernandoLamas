import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import jestPlugin from "eslint-plugin-jest";

export default [
   js.configs.recommended,
   {
      files: ["**/*.ts", "**/*.tsx"],
      languageOptions: {
         parser: tsParser,
         parserOptions: {
            project: "./tsconfig.json",
            sourceType: "module",
         },
         globals: {
            describe: "readonly",
            it: "readonly",
            expect: "readonly",
            beforeEach: "readonly",
            afterEach: "readonly",
            jest: "readonly" // if using jest
         },
      },
      plugins: {
         "@typescript-eslint": tsPlugin,
         "jest": jestPlugin, // enable jest rules
      },
      rules: {
         "no-unused-vars": "off",
         "no-undef": "off", // avoid false positives
         "@typescript-eslint/no-unused-vars": "warn",
         "@typescript-eslint/explicit-function-return-type": "off",
         "@typescript-eslint/no-explicit-any": "warn",
         "@typescript-eslint/no-inferrable-types": "off",
      },
   },
   {
      files: ["**/*.spec.ts", "**/*.test.ts"],
      rules: {
         "jest/no-disabled-tests": "warn",
         "jest/no-focused-tests": "error",
         "jest/no-identical-title": "error",
         "@typescript-eslint/no-explicit-any": "off", // Allows any en tests
      },
   },
];
