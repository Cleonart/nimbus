import Odoo from "../core/odoo";

export default class useAccountPayable extends Odoo {
  constructor(HTTP) {
    super(HTTP, "account.move");
  }

  models = {
    id: null,
    name: undefined,
    state: undefined,
    payment_state: undefined,
    journal_id: undefined,
    partner_id: undefined,
    invoice_date: undefined,
    invoice_date_due: undefined,
    invoice_user_id: undefined,
    amount_untaxed: 0,
    amount_tax: 0,
    amount_residual: 0,
    amount_total: 0,
  };

  action_post({ ids = [] }) {
    return this.exec_post("action_post", {
      params: {
        args: [ids],
        kwargs: {
          context: {
            invalidate_cache: true,
          },
        },
      },
    });
  }

  action_create_adjustment({ args = {} }) {
    return this.exec_post("action_create_adjustment", {
      params: {
        args: [args],
        kwargs: {
          context: {
            invalidate_cache: true,
          },
        },
      },
    });
  }

  js_assign_outstanding_line({ id = undefined, line_id = undefined }) {
    return this.exec_post("js_assign_outstanding_line", {
      params: {
        args: [id, line_id],
        kwargs: {
          context: {
            invalidate_cache: true,
          },
        },
      },
    });
  }

  generate_invoice_by_partner(partner_id = undefined) {
    return this.exec_raw(
      "api/report/invoice",
      {
        params: {
          args: [{ partner_id: partner_id }],
          kwargs: {
            context: {
              invalidate_cache: true,
            },
          },
        },
      },
      20000,
    );
  }

  read_simple(id) {
    return this.exec_post("read_simple", {
      params: {
        args: [id],
        kwargs: {},
      },
    });
  }

  read_one(id, context = {}) {
    return this.exec_post("read_one", {
      params: {
        args: [id],
        kwargs: {
          context: context,
        },
      },
    });
  }

  action_create_delivery({ id, location_id, delivery_date }) {
    return this.exec_post("action_create_delivery", {
      params: {
        args: [
          id,
          {
            location_id: location_id,
            delivery_date: delivery_date,
          },
        ],
        kwargs: {
          context: {
            invalidate_cache: true,
          },
        },
      },
    });
  }

  rewrite_and_post({ id, args = {}, context = {} }) {
    return this.exec_post("rewrite_and_post", {
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

  /** DEPRECATED */

  action_create_simple_payable({ args = {}, kwargs = {}, context = {} }) {
    return this.exec_post("action_create_simple_payable", {
      params: {
        args: [args],
        kwargs: { ...kwargs, context: { invalidate_cache: true, ...context } },
      },
    });
  }

  get_payment_list(id) {
    return this.exec_post("get_payment_list", {
      params: {
        args: [id],
        kwargs: {},
      },
    });
  }

  confirm_slip(id, args = {}) {
    return this.exec_post("confirm_slip", {
      params: {
        args: [id],
        kwargs: {
          context: {
            invalidate_cache: true,
          },
        },
      },
    });
  }

  handle_payment(payload = {}) {
    return this.exec_post("handle_payment", {
      params: {
        args: [payload],
        kwargs: {
          context: {
            invalidate_cache: true,
          },
        },
      },
    });
  }

  read_summary({ move_type = "", start_date = null, end_date = null }) {
    return this.exec_post("read_summary", {
      params: {
        args: [
          {
            move_type: move_type,
            start_date: start_date,
            end_date: end_date,
          },
        ],
        kwargs: {},
      },
    });
  }

  read_analysis({ move_type = "", start_date = null, end_date = null }) {
    return this.exec_post("read_analysis", {
      params: {
        args: [
          {
            move_type: move_type,
            start_date: start_date,
            end_date: end_date,
          },
        ],
        kwargs: {},
      },
    });
  }

  read_amount({ partner_id = undefined, move_ids = [] }) {
    return this.exec_post("read_amount", {
      params: {
        args: [
          {
            partner_id: partner_id,
            move_ids: move_ids,
          },
        ],
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
        offset: offset,
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
