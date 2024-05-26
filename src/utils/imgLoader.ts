/*
 * @Author: linfangxing@jinlingkeji.cn linfangxing@jinlingkeji.cn
 * @Date: 2024-04-29 12:42:00
 * @LastEditors: linfangxing@jinlingkeji.cn linfangxing@jinlingkeji.cn
 * @LastEditTime: 2024-04-30 17:25:40
 * @FilePath: \dangdang\src\utils\imgLoader.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import storage from "good-storage";

export class ImgLoader {
  static imgList: Record<string, any> = {};
  static storageAllImg() {
    ImgLoader.imgList = storage.get("imgList", {});

    if (!ImgLoader.imgList || !ImgLoader.isNotEmptyImgList()) {
      ImgLoader.imgList = ImgLoader.laodAllImg();
      storage.set("imgList", ImgLoader.imgList);
    }
  }
  static isNotEmptyImgList() {
    return Object.getOwnPropertyNames(ImgLoader.imgList).length;
  }
  static getImg(imgName: string): string {
    ImgLoader.imgList = ImgLoader.isNotEmptyImgList()
      ? ImgLoader.imgList
      : storage.get("imgList");
    console.log(ImgLoader.imgList, "ImgLoader.imgList");
    return ImgLoader.imgList[imgName];
  }
  // 1. 加载所有图片到内存 https://vitejs.dev/guide/features 英文版官网才有glob
  static laodAllImg(): any {
    let imgList: any = {};
    const viewImgModules: Record<string, any> = import.meta.glob(
      `../assets/img/**/**/*.png`,
      {
        eager: true,
      }
    );
    console.log(viewImgModules, "viewImgModules");

    for (let path in viewImgModules) {
      let imgFullPath = viewImgModules[path].default;
      if (imgFullPath) {
        let imgName = path.substring(path.lastIndexOf("/") + 1);
        imgList[imgName] = imgFullPath;
      }
    }
    console.log(imgList, "imgList");
    return imgList;
  }
}

export default ImgLoader.getImg;
