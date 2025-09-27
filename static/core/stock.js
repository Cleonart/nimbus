import _ from "underscore";
import orm from "./orm";

export default {
  parseStockMove: (line) => {
    return _.map(line, (obj_data) => {
      const obj_update = _.omit(obj_data, ["is_product_loading"]);
      return {
        ...obj_update,
        product_id: orm.map_id(obj_data.product_id),
        name: obj_update.product_id,
        location_id: obj_data.location_id[0],
        location_dest_id: obj_data.location_dest_id[0],
      };
    });
  },
};
