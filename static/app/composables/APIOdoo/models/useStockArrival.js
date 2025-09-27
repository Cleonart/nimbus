import Odoo from "../core/odoo";

export default class useStockArrival extends Odoo {
  constructor(HTTP) {
    super(HTTP, "stock.picking");
  }

  models = {
    id: null,
    name: null,
    location_id: null,
    location_type: undefined,
    location_dest_id: null,
    location_dest_type: undefined,
    actual_date: null,
    movement_type: "arrival",
    shipment_option: null,
    shipment_number: null,
    state: "draft",
    is_create_purchase: false,
  };

  read_simple({ id = null }) {
    return this.exec_post("read_simple", {
      params: {
        args: [id],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
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
    order = "",
  }) {
    domain.push(["movement_type", "=", "arrival"]);
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

  create_account_payable(ids) {
    return this.exec_post("create_account_payable", {
      params: {
        args: [ids],
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
}
