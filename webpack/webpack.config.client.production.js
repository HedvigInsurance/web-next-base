const webpack = require('webpack')
const path = require('path')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const webpackConfig = require('./webpack.config.base')

const root = path.resolve(__dirname, '..')

module.exports = webpackConfig({
  entry: {
    app: [path.resolve(root, 'src/client/entry.tsx')],
  },
  target: 'web',
  mode: 'production',
  context: root,
  output: {
    filename: '[name]-[hash].js',
    publicPath: '/static/',
    path: path.resolve(root, 'build/static'),
  },
  devtool: 'source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new StatsWriterPlugin({ filename: 'stats.json' }),
    // new BundleAnalyzerPlugin(),
  ].filter(Boolean),
})
