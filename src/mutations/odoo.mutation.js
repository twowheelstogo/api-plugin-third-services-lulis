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
      const { collections } = context;
      const { Accounts } = collections;
      const account = await Accounts.findOne({ _id: order.accountId });

      const deliveryModel = DeliveryModel(order, account);
      await DeliveryService(deliveryModel);
      // eslint-disable-next-line no-empty
    } catch (error) {
      console.log(error);
    }
  }
  const odooModel = OdooModel(order);
  try {
    return await OdooService(odooModel);
  } catch (error) {
    throw new ReactionError(5, "Error al momento de generar la factura");
  }
}
