"use strict";
const helpers = require("../../utils/helpers.js");
const action = require("./action.js");
const command = ({ command: command2 }) => {
  command2.command("start").description("Start your Strapi application\nATTACHED PACKAGE @strapi/strapi\nVERSION 3.1").action(helpers.runAction("start", action));
};
module.exports = command;
//# sourceMappingURL=command.js.map
