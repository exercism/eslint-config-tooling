# @exercism/eslint-config-tooling

This is the shared [`eslint`][web-eslint] configuration used by various pieces of tooling, such as the [JavaScript Analyzer][git-javascript-analyzer], [Representer][git-javascript-representer], and [Test Runner][git-javascript-test-runner].
The same configuration is used for the TypeScript tooling as well as various other pieces of technology.
[Shareable configs][web-shareable-configs] are designed to work with the `extends` feature of ESLint configuration files.
This means you can use the same configuration [Exercism][web-exercism] uses in your own projects!

## Usage

To use the configuration, open your [eslint configuration][web-eslint-configuration] file, and add the following value to your flat config.
For example, for flat config configuration files:

```javascript
import baseConfig from '@exercism/eslint-config-tooling';

// ...
export default [
  ...baseConfig,
  // ... your configuration
];
```

## Configuration

Find the configuration [here](index.js).
It's goal is to help detect and prevent common problems, and enforce a consistent code style.

The rules are based on:

- [`eslint:recommended`][web-eslint-recommended]
- A few extra rules that catch common issues but are not enabled via the recommended plugin.

It also includes the [`prettier` plugin][git-eslint-plugin-prettier] because we use [`prettier`][web-prettier] to achieve consistent code formatting.
This plugin turns _off_ rules that conflict with formatting.

Because most of the tooling is primarily focussing on running on Node, only `node` globals are turned on in the environment, but when extending this configuration, you can add more (or turn those off).

## Type-based rules

In order to be able to use type information in the eslint rules, the parser is automatically set up for TypeScript files `.ts` and `.tsx`.

## Setup with multiple tsconfig.json and ts-paths

When working with multiple folders and a composite `tsconfig.json` structure and/or using the `compilerOptions` with `paths`, you might have difficulty resolving issues around it not being able to find files, definitions, and more.
A common problem is `eslint` complaining about files not being present or included in the configuration.
Another common problem is types reporting as `any` to `eslint`, even when they do resolve inside the editor.

An easy way to resolve this is to create a new `tsconfig.eslint.json` that includes all the files in the project, including the test files.
That `tsconfig.eslint.json` should then be referred in `project`, instead of the regular configuration file.
You can check out the [JavaScript Analyzer][git-javascript-analyzer] for an example.

[git-eslint-plugin-import]: https://github.com/benmosher/eslint-plugin-import
[git-eslint-plugin-prettier]: https://github.com/prettier/eslint-config-prettier
[git-javascript]: https://github.com/exercism/javascript
[git-javascript-analyzer]: https://github.com/exercism/javascript-analyzer
[git-javascript-representer]: https://github.com/exercism/javascript-representer
[git-javascript-test-runner]: https://github.com/exercism/javascript-test-runner
[web-eslint]: https://eslint.org
[web-eslint-configuration]: https://eslint.org/docs/user-guide/configuring/
[web-eslint-recommended]: https://eslint.org/docs/rules/
[web-exercism]: https://exercism.io
[web-prettier]: https://prettier.io
[web-shareable-configs]: https://eslint.org/docs/developer-guide/shareable-configs
