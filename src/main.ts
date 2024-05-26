import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { ImgLoader } from "./utils/imgLoader";

ImgLoader.storageAllImg.apply(ImgLoader);
createApp(App).mount("#app");
