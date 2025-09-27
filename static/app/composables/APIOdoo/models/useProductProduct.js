import Odoo from "../core/odoo";

export default class useProductProduct extends Odoo {
  constructor(HTTP) {
    super(HTTP, "product.product");
  }
  models = {
    id: "",
    product_code: "",
    name: "",
    brand: "",
    variant: "",
    unit_base_id: "",
    list_price: 0,
    standard_price: 0,
    type: "product",
    product_type: "product",
  };

  read_quantity_at_date({
    inventory_date = moment().format("YYYY-MM-DD"),
    domain = [],
    order = "id desc",
    timeout = 5000,
  }) {
    return this.exec_post(
      "read_quantity_at_date",
      {
        params: {
          args: [
            {
              inventory_date: inventory_date,
              domain: domain,
              order: "product_type DESC",
            },
          ],
          kwargs: {
            context: {
              tz: "Asia/Makassar",
            },
          },
        },
      },
      timeout,
    );
  }

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
