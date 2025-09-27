import Odoo from "../core/odoo";

export default class useresUsersRolesAccess extends Odoo {
  constructor(HTTP) {
    super(HTTP, "res.users.roles.access");
  }

  data_read({ role_id = 0 }) {
    return this.exec_post("data_read", {
      params: {
        args: [{ role_id: role_id }],
        kwargs: {},
      },
    });
  }
}
