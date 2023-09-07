module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',

    "plugin:prettier/recommended",
    'eslint-config-prettier',
    "prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // vô hiệu hóa quy tắc cơ sở vì nó có thể báo lỗi không chính xác
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",

    // Cấu hình thêm prettier
    'prettier/prettier': [
      'warn',
      "error",
      {
        "singleQuote": true,
        "parser": "flow"
      },
      {
        "arrowParens": "always",
        "bracketSameLine": false,
        "bracketSpacing": true,
        "embeddedLanguageFormatting": "auto",
        "htmlWhitespaceSensitivity": "css",
        "insertPragma": false,
        "jsxSingleQuote": false,
        "printWidth": 120,
        "proseWrap": "preserve",
        "quoteProps": "as-needed",
        "requirePragma": false,
        "semi": true,
        "singleQuote": true,
        "tabWidth": 3,
        "trailingComma": "all",
        "useTabs": false,
        "vueIndentScriptAndStyle": false
      }

    ]
  },
}
