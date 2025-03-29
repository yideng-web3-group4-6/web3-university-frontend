import { MetaMask } from '@web3-react/metamask';
import type { Connector } from '@web3-react/types';

/**
 * 格式化钱包地址，默认显示前6位和后4位
 * @param address 钱包地址
 * @param prefixLength 前缀长度
 * @param suffixLength 后缀长度
 * @returns 格式化后的地址
 */
export const formatWalletAddress = (
  address: string,
  prefixLength: number = 6,
  suffixLength: number = 4,
): string => {
  if (!address) return '';

  // 移除可能存在的前缀(例如 "0x")
  const cleanAddress = address.startsWith('0x') ? address.substring(2) : address;
  const fullAddress = address.startsWith('0x') ? address : `0x${address}`;

  // 验证地址长度是否合理
  if (cleanAddress.length < prefixLength + suffixLength) {
    return fullAddress;
  }

  const prefix = address.substring(0, prefixLength + (address.startsWith('0x') ? 0 : 2));
  const suffix = address.substring(address.length - suffixLength);

  return `${prefix}...${suffix}`;
};

export function getName(connector: Connector) {
  if (connector instanceof MetaMask) return 'MetaMask';
  return 'Unknown';
}
