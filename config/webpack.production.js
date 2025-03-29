//开启JS多线程的压缩
const TerserPlugin = require('terser-webpack-plugin');
const os = require('os');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  output: {
    // 输出路径
    path: join(__dirname, '../dist'),
    publicPath: '/',
    // 输出文件名
    // 哈希值5位
    // 保证构建出来的文件名不变
    // 即使源码发生了改变，构建出来的 bundle.js 文件名也不变
    // 便于缓存
    filename: 'scripts/[name].[contenthash:5].bundule.js',
    assetModuleFilename: 'images/[name].[contenthash:5][ext]',
  },
  performance: {
    maxAssetSize: 250000, // 最大资源大小250KB
    maxEntrypointSize: 250000, // 最大入口资源大小250KB
    hints: 'warning', // 超出限制时只给出警告
  },
  optimization: {
    // minimize: true: 开启代码压缩
    minimize: true,
    // minimizer: 代码压缩器，可以指定多个
    minimizer: [
      // CssMinimizerPlugin: 用于压缩 CSS
      new CssMinimizerPlugin({
        // parallel: true: 开启多线程来压缩代码
        parallel: true,
      }),
      // TerserPlugin: 用于压缩 JavaScript
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  experiments: {
    outputModule: true,
  },
  externalsType: 'module',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
  },
  plugins: [
    // HtmlWebpackPlugin: 用于生成 HTML 文件
    new HtmlWebpackPlugin({
      title: 'Yideng',
      filename: 'index.html',
      template: resolve(__dirname, '../src/index-prod.html'),
      favicon: './public/favicon.ico',
    }),
    // WorkboxPlugin: 用于生成 Service Worker
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true, // Service Worker 激活后立即控制页面
      skipWaiting: true, // 跳过等待，直接激活新的 Service Worker
      // 预缓存的匹配规则（默认缓存所有 Webpack 输出的文件）
      include: [/\.html$/, /\.js$/, /\.css$/],
      // 可选：添加运行时缓存策略
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/, // 匹配图片资源
          handler: 'CacheFirst', // 使用“缓存优先”策略
          options: {
            cacheName: 'images', // 缓存名称
            expiration: {
              maxEntries: 10, // 最多缓存 10 个文件
              maxAgeSeconds: 30 * 24 * 60 * 60, // 缓存 30 天
            },
          },
        },
        {
          // API 请求缓存策略
          urlPattern: /^https:\/\/api\./,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            networkTimeoutSeconds: 3,
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 5 * 60, // 5 分钟
            },
          },
        },
      ],
    }),
  ],
};
