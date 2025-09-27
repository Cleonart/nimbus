import Odoo from "../core/odoo";

export default class useCompany extends Odoo {
  constructor(HTTP) {
    super(HTTP, "res.company");
  }

  reset() {
    return this.exec_post("reset", {
      params: {
        args: [],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
            invalidate_cache: true,
          },
        },
      },
    });
  }

  get_env_company() {
    return this.exec_post("get_env_company", {
      params: {
        args: [],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
            invalidate_cache: true,
          },
        },
      },
    });
  }

  init_company_account() {
    return this.exec_post("init_company_account", {
      params: {
        args: [],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
            invalidate_cache: true,
            invalidate_cache_list: ["account.move", "account.payment"],
          },
        },
      },
    });
  }

  init_company_journal() {
    return this.exec_post("init_company_journal", {
      params: {
        args: [],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
            invalidate_cache: true,
            invalidate_cache_list: ["account.move", "account.payment"],
          },
        },
      },
    });
  }
}
