// eslint-disable-next-line import/no-extraneous-dependencies
const nodeExternals = require('webpack-node-externals');

module.exports = {
  webpack: {
    configure: {
      target: 'electron-renderer',
      externals: [
        nodeExternals({
          allowlist: [/webpack(\/.*)?/, 'electron-devtools-installer'],
        }),
      ],
    },
  },
};
