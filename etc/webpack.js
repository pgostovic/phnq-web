const HtmlWebPackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const analyzeBundle = process.env.ANALYZE_BUNDLE === 'true';

const config = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
  },
  entry: ['@babel/polyfill', './src/index.jsx'],
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        loader: 'raw-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './src/ui/index.html',
      filename: './index.html',
    }),
  ],
};

if (analyzeBundle) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  ...config,
};
