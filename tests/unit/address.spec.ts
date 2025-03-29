import { formatWalletAddress } from '@utils/index';

describe('formatWalletAddress', () => {
  // 测试基本功能 - 默认参数
  test('formats address with default parameters', () => {
    const address = '0x1234567890abcdef1234567890abcdef12345678';
    const result = formatWalletAddress(address);
    expect(result).toBe('0x1234...5678');
  });

  // 测试当地址已有0x前缀时
  test('formats address with 0x prefix', () => {
    const address = '0xabcdef1234567890abcdef1234567890abcdef12';
    const result = formatWalletAddress(address);
    expect(result).toBe('0xabcd...ef12');
  });

  // 测试当地址没有0x前缀时
  test('formats address without 0x prefix', () => {
    const address = 'abcdef1234567890abcdef1234567890abcdef12';
    const result = formatWalletAddress(address);
    expect(result).toBe('0xabcd...ef12');
  });

  // 测试自定义前缀长度
  test('formats address with custom prefix length', () => {
    const address = '0x1234567890abcdef1234567890abcdef12345678';
    const result = formatWalletAddress(address, 8);
    expect(result).toBe('0x123456...5678');
  });

  // 测试自定义后缀长度
  test('formats address with custom suffix length', () => {
    const address = '0x1234567890abcdef1234567890abcdef12345678';
    const result = formatWalletAddress(address, 6, 6);
    expect(result).toBe('0x1234...345678');
  });

  // 测试自定义前缀和后缀长度
  test('formats address with custom prefix and suffix length', () => {
    const address = '0x1234567890abcdef1234567890abcdef12345678';
    const result = formatWalletAddress(address, 10, 8);
    expect(result).toBe('0x12345678...12345678');
  });

  // 测试空地址
  test('returns empty string for empty address', () => {
    expect(formatWalletAddress('')).toBe('');
    expect(formatWalletAddress(null as unknown as string)).toBe('');
    expect(formatWalletAddress(undefined as unknown as string)).toBe('');
  });

  // 测试地址长度太短的情况
  test('returns full address if length is too short', () => {
    const shortAddress = '0x1234';
    expect(formatWalletAddress(shortAddress)).toBe(shortAddress);
  });

  // 测试边界情况：前缀+后缀长度等于地址长度
  test('handles case where prefix+suffix equals address length', () => {
    const address = '0x1234567890';
    expect(formatWalletAddress(address, 6, 4)).toBe(address);
  });

  // 测试不规则长度的地址
  test('handles irregular address length', () => {
    const irregularAddress = '0x123456789abcdef';
    expect(formatWalletAddress(irregularAddress)).toBe('0x1234...cdef');
  });
});
