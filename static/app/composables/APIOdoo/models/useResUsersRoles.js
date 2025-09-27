import Odoo from "../core/odoo";

export default class useresUsersRoles extends Odoo {
  constructor(HTTP) {
    super(HTTP, "access.rights");
  }

  reset(id) {
    return this.exec_post("reset", {
      params: {
        args: [id],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
            invalidate_cache: true,
          },
        },
      },
    });
  }

  data_read(id) {
    return this.exec_post("data_read", {
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
}
