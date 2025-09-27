import { notification } from "ant-design-vue";
import pkg from "axios";
const { AxiosError } = pkg;

export default {
  raiseError: function (e, show_notification, message = undefined) {
    if (e instanceof AxiosError) {
      const code = e.code;
      message = e.response?.data?.result.msg;
      if (code == "ECONNABORTED") {
        message = "Terjadi masalah dengan jaringan, silahkan coba lagi";
      } else if (message == undefined) {
        message = e.response?.data?.msg || e.response?.data?.message;
      }
    } else if (e instanceof Error) {
      message = e.message;
    }

    if (show_notification && (message != undefined || message != null)) {
      notification["error"]({
        message: message,
      });
    }
    return e;
  },

  raiseSuccess: function (message) {
    notification["success"]({
      message: message,
    });
  },
};
