// app：控制应用生命周期的模块
// BrowserWindow：创建本地浏览器窗口的模块
import {
  app,
  BrowserWindow,
  ipcMain,
  Menu
} from "electron";
import template from "./config/menu";
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
// 加载地址
const homeURL =
  process.env.NODE_ENV === "development" ?
  `http://localhost:9080/#layout` :
  `file://${__dirname}/index.html#layout`;

// 创建新窗口的初始化配置
let defaultWindowConfig = {
  useContentSize: true,
  titleBarStyle: "hidden",
  resizable: false,
  webPreferences: {
    webSecurity: false
  }
};
let mainWin;

function createWindow(config) {
  // 创建一个新窗口
  mainWin = new BrowserWindow({
    ...defaultWindowConfig,
    width: 980,
    height: 650,
    show: false,
    ...config
  });
  mainWin.on('ready-to-show', function () {
    mainWin.show() // 初始化后再显示
  })
  // 默认加载登录界面
  mainWin.loadURL(homeURL);
  // 当窗口关闭时调用的方法
  mainWin.on("closed", () => {
    mainWin = null;
  });
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// electron 初始化完成后
app.on("ready", () => {
  createWindow();
});
// 当所有窗口关闭时退出应用
app.on("window-all-closed", () => {
  // 在win下应用会退出，而在macOS下应用不会退出，需要用户手动退出（默认macOS也是这个机制）
  if (process.platform !== "darwin") {
    app.quit();
  }
});
// 激活窗口
app.on("activate", () => {
  // 在macOS下应用会重新创建一个新窗口
  if (mainWin === null) {
    createWindow();
  }
});
// 监听渲染进程发送过来的消息
ipcMain.on("switchToHome", () => {
  mainWin.loadURL(homeURL);
  mainWin.setContentSize(980, 650);

});