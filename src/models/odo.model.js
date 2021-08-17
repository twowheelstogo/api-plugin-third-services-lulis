const CF = "C/F";
const CITY = "GUATEMALA";
const UNDEFINED_PRODUCT_NAME = "SIN NOMBRE DEL PRODUCTO";
const SHIPPING_NAME = "Costo por envío";

const ProductsModel = (order) => {
  const products = [];
  let tmpId = "";
  order.shipping[0].items.forEach((prod) => {
    const product = {};
    product.name = prod.optionTitle || prod.variantTitle || UNDEFINED_PRODUCT_NAME;
    product.price = prod.subtotal;
    // eslint-disable-next-line camelcase
    product.product_id = prod.odooProduct;
    product.quantity = prod.quantity;
    products.push(product);
    tmpId = product.product_id;
  });
  products.push({
    name: SHIPPING_NAME,
    price: order.shipping[0].invoice.shipping,
    quantity: 1,
    // eslint-disable-next-line camelcase
    product_id: tmpId
  });
  return products;
};
const OdooModel = (order) => {
  const odooModel = {};
  odooModel.email = order.email || process.env.EMAIL_FILESYSTEM;
  if (order.billing) {
    if (order.billing.name) {
      odooModel.name = order.billing.name;
    } else {
      odooModel.name = odooModel.email;
    }
  } else {
    odooModel.name = odooModel.email;
  }
  odooModel.mobile = "";
  if (order.billing) {
    odooModel.street = order.billing.address;
  } else {
    odooModel.street = "";
  }
  odooModel.razon = odooModel.name;
  odooModel.city = CITY;
  if (order.billing) {
    odooModel.vat = order.billing.nit;
  } else {
    odooModel.vat = CF;
  }
  odooModel.orderId = order._id;
  odooModel.products = ProductsModel(order);
  return odooModel;
};

export default OdooModel;

