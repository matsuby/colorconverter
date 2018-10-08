const config = {
  'production': {
    mode: 'production',
    entry: ['@babel/polyfill', './src/colorconverter.js'],
    output: {
      filename: 'colorconverter.prod.js',
      library: 'colorconverter',
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  },
  'development': {
    mode: 'development',
    entry: './src/colorconverter.js',
    output: {
      filename: 'colorconverter.dev.js',
      library: 'colorconverter',
      libraryTarget: 'umd',
    },
  },
};
const target = process.env.NODE_ENV;

if (!target) {
  module.exports = Object.values(config);
} else if (target === 'production') {
  module.exports = config['production'];
} else if (target === 'development') {
  module.exports = config['development'];
}
