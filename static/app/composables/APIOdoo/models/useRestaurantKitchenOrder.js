import Odoo from "../core/odoo";

export default class useRestaurantKitchenOrder extends Odoo {
  constructor(HTTP) {
    super(HTTP, "restaurant.kitchen.order");
  }

  action_post({ ids = undefined }) {
    return this.exec_post("action_post", {
      params: {
        args: [ids],
        kwargs: {
          context: {
            invalidate_cache: true,
            invalidate_cache_list: [
              "restaurant.kitchen",
              "restaurant.kitchen.order",
            ],
          },
        },
      },
    });
  }

  action_serve({ ids = undefined }) {
    return this.exec_post("action_serve", {
      params: {
        args: [ids],
        kwargs: {
          context: {
            invalidate_cache: true,
            invalidate_cache_list: [
              "restaurant.kitchen",
              "restaurant.kitchen.order",
            ],
          },
        },
      },
    });
  }

  action_finish({ ids = undefined }) {
    return this.exec_post("action_finish", {
      params: {
        args: [ids],
        kwargs: {
          context: {
            invalidate_cache: true,
            invalidate_cache_list: [
              "restaurant.kitchen",
              "restaurant.kitchen.order",
            ],
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
