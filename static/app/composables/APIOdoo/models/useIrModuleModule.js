import Odoo from "../core/odoo";

export default class IrModuleModule extends Odoo {
  constructor(HTTP) {
    super(HTTP, "ir.module.module");
  }

  app_install({ id = undefined }) {
    return this.exec_post("app_install", {
      params: {
        args: [id],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
          },
        },
      },
    });
  }

  app_uninstall({ id = undefined }) {
    return this.exec_post("app_uninstall", {
      params: {
        args: [id],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
            ...context,
          },
        },
      },
    });
  }
}
