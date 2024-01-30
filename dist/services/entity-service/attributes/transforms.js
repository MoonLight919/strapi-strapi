"use strict";
const _ = require("lodash/fp");
const bcrypt = require("bcryptjs");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const bcrypt__default = /* @__PURE__ */ _interopDefault(bcrypt);
const transforms = {
  password(value, context) {
    const { attribute } = context;
    if (attribute.type !== "password") {
      throw new Error("Invalid attribute type");
    }
    if (!_.isString(value) && !(value instanceof Buffer)) {
      return value;
    }
    const rounds = _.toNumber(_.getOr(10, "encryption.rounds", attribute));
    return bcrypt__default.default.hashSync(value.toString(), rounds);
  }
};
module.exports = transforms;
//# sourceMappingURL=transforms.js.map
