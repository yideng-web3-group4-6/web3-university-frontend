const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve, join } = require('path');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const port = 3003;

module.exports = {
  devServer: {
    // 任意的 404 响应都可能需要被替代为 index.html
    historyApiFallback: true,
    // 静态文件根目录
    static: {
      directory: join(__dirname, '../dist'),
    },
    // 启用 webpack 的模块热替换特性
    hot: true,
    port,
  },
  // 状态输出类型
  stats: 'errors-only',
  output: {
    publicPath: '/',
    //如果是通过loader 编译的 放到scripts文件夹里
    filename: 'scripts/[name].bundle.js',
    //如果是通过'asset/resource' 编译的
    assetModuleFilename: 'images/[name].[ext]',
  },
  // 生成 source-map 文件
  devtool: 'cheap-module-source-map',
  // 插件
  plugins: [
    // 1. HtmlWebpackPlugin: 生成html文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: './public/favicon.ico',
      template: resolve(__dirname, '../src/index-dev.html'),
    }),
    // 2. FriendlyErrorsWebpackPlugin: 友好的错误提示
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:' + port],
        notes: ['⭐️ 构建信息请及时关注窗口右上角'],
      },
      // 3. WebpackBuildNotifierPlugin: 构建通知
      // new WebpackBuildNotifierPlugin({
      //   title: '💿 Solv Dvelopment Notification',
      //   logo,
      //   suppressSuccess: true,
      // }),
      onErrors: function (severity, errors) {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        console.log(error);
        notifier.notify({
          title: '👒 Webpack Build Error',
          message: severity + ': ' + error.name,
          subtitle: error.file || '',
          icon: join(__dirname, 'icon.png'),
        });
      },
      clearConsole: true,
    }),
    // 4. BundleAnalyzerPlugin: 包分析
    // new BundleAnalyzerPlugin(),
  ],
};
