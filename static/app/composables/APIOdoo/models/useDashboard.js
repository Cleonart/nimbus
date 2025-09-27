import Odoo from "../core/odoo";

export default class useDashboard extends Odoo {
  constructor(HTTP) {
    super(HTTP, "dashboard");
  }

  get_dashboard_data(date = {}) {
    return this.exec_post("get_dashboard_data", {
      params: {
        args: [
          {
            invoiced_date: date,
          },
        ],
        kwargs: {},
      },
    });
  }

  get_module_farm_egg_summary() {
    return this.exec_post(
      "get_module_farm_egg_summary",
      {
        params: {
          args: [],
          kwargs: {},
        },
      },
      5000,
    );
  }
}
