import Odoo from "../core/odoo";

export default class useAccountPosSession extends Odoo {
  constructor(HTTP) {
    super(HTTP, "account.pos.session");
  }

  read_summary({ id = undefined }) {
    return this.exec_post("read_summary", {
      params: {
        args: [id],
        kwargs: {},
      },
    });
  }

  create_move({ id = undefined }) {
    return this.exec_post(
      "action_create_move",
      {
        params: {
          args: [id],
          kwargs: {
            context: {
              invalidate_cache: true,
            },
          },
        },
      },
      10000,
    );
  }

  print(shift_id = undefined) {
    return this.exec_raw(
      "api/report/shift/summary/" + shift_id.toString(),
      {
        params: {
          args: [],
          kwargs: {},
        },
      },
      20000,
    );
  }

  close({ id = undefined }) {
    return this.exec_post("close", {
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

  search_read({
    domain = [],
    fields = [],
    offset = 0,
    limit = 10,
    order = "id desc",
  }) {
    const company_id = localStorage.getItem("company_id");
    domain.push(["company_id", "=", parseInt(company_id)]);
    // fields.push("company_id");
    return super.search_read({
      domain: domain,
      fields: fields,
      offset: offset,
      limit: limit,
      order: order,
    });
  }
}
