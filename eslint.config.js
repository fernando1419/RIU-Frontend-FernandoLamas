import angularEslint from "@angular-eslint/eslint-plugin";
import angularEslintTemplate from "@angular-eslint/eslint-plugin-template";
import js from "@eslint/js";
import tsEslint from "@typescript-eslint/eslint-plugin";
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
            jest: "readonly"
         },
      },
      plugins: {
         "jest": jestPlugin,
         "@angular-eslint": angularEslint,
         "@typescript-eslint": tsEslint,

      },
      rules: {
         "no-unused-vars": "off",
         "no-undef": "off",
         "@typescript-eslint/no-unused-vars": "warn",
         "@typescript-eslint/explicit-function-return-type": "off",
         "@typescript-eslint/no-explicit-any": "warn",
         "@typescript-eslint/no-inferrable-types": "off",
         "@typescript-eslint/no-non-null-assertion": "error",
         "eqeqeq": ["error", "always"],
         "curly": ["error", "all"],
         "no-const-assign": "error",
         "no-var": "error",
         "prefer-const": "error",
         "no-debugger": "error",
         "no-trailing-spaces": "error",
         "comma-dangle": ["error", "always-multiline"],
         "quotes": ["error", "single", { "allowTemplateLiterals": true, "avoidEscape": true }],
         "semi": ["error", "always"],
         "indent": ["error", 3, { "SwitchCase": 1 }],
         "object-curly-spacing": ["error", "always"],
         "no-shadow": "error",
         "no-duplicate-imports": "error",
         "no-multiple-empty-lines": ["error", { max: 1 }],
         "arrow-spacing": ["error", { before: true, after: true }],
         "no-param-reassign": "error",
         "no-return-await": "error",
         "no-unsafe-finally": "error",
         "prefer-template": "error",
         "spaced-comment": ["error", "always"],
         "yoda": "error",
         "array-bracket-spacing": ["error", "never"],
         "block-spacing": ["error", "always"],
         "eol-last": ["error", "always"],
         "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
         "lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
         "no-mixed-spaces-and-tabs": "error",
         "padded-blocks": ["error", "never"],
         "space-in-parens": ["error", "never"],
         "space-infix-ops": "error",
         "space-unary-ops": ["error", { "words": true, "nonwords": false }],
         "switch-colon-spacing": ["error", { "after": true, "before": false }],
         "@angular-eslint/no-input-rename": "error",
         "@angular-eslint/no-output-rename": "error",
         "@angular-eslint/no-lifecycle-call": "error",
         "@angular-eslint/use-lifecycle-interface": "error",
      },
   },
   {
      files: ["*.html"],
      plugins: {
         "@angular-eslint/template": angularEslintTemplate,
      },
      rules: {
         "@angular-eslint/template/no-negated-async": "error",
      },
   },
   {
      files: ["**/*.spec.ts", "**/*.test.ts"],
      rules: {
         "jest/no-disabled-tests": "warn",
         "jest/no-focused-tests": "error",
         "jest/no-identical-title": "error",
         "@typescript-eslint/no-explicit-any": "off",
      },
   },
];
