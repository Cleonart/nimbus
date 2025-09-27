import Odoo from "../core/odoo";

export default class useAccountPOS extends Odoo {
  constructor(HTTP) {
    super(HTTP, "account.pos");
  }

  models = {
    id: null,
    transaction_no: null,
    transaction_date: null,
    session_uuid: null,
    table_no: "",
    order_type: "dine_in",
    amount_total: 0,
    state: undefined,
  };

  read_data({ id = undefined, context = {} }) {
    return this.exec_post("read_data", {
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

  action_create_pos({ args = {}, context = {} }) {
    return this.exec_post("action_create_pos", {
      params: {
        args: [args],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
            invalidate_cache: true,
            ...context,
          },
        },
      },
    });
  }

  action_write_pos({ id, args = {}, context = {} }) {
    return this.exec_post("action_write_pos", {
      params: {
        args: [id, args],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
            invalidate_cache: true,
            ...context,
          },
        },
      },
    });
  }

  send_order_to_kitchen({ id }) {
    return this.exec_post("send_order_to_kitchen", {
      params: {
        args: [id],
        kwargs: {
          context: {
            invalidate_cache: true,
            invalidate_cache_list: ["account.pos", "restaurant.kitchen.order"],
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
    const company_id = localStorage.getItem("company_id");
    domain.push(["company_id", "=", parseInt(company_id)]);
    return super.search_read({
      domain: domain,
      fields: fields,
      offset: offset,
      limit: limit,
      order: order,
    });
  }
}
