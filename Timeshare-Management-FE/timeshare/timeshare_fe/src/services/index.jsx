import axios from "axios";
import ROUTER from "../routers/routerList";
import STORAGE, { deleteStorage, getStorage } from "./../lib/storage";
import { trimData } from "./../lib/utils";
import Notice from "./../Components/Notice/index";
/**
 *
 * parse error response
 */
function parseError(messages) {
  // error
  if (messages) {
    if (messages instanceof Array) {
      return Promise.reject({ messages });
    }
    return Promise.reject({ messages: [messages] });
  }
  return Promise.reject({ messages: ["Server quá tải"] });
}

/**
 * parse response
 */

export function parseBody(response) {
  const resData = response.data;
  if (+response?.status >= 500) {
    return Notice({
      msg: `Hệ thống đang tạm thời gián đoạn. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ`,
      isSuccess: false,
    });
  }
  if (+response?.status < 500 && +response?.status !== 200) {
    return Notice({
      msg: `Hệ thống xảy ra lỗi. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ (SC${response?.status})`,
      isSuccess: false,
    });
  }

  if (response?.status === 200) {
    if (resData.StatusCode === 401) {
      deleteStorage(STORAGE.TOKEN);
      return window.location.replace(ROUTER.HOME);
    }
    if (resData.Status === -2) return resData; // ma sp, ten sp ton tai
    if (resData.Status === 0) return resData; // API tra ve success

    if (resData.Status !== -1 && resData.Status !== 69 && resData.Object) {
      Notice({
        msg: resData.Object,
        isSuccess: false,
      });
    }
    if (resData.Status !== 1 && resData.Object) {
      return {
        ...resData,
        object: resData.Object,
      };
    }
    return resData;
  }
  return parseError(resData?.messages);
}

/**
 * axios instance
 */
// const baseURL = ''
const instance = axios.create({
  // baseURL: '',
  timeout: 60000,
});
// request header
instance.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    // Kiểm tra url truy cập của web để config tương ứng
    let BASE_URL = process.env.REACT_APP_API_ROOT;
    config.params = { ...config.params };
    if (config.data) {
      config.data =
        config.data instanceof FormData ? config.data : trimData(config.data);
    }
    config.headers = {
      Authorization: getStorage(STORAGE.TOKEN) || "5W+3CaFlo0GnUltbhGtcgA==",
    }; //
    config.baseURL = BASE_URL;
    config.onUploadProgress = (progressEvent) => {
      // let percentCompleted = Math.floor(
      //   (progressEvent.loaded * 100) / progressEvent.total,
      // )
      // do whatever you like with the percentage complete
      // maybe dispatch an action that will update a progress bar or something
    };
    return config;
  },
  (error) => Promise.reject(error)
);

// response parse
instance.interceptors.response.use(
  (response) => parseBody(response),
  (error) => {
    // can not connect API
    if (error.code === "ECONNABORTED") {
      Notice({
        msg: "Hệ thống đang tạm thời gián đoạn. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ ",
        isSuccess: false,
      });
    } else if (+error?.response?.status >= 500) {
      Notice({
        msg: `Hệ thống đang tạm thời gián đoạn. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ `,
        isSuccess: false,
      });
    } else if (
      +error?.response?.status < 500 &&
      +error?.response?.status !== 200
    ) {
      Notice({
        msg: `Hệ thống xảy ra lỗi. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ (SC${error?.response?.status})`,
        isSuccess: false,
      });
    } else if (error.code === "ERR_NETWORK") {
      Notice({
        msg: `Hệ thống đang bị gián đoạn, vui lòng kiểm tra lại đường truyền!`,
        isSuccess: false,
      });
    } else if (typeof error.response === "undefined") {
      Notice({ msg: error.response, isSuccess: false });
    } else if (error.response) {
      Notice({
        msg: `Hệ thống đang tạm thời gián đoạn. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ `,
        isSuccess: false,
      });
      return parseError(error.response.data);
    } else
      Notice({
        msg: `Hệ thống đang tạm thời gián đoạn. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ `,
        isSuccess: false,
      });
    return Promise.reject(error);
  }
);

export default instance;

export const httpGetFile = (path = "", optionalHeader = {}) =>
  instance({
    method: "GET",
    url: path,
    headers: { ...optionalHeader },
  });
