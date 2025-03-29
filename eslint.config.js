// React Hooks 插件，用于检查 Hooks 使用规则
const reactHooks = require('eslint-plugin-react-hooks');
// TypeScript ESLint 插件，提供 TypeScript 特定的 linting 规则
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
// Jest 插件，提供 Jest 测试相关的 linting 规则
const jestPlugin = require('eslint-plugin-jest');
// Prettier 插件，将 Prettier 集成到 ESLint 中
const prettierPlugin = require('eslint-plugin-prettier');
// Prettier 配置，禁用与 Prettier 冲突的 ESLint 规则
const prettierConfig = require('eslint-config-prettier');
// React 插件，提供 React 特定的 linting 规则
const react = require('eslint-plugin-react');
// Import 插件，提供模块导入相关的规则
const importPlugin = require('eslint-plugin-import');
// TypeScript 解析器，用于解析 TypeScript 代码
const typescriptParser = require('@typescript-eslint/parser');
// globals 模块，提供各种环境下的全局变量定义
const globals = require('globals');
// 导入 airbnb-typescript 的依赖规则，手动展开
const airbnbBase = require('eslint-config-airbnb-base/rules/best-practices').rules;
// const airbnbTsRules =
//   require("eslint-config-airbnb-typescript/lib/shared").rules;

// 导出 ESLint 配置数组（ESLint v9 的平面配置文件格式）
module.exports = [
  // 忽略配置块
  // 对应旧的 .eslintignore 文件，定义不需要 lint 的文件和目录
  {
    ignores: [
      'node_modules/**', // 忽略 node_modules 目录及其子目录（依赖包无需 lint）
      'backstop_data/**', // 忽略 BackstopJS 测试数据目录
      'dist/**', // 忽略构建输出目录（通常是编译后的代码）
      'docs/**', // 忽略文档目录
      'cypress/**', // 忽略 Cypress 测试目录
      'config/**', // 忽略配置文件目录
      'tests/**', // 忽略测试目录
      'eslint.config.js', // 忽略 ESLint 配置文件
      'jest.config.js', // 忽略 Jest 配置文件
      'webpack.config.js', // 忽略 Webpack 配置文件
      'postcss.config.js', // 忽略 PostCSS 配置文件
      'cypress.config.js', // 忽略 Cypress 配置文件
    ],
  },

  // 手动实现 airbnb-typescript 的规则（替代直接引用）
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...airbnbBase, // Airbnb 基础规则
      // ...airbnbTsRules, // Airbnb TypeScript 特定规则
    },
  },

  // React Hooks 配置块
  // 对应旧配置中的 "extends": ["plugin:react-hooks/recommended"]
  {
    plugins: {
      'react-hooks': reactHooks, // 注册 React Hooks 插件
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // 使用 React Hooks 的推荐规则，例如检查 useEffect 依赖
    },
  },

  // TypeScript ESLint 配置块
  // 对应旧配置中的 "extends": ["plugin:@typescript-eslint/recommended"]
  {
    plugins: {
      '@typescript-eslint': typescriptEslint, // 注册 TypeScript ESLint 插件
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules, // 使用 TypeScript 推荐规则，例如类型检查和命名规范
    },
  },

  // Jest 配置块
  // 对应旧配置中的 "extends": ["plugin:jest/recommended"]
  {
    plugins: {
      jest: jestPlugin, // 注册 Jest 插件
    },
    rules: {
      ...jestPlugin.configs.recommended.rules, // 使用 Jest 推荐规则，例如测试用例命名规范
    },
  },

  // Prettier 配置块（第一部分）
  // 对应旧配置中的 "extends": ["prettier"]
  // 禁用与 Prettier 冲突的格式化规则
  prettierConfig,

  // Prettier 配置块（第二部分）
  // 对应旧配置中的 "extends": ["plugin:prettier/recommended"]
  {
    plugins: {
      prettier: prettierPlugin, // 注册 Prettier 插件
    },
    rules: {
      'prettier/prettier': 'error', // 将 Prettier 格式化问题作为错误报告，确保代码符合 Prettier 风格
    },
  },

  // 核心配置块
  // 整合旧配置中的 parser, parserOptions, env, 和 plugins
  {
    files: ['**/*.{ts,tsx}'], // 指定此配置适用于 TypeScript 文件（.ts 和 .tsx）
    languageOptions: {
      parser: typescriptParser, // 指定 TypeScript 解析器（对应旧配置中的 "parser": "@typescript-eslint/parser"）
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // 启用 JSX 语法支持（对应旧配置中的 "ecmaFeatures.jsx"）
        },
        ecmaVersion: 2018, // 支持 ES2018 特性（对应旧配置中的 "ecmaVersion"）
        sourceType: 'module', // 使用 ES 模块系统（对应旧配置中的 "sourceType"）
        project: './tsconfig.eslint.json', // 指定 TypeScript 配置文件路径，用于类型检查（对应旧配置中的 "project"）
      },
      globals: {
        ...globals.browser, // 添加浏览器环境全局变量（对应旧配置中的 "env.browser"）
        ...globals.es6, // 添加 ES6 环境全局变量（对应旧配置中的 "env.es6"）
        ...globals.jest, // 添加 Jest 环境全局变量（对应旧配置中的 "env.jest"）
      },
    },
    plugins: {
      react, // 注册 React 插件（对应旧配置中的 "plugins": ["react"]）
      '@typescript-eslint': typescriptEslint, // 注册 TypeScript 插件（对应旧配置中的 "plugins": ["@typescript-eslint"]）
      jest: jestPlugin, // 注册 Jest 插件（对应旧配置中的 "plugins": ["jest"]）
      import: importPlugin, // 注册 Import 插件（对应旧配置中的 "plugins": ["import"]）
    },
    settings: {
      react: {
        version: 'detect', // 自动检测 React 版本，优化 React 相关规则
      },
    },
    rules: {
      // 自定义规则可以在这里添加（对应旧配置中的 "rules": {}）
      // 例如：
      // 'no-unused-vars': 'warn', // 示例规则：未使用的变量作为警告
    },
  },
];
