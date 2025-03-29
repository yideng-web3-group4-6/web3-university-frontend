// 引入 why-did-you-render
/// <reference types="@welldone-software/why-did-you-render" />
import React from 'react';
// 判断是否为开发环境
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  // 启用 why-did-you-render
  whyDidYouRender(React, {
    // 关闭 console.log 输出
    onlyLogs: true,
    // 高亮显示组件名称
    titleColor: 'green',
    // 高亮显示差异名称
    diffNameColor: 'darkturquoise',
    // 高亮显示差异值
    trackHooks: true,
    // 跟踪所有纯组件
    trackAllPureComponents: true,
  });
}
