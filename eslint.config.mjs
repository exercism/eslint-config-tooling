import maintainers from './index.mjs';

export default [
  ...maintainers,
  {
    ignores: [
      '.appends/**/*',
      '.github/**/*',
      '.vscode/**/*',
      '.yarn/**/*',
      '.pnp.*',
    ],
  },
];
