const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function exampleTest() {
  // 配置 Chrome 浏览器选项
  let options = new chrome.Options();
  // 如果需要无头模式，可以取消下面这行的注释
  // options.addArguments('--headless');

  // 创建 WebDriver 实例
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    // 1. 打开 Google 首页
    await driver.get('https://www.google.com');

    // 2. 找到搜索输入框
    let searchBox = await driver.findElement(By.name('q'));

    // 3. 输入搜索内容
    await searchBox.sendKeys('selenium webdriver 测试', Key.RETURN);

    // 4. 等待搜索结果加载
    await driver.wait(until.titleContains('selenium webdriver 测试'), 50000);

    // 5. 获取页面标题并打印
    let title = await driver.getTitle();
    console.log('页面标题:', title);

    // 6. 验证结果（简单的断言示例）
    if (title.includes('selenium webdriver 测试')) {
      console.log('测试通过：搜索成功');
    } else {
      console.log('测试失败：搜索结果不符合预期');
    }
  } catch (error) {
    console.error('测试过程中发生错误:', error);
  } finally {
    // 清理：关闭浏览器
    await driver.quit();
  }
})();
