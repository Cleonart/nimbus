import Odoo from "../core/odoo";

export default class useInventoryAdjustment extends Odoo {
  constructor(HTTP) {
    super(HTTP, "inventory.adjustment");
  }

  models = {
    id: null,
    inventory_date: undefined,
    line_ids: undefined,
  };

  action_generate_adjustment_template({
    inventory_date = undefined,
    product_ids = [],
    context = {},
  }) {
    return this.exec_post("action_generate_adjustment_template", {
      params: {
        args: [
          {
            inventory_date: inventory_date,
            product_ids: product_ids,
          },
        ],
        kwargs: {
          context: {
            ...context,
            invalidate_cache: true,
            tz: "Asia/Makassar",
          },
        },
      },
    });
  }

  create_and_confirm({ adjustment_list = [], timeout = 10000, context = {} }) {
    return this.exec_post(
      "create_and_confirm",
      {
        params: {
          args: [[...adjustment_list]],
          kwargs: {
            context: {
              ...context,
              invalidate_cache: true,
              tz: "Asia/Makassar",
            },
          },
        },
      },
      timeout,
    );
  }
}
