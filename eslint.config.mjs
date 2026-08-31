import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import youMightNotNeedAnEffect from "eslint-plugin-react-you-might-not-need-an-effect";
import tseslint from "typescript-eslint";

const restrictedEffectHookNames = [
  "useEffect",
  "useLayoutEffect",
  "useInsertionEffect",
];

const effectHookRestrictionRules = {
  "no-restricted-imports": [
    "error",
    {
      paths: [
        {
          name: "react",
          importNames: restrictedEffectHookNames,
          message:
            "Do not use React effect hooks directly. Prefer a library such as TanStack Query, or add a documented wrapper hook for the specific case.",
        },
      ],
      patterns: [
        {
          group: [
            "*/internal/**",
            "@*/**/internal/**",
            "*/private/**",
            "@*/**/private/**",
            "*/dist/internal/**",
            "@*/**/dist/internal/**",
          ],
          message:
            "Do not import from deep or private package paths. Use the package's public exports instead.",
        },
      ],
    },
  ],
  "no-restricted-syntax": [
    "error",
    {
      selector:
        "CallExpression[callee.type='MemberExpression'][callee.object.name='React'][callee.property.name=/^(useEffect|useLayoutEffect|useInsertionEffect)$/]",
      message:
        "Do not call React effect hooks directly. Prefer a library or a documented wrapper hook.",
    },
    {
      selector: "ForInStatement",
      message:
        "for..in is disallowed. Use Object.keys/Object.entries with Object.hasOwn instead.",
    },
    {
      selector: "UnaryExpression[operator='void'][argument.value=0]",
      message: "void 0 is disallowed. Use undefined instead.",
    },
    {
      selector:
        "TSAsExpression[expression.type='TSAsExpression'][expression.typeAnnotation.type='TSUnknownKeyword']",
      message:
        "Double assertions are disallowed. Use a type guard, schema validation, or a named boundary helper instead.",
    },
    {
      selector: "TSEnumDeclaration",
      message:
        "Enums are disallowed. Use a string-literal union or an as const object instead.",
    },
    {
      selector: "UnaryExpression[operator='delete']",
      message:
        "delete is disallowed. Prefer immutable omit/destructure or explicit Map/record modeling.",
    },
  ],
};

const eslintConfig = tseslint.config(
  ...nextCoreWebVitals.filter((config) => config.name !== "next/typescript"),
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  youMightNotNeedAnEffect.configs.strict,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: "19.2",
      },
    },
    rules: {
      // React Compiler Rules of React (eslint-plugin-react-hooks v7 "recommended-latest":
      // rules-of-hooks, exhaustive-deps, plus the compiler-correctness rules such as
      // purity, immutability, set-state-in-render and preserve-manual-memoization).
      // The react-hooks plugin is already registered by eslint-config-next.
      ...react.configs.flat.recommended.rules,
      ...reactHooks.configs["recommended-latest"].rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      ...effectHookRestrictionRules,
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-check": false,
          "ts-expect-error": "allow-with-description",
          "ts-ignore": true,
          "ts-nocheck": true,
        },
      ],
      "@typescript-eslint/no-array-constructor": "error",
      "@typescript-eslint/no-empty-object-type": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-namespace": [
        "error",
        {
          allowDefinitionFiles: true,
        },
      ],
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-unsafe-type-assertion": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^(_|ignore)",
        },
      ],
      "@typescript-eslint/no-wrapper-object-types": "error",
      "no-array-constructor": "off",
      "no-bitwise": "error",
      "no-empty": ["error", { allowEmptyCatch: false }],
      "no-eval": "error",
      "no-extend-native": "error",
      "no-global-assign": "error",
      "no-implied-eval": "error",
      "no-labels": "error",
      "no-new-func": "error",
      "no-var": "error",
      "no-with": "error",
      "prefer-object-has-own": "error",
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    ignores: [
      ".next/",
      "eslint.config.mjs",
      "postcss.config.mjs",
      "src/app/**/admin/**/*.js",
      "src/app/**/admin/**/*.ts",
      "src/app/**/admin/**/*.tsx",
      "src/app/(payload)/layout.tsx",
      "src/payload-types.ts",
      "src/payload-generated-schema.ts",
    ],
  },
  {
    files: ["src/hooks/useMountEffect.ts"],
    rules: {
      "no-restricted-imports": "off",
      "no-restricted-syntax": effectHookRestrictionRules[
        "no-restricted-syntax"
      ].filter(
        (rule) =>
          typeof rule === "string" ||
          !rule.selector?.includes(
            "useEffect|useLayoutEffect|useInsertionEffect",
          ),
      ),
    },
  },
);

export default eslintConfig;
