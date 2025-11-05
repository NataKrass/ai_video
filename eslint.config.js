import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  js.configs.recommended,
  reactPlugin.configs.recommended,
  nextPlugin.configs.recommended,
  prettierPlugin.configs.recommended,
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      indent: ["error", 2],
      semi: ["error", "always"],
      "space-infix-ops": ["error"],
      "comma-spacing": ["error", { before: false, after: true }],
      "keyword-spacing": ["error", { before: true, after: true }],
      "object-curly-spacing": ["error", "always"],
      "no-multi-spaces": ["error"],
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-bind": "off",
      "react/no-find-dom-node": "off",
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "prettier/prettier": ["error", { endOfLine: "auto", semi: true }],
      "no-console": "off",
      "no-unused-vars": "off",
      "no-undef": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    ignores: [
      "node_modules/",
      ".next/",
      "public/",
      "components/",
      "lib/",
      "hooks/",
      "configs/",
    ],
  },
];
