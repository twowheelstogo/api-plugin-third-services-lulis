import ReactionError from "@reactioncommerce/reaction-error";
import {
  OdooService,
  DeliveryService,
  AirtableService
} from "../services/index.js";
import { OdooModel, DeliveryModel, AirtableModel } from "../models/index.js";
/**
 * @param {Object} context container that get all functions of project
 * @param {Order} order Order Created
 * @returns {Number} orderId Odoo Id
 */
export default async function getOdooInvoice(context, order) {
  const { collections } = context;
  const { Accounts, Branches } = collections;
  const account = await Accounts.findOne({ _id: order.accountId });
  try {
    const airtableModel = AirtableModel(order, account);
    AirtableService(airtableModel);
  } catch (error2) {
    // eslint-disable-next-line no-console
    console.log(error2);
  }
  console.log("entra");
  console.log("esta es la order");
  let tmp = JSON.stringify(order);
  console.log(tmp)
  if (order.shipping[0].address) {
    console.log("entra 2");
    try {
      console.log("entra 3");
      let branch = null;
      if (order.shipping[0].type === "pickup") {
        branch = await Branches.findOne({
          _id: order.shipping[0].pickupDetails.branchId
        });
      } else {
        branch = await Branches.findOne({
          _id: order.shipping[0].address.metaddress.distance.branchId
        });
      }
      console.log("antes de delivery model");
      const deliveryModel = DeliveryModel(order, account, branch);
      console.log("delivery model", deliveryModel);
      await DeliveryService(deliveryModel);
      // eslint-disable-next-line no-empty
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("error tmp");
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
