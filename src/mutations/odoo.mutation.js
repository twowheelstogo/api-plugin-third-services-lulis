import ReactionError from "@reactioncommerce/reaction-error";
import { OdooService } from "../services/index.js";
import { OdooModel } from "../models/index.js";
/**
 * @param {Object} context container that get all functions of project
 * @param {Order} order Order Created
 * @returns {Number} orderId Odoo Id
 */
export default async function getOdooInvoice(context, order) {
  const odooModel = OdooModel(order);
  console.log("odoomodel",odooModel);
  try {
    return await OdooService(odooModel);
  } catch (error) {
    console.log(error);
    throw new ReactionError(5, "Error al momento de generar la factura");
  }
}
