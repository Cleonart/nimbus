import Odoo from "../core/odoo";

export default class useAccountPayable extends Odoo {
  constructor(HTTP) {
    super(HTTP, "account.move");
  }

  confirm_slip(id, args = {}) {
    return this.exec_post("confirm_slip", {
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

  handle_payment(payload = {}) {
    return this.exec_post("handle_payment", {
      params: {
        args: [payload],
        kwargs: {
          context: {
            invalidate_cache: true,
          },
        },
      },
    });
  }
}
