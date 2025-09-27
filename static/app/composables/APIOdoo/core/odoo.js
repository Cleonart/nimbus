import Model from "./model";

export default class Odoo extends Model {
  constructor(HTTP, modelName) {
    super(HTTP, modelName);
  }

  create({ args = {}, context = {}, timeout = 5000 }) {
    return this.exec_post(
      "create",
      {
        params: {
          args: [args],
          kwargs: {
            context: {
              tz: "Asia/Makassar",
              is_use_company: true,
              invalidate_cache: true,
              ...context,
            },
          },
        },
      },
      timeout,
    );
  }

  write({ id, args = {}, context = {} }) {
    return this.exec_post("write", {
      params: {
        args: [id, args],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
            invalidate_cache: true,
            ...context,
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
    order = "id desc",
  }) {
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

  read({ id = null, fields = [] }) {
    return this.exec_post("read", {
      params: {
        args: [id, fields],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
            invalidate_cache: true,
          },
        },
      },
    });
  }

  read_group({ domain = [], fields = [], groupby = "", lazy = false }) {
    return this.exec_post("read_group", {
      params: {
        args: [],
        kwargs: {
          domain: domain,
          fields: fields,
          groupby: groupby,
          lazy: lazy,
          context: {
            tz: "Asia/Makassar",
          },
        },
      },
    });
  }
}
