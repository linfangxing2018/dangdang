/*
 * @Author: linfangxing@jinlingkeji.cn linfangxing@jinlingkeji.cn
 * @Date: 2024-04-27 16:12:16
 * @LastEditors: linfangxing@jinlingkeji.cn linfangxing@jinlingkeji.cn
 * @LastEditTime: 2024-04-28 21:21:22
 * @FilePath: \dangdang\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig, CommonServerOptions } from "vite";
import vue from "@vitejs/plugin-vue";
import fs from "fs"; // 需要安装node以及@types/node
import dotenv from "dotenv"; // dotenv 是一个零依赖的模块，它将环境变量从 .env 文件加载到 process.env 中
import { IEnvConf } from "./src/declare_/myenv";
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })
// 改造成函数比较灵活，里面可以写各种代码
export default defineConfig((mode) => {
  console.log(mode);
  // 1. 会在终端输出
  // {
  //   mode: 'development',
  //   command: 'serve',
  //   isSsrBuild: false,
  //   isPreview: false
  // }

  // 2. 拼接路径
  const envFileName: string = ".env";
  const curEnvFileName = `${envFileName}.${mode.mode}`;
  console.log(curEnvFileName, "curEnvFileName");
  // fs.readFileSync 同步读取环境文件key-value 数据到缓存对象
  // 鼠标放上来 类型是 dotenv.DotenvParseOutput 但是这个默认是[name: string]: string;
  const envConf: IEnvConf = dotenv.parse(fs.readFileSync(curEnvFileName));
  console.log(envConf, "envConf");
  const curEnv: string = mode.mode;
  // 3.服务
  let server: CommonServerOptions = {};
  if (mode.mode === "development") {
    server = {
      host: envConf.VITE_HOST, // 自己本地的
      port: envConf.VITE_PORT,
      proxy: {
        // 当碰到 /dang会自动访问到http://192.168.2.6:5003/dang
        [envConf.VITE_BASE_URL]: {
          target: envConf.VITE_PROXY_DOMAIN,
        },
      },
    };
  } else if (mode.mode === "production") {
    server = {
      host: envConf.VITE_HOST, // 自己本地的
      port: envConf.VITE_PORT,
    };
  }

  return {
    plugins: [vue()],
    server,
  };
});
