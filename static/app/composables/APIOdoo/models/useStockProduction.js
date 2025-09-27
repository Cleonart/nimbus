import Odoo from "../core/odoo";

export default class useStockProduction extends Odoo {
  constructor(HTTP) {
    super(HTTP, "stock.production");
  }

  models = {
    id: null,
    production_egg_farm_line_ids: undefined,
  };

  action_confirm(id) {
    return this.exec_post("action_confirm", {
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
}
