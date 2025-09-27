import Odoo from "../core/odoo";

export default class useRestaurantKitchen extends Odoo {
  constructor(HTTP) {
    super(HTTP, "restaurant.kitchen");
  }

  search_read_order({
    id = undefined,
    order_date = undefined,
    domain = undefined,
  }) {
    return this.exec_post("search_read_order", {
      params: {
        args: [
          id,
          {
            order_date: order_date,
            domain: domain,
          },
        ],
        kwargs: {},
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
    return this.exec_post("search_read", {
      params: {
        domain: domain,
        fields: fields,
        offset: offset,
        limit: limit,
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
