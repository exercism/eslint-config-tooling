module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['@typescript-eslint', 'import'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  globals: {
    BigInt: true,
  },
  rules: {
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

    // plugin:import rules
    'import/extensions': ['error', { js: 'never', json: 'always' }],
    'import/no-default-export': 'warn',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',

    // eslint style rules, all covered by prettier
    // indent: ['error', 2],
    // 'linebreak-style': ['error', 'unix'],
    // quotes: ['error', 'single'],
    // semi: ['error', 'always'],
  },

  overrides: [
    {
      files: ['*.js', '*.jsx'],
      extends: ['prettier'],
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/typescript',
        'prettier',
      ],
      rules: {
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
        '@typescript-eslint/no-implicit-any-catch': [
          'warn',
          { allowExplicitAny: true },
        ],
        '@typescript-eslint/no-invalid-void-type': 'warn',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-parameter-properties': [
          'warn',
          {
            allows: [
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
        '@typescript-eslint/no-unused-vars': 'off',
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
  ],
};
