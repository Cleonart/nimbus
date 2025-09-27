import Odoo from "../core/odoo";

export default class useProduct extends Odoo {
  constructor(HTTP) {
    super(HTTP, "product.template");
  }
  models = {
    id: "",
    product_code: "",
    name: "",
    brand: "",
    variant: "",
    unit_base_id: undefined,
    list_price: 0,
    standard_price: 0,
    type: "product",
    product_type: "product",
    is_stock_inventory_standard: false,
    available_in_pos: true,
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
