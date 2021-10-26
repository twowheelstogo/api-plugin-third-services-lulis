const UNDEFINED_PRODUCT_NAME = "SIN NOMBRE DEL PRODUCTO";

const ProductsModel = (order) => {
  const products = [];
  order.shipping[0].items.forEach((prod) => {
    const product = {};
    product.product =
      prod.optionTitle || prod.variantTitle || UNDEFINED_PRODUCT_NAME;
    product.unitPrice = prod.subtotal;
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
                subProduct.product =
                  subbox.title || subbox.pageTitle || UNDEFINED_PRODUCT_NAME;
                subProduct.unitPrice = 0;
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

const AirtableModel = (order, account) => {
  const now = new Date();
  const airtable = {
    customerEmail: order.email || process.env.EMAIL_FILESYSTEM,
    branch: "OFIBODEGAS PRADERA",
    company: "LULIS",
    createdAt: now.toISOString(),
    idcustomer: order.accountId || "SIN IDENTIFICADOR",
    ordenNumber: order.orderId.toString() || "SIN NÚMERO DE ORDEN"
  };
  if (account.profile) {
    airtable.customer = account.profile.name || "SIN NOMBRE";
    airtable.phone = account.profile.phone || "SIN TELEFONO";
  } else {
    airtable.customer = "SIN NOMBRE";
    airtable.phone = "SIN TELEFONO";
  }
  if (order.shipping) {
    if (order.shipping[0]) {
      if (order.shipping[0].shipmentMethod) {
        airtable.shipping =
          order.shipping[0].shipmentMethod.name || "S3IN SHIPPING";
      } else {
        airtable.shipping = "SIN SHIPPING";
      }
    } else {
      airtable.shipping = "SIN SHIPPING";
    }
  } else {
    airtable.shipping = "SIN SHIPPING";
  }
  if (order.billing) {
    if (order.billing.name) {
      airtable.razon = order.billing.name;
      airtable.vat = order.billing.nit;
    } else {
      airtable.razon = "SIN NOMBRE DE RAZÓN";
      airtable.vat = "SIN NIT";
    }
  } else {
    airtable.razon = "SIN NOMBRE DE RAZÓN";
    airtable.vat = "SIN NIT";
  }
  if (order.shipping) {
    if (order.shipping[0]) {
      if (order.shipping[0].address) {
        airtable.placeDelivery = order.shipping[0].address.description;
      } else {
        airtable.placeDelivery = "SIN ALIAS DE NOMBRE DE LUGAR";
      }
    } else {
      airtable.placeDelivery = "SIN ALIAS DE NOMBRE DE LUGAR";
    }
  } else {
    airtable.placeDelivery = "SIN ALIAS DE NOMBRE DE LUGAR";
  }
  airtable.products = ProductsModel(order);
  return airtable;
};

export default AirtableModel;
