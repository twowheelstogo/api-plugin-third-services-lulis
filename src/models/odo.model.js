const CF = "C/F";
const CITY = "GUATEMALA";
const UNDEFINED_PRODUCT_NAME = "SIN NOMBRE DEL PRODUCTO";

const ProductsModel = (order) => {
  const products = [];
  order.shipping[0].items.forEach((prod) => {
    const product = {};
    product.name =
      prod.optionTitle || prod.variantTitle || UNDEFINED_PRODUCT_NAME;
    product.price = prod.subtotal;
    // eslint-disable-next-line camelcase
    product.product_id = prod.odooProduct;
    product.quantity = prod.quantity;
    products.push(product);
    if (Array.isArray(prod.metafields)) {
      if (prod.metafields.length > 0) {
        prod.metafields.forEach((_sub) => {
          const jsonSub = JSON.parse(_sub.value);
          if (Array.isArray(jsonSub)) {
            if (jsonSub.length > 0) {
              jsonSub.forEach((subbox) => {
                const subProduct = {};
                subProduct.name =
                  subbox.title || subbox.pageTitle || UNDEFINED_PRODUCT_NAME;
                subProduct.price = 0;
                // eslint-disable-next-line camelcase
                subProduct.product_id = subbox.odooProduct;
                subProduct.quantity = subbox.quantity;
                products.push(subProduct);
              });
            }
          }
        });
      }
    }
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
    odooModel.street = order.billing.address || "GUATEMALA";
  } else {
    odooModel.street = "";
  }
  odooModel.razon = odooModel.name;
  odooModel.city = CITY;
  if (order.billing) {
    odooModel.vat = order.billing.nit || "C/F";
  } else {
    odooModel.vat = CF;
  }
  odooModel.orderId = order._id;
  odooModel.products = ProductsModel(order);
  if (order.shipping[0].invoice) {
    if (order.shipping[0].invoice) {
      odooModel.shipping = order.shipping[0].invoice.shipping || 0;
    } else {
      odooModel.shipping = 0;
    }
  } else {
    odooModel.shipping = 0;
  }
  if (order.billing) {
    odooModel.partnerId = order.billing.partnerId || -1;
  } else {
    odooModel.partnerId = -1;
  }
  return odooModel;
};

export default OdooModel;
