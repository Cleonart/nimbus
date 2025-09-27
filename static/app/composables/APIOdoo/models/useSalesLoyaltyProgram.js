import Odoo from "../core/odoo";

export default class useSalesLoyaltyProgram extends Odoo {
  constructor(HTTP) {
    super(HTTP, "loyalty.program");
  }

  models = {
    company_id: undefined,
    active: true,
    name: null,
    program_type: undefined,
    date_to: undefined,
    limit_usage: undefined,
    max_usage: 0,
    trigger: "auto",
    rule_ids: [],
    reward_ids: [],
  };

  detail_read({ id }) {
    return this.exec_post("detail_read", {
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

  search_read({
    domain = [],
    fields = [],
    offset = 0,
    limit = 10,
    order = "id desc",
  }) {
    const companyID = localStorage.getItem("company_id");
    domain.push(["company_id", "=", parseInt(companyID)]);
    return super.search_read({
      domain: domain,
      fields: fields,
      offset: offset,
      limit: limit,
      order: order,
    });
  }
}
