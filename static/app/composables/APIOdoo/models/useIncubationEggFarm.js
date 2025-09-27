import Odoo from "../core/odoo";
import _ from "underscore";

export default class useIncubationEggFarm extends Odoo {
  constructor(HTTP) {
    super(HTTP, "incubation.farm.egg");
  }

  models = {
    id: null,
    code: "",
    product_id: undefined,
    start_date: undefined,
    end_date: undefined,
    state: "draft",
    incubation_day: undefined,
    egg_count: 0,
    egg_failed: 0,
    egg_hatch: 0,
    hatch_percentage: 0,
  };

  read_one({ id = undefined }) {
    return this.exec_post("read_one", {
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

  action_confirm({ id = undefined }) {
    return this.exec_post("action_confirm", {
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

  action_done({ id = undefined }) {
    return this.exec_post("action_done", {
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

  search_read({
    domain = [],
    fields = [],
    offset = 0,
    limit = 10,
    order = "id desc",
  }) {
    const companyID = localStorage.getItem("company_id");
    domain.push(["company_id", "=", parseInt(companyID)]);
    return this.exec_post("search_read", {
      params: {
        fields: fields,
        domain: domain,
        limit: limit,
        offset: offset || 0,
        order: order,
        kwargs: {
          context: {
            tz: "Asia/Makassar",
          },
        },
      },
    });
  }
}
