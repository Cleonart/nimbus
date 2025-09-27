import _ from "underscore";

export default {
  map_id: (value, index) => {
    /**
     * This function is supposed to map the array_id from odoo to id only fields
     * For Example, the return from odoo for product_id = [1, "Product 1"]
     * Javascript can only handle id which is 1, so this array need to unpack
     */
    if (typeof value == "boolean") {
      return false;
    } else if (typeof value == "object" && index != null) {
      return value[index];
    } else if (typeof value == "object") {
      return value[0];
    }
  },
  map_name: (value) => {
    /**
     * This function is supposed to map the array_id from odoo to id only fields
     * For Example, the return from odoo for product_id = [1, "Product 1"]
     * Javascript can only handle id which is 1, so this array need to unpack
     */
    if (typeof value == "boolean") {
      return false;
    } else if (typeof value == "object") {
      return value[1];
    }
  },
  map_line: (list) => {
    /**
     *
     */
    return _.map(list, (record) => {
      if (!record.id) {
        return [0, 0, { ...record }];
      } else {
        return [1, parseInt(record.id), { ...record }];
      }
    });
  },
  cleanup: (data) => {
    if (typeof data == "object") {
    }
  },
};
