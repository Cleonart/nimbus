import Odoo from "../core/odoo";

export default class useResPartner extends Odoo {
  constructor(HTTP) {
    super(HTTP, "res.partner");
  }

  models = {
    id: null,
    name: null,
    country_id: 100,
    state_id: null,
    address: null,
    phone: null,
    balance: 0.0,
    partner_type: undefined,
  };

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
