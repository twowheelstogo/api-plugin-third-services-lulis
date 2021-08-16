import pkg from "../package.json";
import mutations from "./mutations";
/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: "Third services of lulis",
    name: "third-services-lulis",
    version: pkg.version,
    mutations
  });
}
