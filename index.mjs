// @ts-check

import fs from 'node:fs';

import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import jestPlugin from 'eslint-plugin-jest';
import prettierConfig from 'eslint-config-prettier';

import globals from 'globals';

const pkg = JSON.parse(
  fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
);

/** @type {import('eslint').ESLint.Plugin} */
export const plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
};

export default tsEslint.config(
  {
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
    },
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: true,
      },
      globals: {
        ...globals.node,
      },
    },
    extends: [eslint.configs.recommended, ...tsEslint.configs.recommended],
    rules: {
      // typescript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-require-imports': 'off',

      // eslint rules
      'array-callback-return': ['error', { checkForEach: true }],
      'default-param-last': 'error',
      eqeqeq: ['error', 'smart'],
      'linebreak-style': 'off',
      'no-eval': ['error', { allowIndirect: true }],
      'no-extend-native': 'error',
      'no-implicit-coercion': 'error',
      'no-promise-executor-return': 'error',
      'no-unreachable-loop': 'error',
      'no-unsafe-optional-chaining': 'error',
      'require-atomic-updates': 'error',
      'require-await': 'off',
    },

    // https://github.com/import-js/eslint-plugin-import/pull/3018
    // missing: import/* plugins
  },
  {
    files: ['**/*.{ts,mts,cts,tsx}'],
    extends: [...tsEslint.configs.recommendedTypeCheckedOnly],
    rules: {
      // Enable boundary checks on TS files
      '@typescript-eslint/explicit-module-boundary-types': 'error',

      // typescript rules
      '@typescript-eslint/ban-tslint-comment': 'error',
      '@typescript-eslint/consistent-type-assertions': [
        'warn',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'allow-as-parameter',
        },
      ],
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', disallowTypeAnnotations: false },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: false,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: false,
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'warn',
        {
          accessibility: 'no-public',
          overrides: {
            accessors: 'explicit',
            constructors: 'no-public',
            methods: 'explicit',
            properties: 'explicit',
            parameterProperties: 'off',
          },
        },
      ],
      '@typescript-eslint/member-delimiter-style': 'off',
      '@typescript-eslint/method-signature-style': 'error',
      '@typescript-eslint/naming-convention': 'warn',
      '@typescript-eslint/no-base-to-string': 'warn',
      '@typescript-eslint/no-confusing-non-null-assertion': 'warn',
      '@typescript-eslint/no-confusing-void-expression': [
        'warn',
        { ignoreVoidOperator: true },
      ],
      '@typescript-eslint/no-invalid-void-type': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/parameter-properties': [
        'warn',
        {
          allow: [
            'private',
            'protected',
            'public',
            'private readonly',
            'protected readonly',
            'public readonly',
          ],
        },
      ],
      '@typescript-eslint/no-unnecessary-condition': [
        'off', // found false positives
        { allowConstantLoopConditions: true },
      ],
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
          typedefs: false,
        },
      ],
      '@typescript-eslint/non-nullable-type-assertion-style': 'warn',
      '@typescript-eslint/prefer-enum-initializers': 'warn',
      '@typescript-eslint/prefer-includes': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/prefer-readonly': 'warn',
      '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
    },
  },
  {
    // disable type-aware linting on JS files
    files: ['**/*.{js,cjs,mjs,jsx}'],
    ...tsEslint.configs.disableTypeChecked,
  },
  // // @ts-expect-error import is weirdly nullable
  // importPlugin.flatConfigs.recommended,
  {
    // enable jest rules on test files
    files: [
      'test/**',
      '**/*.spec.{js,mjs,cjs,jsx,ts,mts,cts,tsx}*',
      '**/*.test.{js,mjs,cjs,jsx,ts,mts,cts,tsx}*',
    ],
    ...jestPlugin.configs['flat/recommended'],
    rules: {
      ...jestPlugin.configs['flat/recommended'].rules,
      'jest/no-disabled-tests': 'off',
      'jest/no-test-prefixes': 'off',
    },

    languageOptions: {
      globals: {
        // Don't make jest globals available! These should not be available
        // but imported from @jest/globals.
        //
        // ...globals.jest,
      },
    },
  },

  prettierConfig,
);
