const path = require(`path`);

module.exports = {
  entry: [
    `./js/util.js`,
    `./js/backend.js`,
    `./js/stat.js`,
    `./js/dialog.js`,
    `./js/setup.js`,
    `./js/render.js`,
    `./js/game.js`,
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true,
  },
  devtool: false,
};
