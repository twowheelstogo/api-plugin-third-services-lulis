import ReactionError from "@reactioncommerce/reaction-error";
import { OdooService, DeliveryService } from "../services/index.js";
import { OdooModel, DeliveryModel } from "../models/index.js";
/**
 * @param {Object} context container that get all functions of project
 * @param {Order} order Order Created
 * @returns {Number} orderId Odoo Id
 */
export default async function getOdooInvoice(context, order) {
  if (order.shipping[0].address) {
    try {
      const deliveryModel = DeliveryModel(order);
      await DeliveryService(deliveryModel);
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }
  const odooModel = OdooModel(order);
  try {
    return await OdooService(odooModel);
  } catch (error) {
    throw new ReactionError(5, "Error al momento de generar la factura");
  }
}
