import packageSpec from "../package.json";
import mutations from "./mutations/index.js";
import policies from "./policies.json";
import resolvers from "./resolvers/index.js";
import schemas from "./schemas/index.js";
import startup from "./startup.js";

/**
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: "Open Commerce API Plugin - Nodemailer",
    name: "opencommerce-api-plugin-nodemailer",
    version: packageSpec.version,
    functionsByType: {
      startup: [startup]
    },
    graphQL: {
      resolvers,
      schemas
    },
    mutations,
    policies
  });
}
