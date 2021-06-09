const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'),
  },
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]__[hash:base64:5]',
                auto: /\.module\.\w+$/i,
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        use: ['url-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    open: true,
    port: 1300,
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  devtool: 'source-map',
};
