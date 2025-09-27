import Odoo from "../core/odoo";

export default class useSortFarmEgg extends Odoo {
  constructor(HTTP) {
    super(HTTP, "sort.farm.egg");
  }
  models = {
    id: null,
  };

  data_read({ read_date = undefined, session_id = undefined }) {
    return this.exec_post("data_read", {
      params: {
        args: [
          {
            read_date: read_date,
            session_id: session_id,
          },
        ],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
          },
        },
      },
    });
  }
}
