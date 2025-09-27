import Odoo from "../core/odoo";

export default class useStockQuant extends Odoo {
  constructor(HTTP) {
    super(HTTP, "stock.quant");
  }

  models = {
    id: null,
    product_id: null,
    product_code: null,
    product_name: null,
    product_brand: null,
    product_variant: null,
  };

  set_apply_inventory({ id, quantity }) {
    return this.exec_post("set_apply_inventory", {
      params: {
        args: [id, quantity],
        kwargs: {
          context: {
            invalidate_cache: true,
          },
        },
      },
    });
  }
}
