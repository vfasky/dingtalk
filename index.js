const carlo = require("carlo");

(async () => {
  // Launch the browser.
  const app = await carlo.launch();

  // Terminate Node.js process on app window closing.
  app.on("exit", () => process.exit());

  // Tell carlo where your web files are located.
  // app.serveFolder(__dirname)
  app.serveOrigin("https://im.dingtalk.com");

  // Expose 'env' function in the web environment.
  await app.exposeFunction("env", _ => process.env);

  // Navigate to the main page of your app.
  await app.load("index.html");
  let dingtalkWin = app.mainWindow();
  //   await dingtalkWin.evaluate(() => {
  //     location.href = 'https://im.dingtalk.com'
  //   })
  //   await dingtalkWin.evaluate(() => {
  //       console.log(location)
  //   })
  const doc = await dingtalkWin.evaluate(() => {
    let body = document.body;
    let style = document.createElement("style");
    style.innerHTML = `
        #layout-main {
            height: 100vh;
            width: 100vw;
            flex: 1;
        }
        #body {
            height: 100%;
        }
    `;
    body.append(style);
    // 暂时只能使用账号密码登录
    let loginTabs = body.querySelector(".login-tab .tab-items");
    if (loginTabs) {
      loginTabs.style.display = "none";
    }
    let passwordTab = body.querySelector(".login-tab .tab-item:last-child");
    if (passwordTab) {
      passwordTab.click();
    }

    return document;
  });
  //   console.log(doc);
})();
