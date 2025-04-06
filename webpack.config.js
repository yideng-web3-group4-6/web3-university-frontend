const merge = require('webpack-merge');
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const _modeflag = _mode === 'production' ? true : false;
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ThemedProgressPlugin } = require('themed-progress-plugin');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const WebpackBar = require('webpackbar');
const Dotenv = require('dotenv-webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

// webpack基础配置
const webpackBaseConfig = {
  entry: {
    main: resolve('src/index.tsx'),
  },
  output: {
    path: resolve(process.cwd(), 'dist'),
  },
  module: {
    rules: [
      {
        // 1. test: 匹配文件的正则表达式
        // 2. exclude: 排除文件
        // 3. use: 使用的loader
        // 4. loader: loader名称
        // 5. options: loader配置
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          // swc-loader 可以将ts、tsx文件转换为js机器码，并使用.swcrc文件配置
          loader: 'swc-loader',
        },
      },
      {
        // 1. asset/resource: 处理字体和图片文件
        // 2. asset/inline: 将文件转换为base64编码
        // 3. asset/source: 导出文件的url
        // 4. asset: 根据文件大小自动选择上面三种方式
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
        type: 'asset/resource',
      },
      {
        // 1. css-loader: 解析css文件
        // 2. style-loader: 将css文件插入到html文件中
        // 3. postcss-loader: 使用postcss-loader处理css文件
        test: /\.css$/i,
        include: [resolve(__dirname, 'src'), resolve(__dirname, 'node_modules')],
        use: [
          MiniCssExtractPlugin.loader,
          // 如果不使用MiniCssExtractPlugin.loader，而是使用style-loader，会导致css文件被打包到js文件中
          // "style-loader",
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },
  // 优化配置
  optimization: {
    // 1. runtimeChunk: 将webpack运行时代码提取到单独的文件中
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all',
      // maxInitialRequests: 3,
      // name: true,
      // maxAsyncRequests: 3,
      cacheGroups: {
        commons: {
          chunks: 'all',
          name: 'chunk-common',
          minChunks: 2,
          maxInitialRequests: 5,
          priority: 1,
          enforce: true,
          reuseExistingChunk: true,
        },
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: 2,
          reuseExistingChunk: true,
          enforce: true,
        },
        uiComponent: {
          name: 'chunk-components',
          test: /([\\/]node_modules[\\/]@mui[\\/].+\w)|(src[\\/]components[\\/]common)|([\\/]node_modules[\\/]@yideng[\\/]components)/,
          chunks: 'all',
          priority: 4,
          reuseExistingChunk: true,
          enforce: true,
        },
        ethersSDK: {
          name: 'chunk-web3-sdk',
          test: /[\\/]node_modules[\\/](ethers*\w|@ethersproject*\w|@web3-react*\w)/,
          chunks: 'all',
          priority: 5,
          reuseExistingChunk: true,
          enforce: true,
        },
        reactLibs: {
          name: 'chunk-react-libs',
          test: /[\\/]node_modules[\\/](react|react.+\w)/,
          chunks: 'all',
          priority: 6,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  // 解析配置
  resolve: {
    // 1. alias: 配置别名，可以通过别名来简化引入路径
    alias: {
      '@': resolve('src/'),
      '@components': resolve('src/components'),
      '@hooks': resolve('src/hooks'),
      '@pages': resolve('src/pages'),
      '@layouts': resolve('src/layouts'),
      '@assets': resolve('src/assets'),
      '@states': resolve('src/states'),
      '@service': resolve('src/service'),
      '@utils': resolve('src/utils'),
      '@lib': resolve('src/lib'),
      '@constants': resolve('src/constants'),
      '@connections': resolve('src/connections'),
      '@abis': resolve('src/abis'),
      '@types': resolve('src/types'),
      '@locales': resolve('locales/'),
    },
    // 2. extensions: 配置扩展名，可以省略文件扩展名
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.css'],
    // 3. fallback: 配置node.js全局变量，可以在浏览器环境中使用node.js全局变量
    fallback: {
      // stream: require.resolve('stream-browserify'),
    },
  },
  // 插件配置
  plugins: [
    // 1. CleanWebpackPlugin: 清除dist目录
    new CleanWebpackPlugin(),
    // 2. Dotenv: 读取.env文件
    new Dotenv(),
    // 3. MiniCssExtractPlugin: 提取css文件
    new MiniCssExtractPlugin({
      filename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
      chunkFilename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
      ignoreOrder: false,
    }),
    // 4. ThemedProgressPlugin: webpack构建进度条
    new ThemedProgressPlugin(),
    // 5. ProgressBarPlugin: webpack构建进度条
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
    }),
  ],
};
// 将webpackBaseConfig和_mergeConfig合并为一个配置
module.exports = merge.default(webpackBaseConfig, _mergeConfig);
