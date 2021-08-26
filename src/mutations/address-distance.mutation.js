import { DistanceMatrixService } from "../services/index.js";
/**
 * @param {Object} context container that get all functions of project
 * @param {Order} geopoint Geopoint of User
 * @returns {Number} orderId Odoo Id
 */
export default async function getAddressDistance(context, geopoint) {
  try {
    return await DistanceMatrixService(geopoint);
  } catch (error) {
    return {
      text: "0 km",
      value: 0
    };
  }
}
