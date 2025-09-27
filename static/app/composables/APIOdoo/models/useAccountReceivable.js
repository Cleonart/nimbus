import Odoo from "../core/odoo";

export default class useAccountReceivable extends Odoo {
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

  search_read({ domain = [], fields = [], offset = 0, limit = 10 }) {
    domain.push(["move_type", "=", "out_invoice"]);
    return this.exec_post("search_read", {
      params: {
        fields: fields,
        domain: domain,
        limit: limit,
        offset: offset,
        kwargs: {
          context: {
            tz: "Asia/Makassar",
          },
        },
      },
    });
  }

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
}
