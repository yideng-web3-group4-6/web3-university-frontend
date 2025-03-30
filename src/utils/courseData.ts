import { BigNumber } from '@ethersproject/bignumber';

export const RMB_TO_YIDENG_RATE = BigNumber.from('10');

export const courses = [
  {
    icon: 'BookOpen',
    title: 'Web3基础入门',
    description: '区块链与去中心化应用的核心概念与基础知识',
    level: '初级',
    duration: '4周',
    price: BigNumber.from('299').mul(RMB_TO_YIDENG_RATE).toString(),
    tags: ['区块链基础', '加密货币', '钱包'],
  },
  {
    icon: 'Code',
    title: 'Solidity智能合约开发',
    description: '以太坊智能合约编程语言与开发工具链',
    level: '中级',
    duration: '6周',
    price: BigNumber.from('599').mul(RMB_TO_YIDENG_RATE).toString(),
    tags: ['Solidity', 'Remix', 'Hardhat'],
  },
  {
    icon: 'Layers',
    title: 'DApp前端开发',
    description: '结合React与ethers.js构建去中心化应用前端界面',
    level: '中级',
    duration: '5周',
    price: BigNumber.from('499').mul(RMB_TO_YIDENG_RATE).toString(),
    tags: ['React', 'ethers.js', 'Web3Modal'],
  },
  {
    icon: 'Shield',
    title: '智能合约安全',
    description: '常见漏洞防范与审计技术，确保合约安全性',
    level: '高级',
    duration: '4周',
    price: BigNumber.from('799').mul(RMB_TO_YIDENG_RATE).toString(),
    tags: ['安全审计', 'Slither', 'Mythril'],
  },
  {
    icon: 'Database',
    title: '链下数据存储',
    description: '使用IPFS和Filecoin构建分布式存储解决方案',
    level: '中级',
    duration: '3周',
    price: BigNumber.from('399').mul(RMB_TO_YIDENG_RATE).toString(),
    tags: ['IPFS', 'Filecoin', '分布式存储'],
  },
  {
    icon: 'Zap',
    title: 'Layer 2扩展方案',
    description: '探索Optimistic Rollups和ZK Rollups等扩展技术',
    level: '高级',
    duration: '4周',
    price: BigNumber.from('699').mul(RMB_TO_YIDENG_RATE).toString(),
    tags: ['Optimism', 'zkSync', '扩展性'],
  },
  {
    icon: 'Cpu',
    title: 'NFT开发与应用',
    description: '非同质化代币标准与创建自己的NFT项目',
    level: '中级',
    duration: '5周',
    price: BigNumber.from('599').mul(RMB_TO_YIDENG_RATE).toString(),
    tags: ['ERC-721', 'ERC-1155', 'Metadata'],
  },
  {
    icon: 'Workflow',
    title: 'DeFi协议开发',
    description: '去中心化金融协议设计与实现原理',
    level: '高级',
    duration: '7周',
    price: BigNumber.from('899').mul(RMB_TO_YIDENG_RATE).toString(),
    tags: ['AMM', '借贷协议', '流动性挖矿'],
  },
];

export type CoinType = 'ETH' | 'BTC' | 'USDT' | 'BNB';
