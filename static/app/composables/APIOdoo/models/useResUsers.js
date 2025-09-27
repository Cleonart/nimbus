import Odoo from "../core/odoo";

export default class useResUsers extends Odoo {
  constructor(HTTP) {
    super(HTTP, "res.users");
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
