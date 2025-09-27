import Odoo from "../core/odoo";

export default class useStockTransfer extends Odoo {
  constructor(HTTP) {
    super(HTTP, "stock.picking");
  }

  models = {
    id: null,
    name: null,
    location_id: null,
    location_dest_id: null,
    instruction_date: null,
    actual_date: null,
    movement_type: "transfer",
    shipment_option: null,
    shipment_number: null,
    is_create_sales: false,
  };

  search_read({ domain = [], fields = [], offset = 0, limit = 10 }) {
    domain.push(["movement_type", "=", "transfer"]);
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

  picking_confirm(id) {
    return this.exec_post("picking_confirm", {
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

  cancel_picking(id) {
    return this.exec_post("cancel_picking", {
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

  write_and_reserve({ id = undefined, args = {} }) {
    return this.exec_post("write_and_reserve", {
      params: {
        args: [id, args],
        kwargs: {
          context: {
            invalidate_cache: true,
          },
        },
      },
    });
  }
}
