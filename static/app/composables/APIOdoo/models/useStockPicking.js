import Odoo from "../core/odoo";

export default class useStockShipment extends Odoo {
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
    state: "draft",
    shipment_option: null,
    shipment_number: null,
    is_create_sales: false,
  };

  search_read({ domain = [], fields = [], offset = 0, limit = 10 }) {
    return this.exec_post("search_read", {
      params: {
        fields: fields,
        domain: domain,
        limit: limit,
        offset: offset,
        kwargs: {
          context: {
            tz: "Asia/Makassar",
            invalidate_cache: true,
          },
        },
      },
    });
  }

  create_pos_sales(args = {}) {
    return this.exec_post("create_pos_sales", {
      params: {
        args: [args],
        kwargs: {},
      },
    });
  }

  picking_confirm(id) {
    return this.exec_post("picking_confirm", {
      params: {
        args: [id],
        kwargs: {},
      },
    });
  }

  create_account_receivable(ids) {
    return this.exec_post("create_account_receivable", {
      params: {
        args: [ids],
        kwargs: {},
      },
    });
  }

  cancel_picking(id) {
    return this.exec_post("cancel_picking", {
      params: {
        args: [id],
        kwargs: {},
      },
    });
  }
}
