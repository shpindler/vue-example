module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
    parser: "@typescript-eslint/parser",
  },
  extends: [
    "eslint:recommended",
    "@nuxtjs/eslint-config-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/recommended",
    "plugin:jest/recommended",
    "plugin:jest/style",
  ],
  plugins: [
    "vue",
    "jest",
    "@typescript-eslint",
  ],
  // add your custom rules here
  rules: {
    "semi": ["error", "never"],
    "quotes": ["error", "single"],
    "comma-dangle": ["error", "always-multiline"],
    "vue/no-parsing-error": ["error", {
      "invalid-first-character-of-tag-name": false,
    }],
    "vue/no-v-html": 0,
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always",
    }],
  },
}
