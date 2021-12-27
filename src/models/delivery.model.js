const DeliveryModel = (order, account) => {
  const delivery = {};
  delivery.address = `${order.shipping[0].address.address ||
    "SIN DIRECCIÓN"}, ${order.shipping[0].address.description ||
    "SIN DESCRIPCIÓN"}, ${order.shipping[0].address.reference ||
    "SIN REFERENCIA"}`;
  delivery.orderId = `${order.orderId}`;
  if (account.profile) {
    delivery.phone = account.profile.phone || "00000000";
    delivery.name = account.profile.name || "SIN NOMBRE";
  } else {
    delivery.phone = "00000000";
    delivery.name = "SIN NOMBRE";
  }
  delivery.lat = order.shipping[0].address.geolocation.latitude || 14.6262096;
  delivery.lon = order.shipping[0].address.geolocation.longitude || -90.5626013;
  delivery.depto = "SIN DEPARTAMENTO";
  delivery.munic = "SIN MUNICIPIP";
  delivery.zone = 0;
  delivery.circle = {
    id: 1,
    distance: order.shipping[0].address.metaddress.distance.value
  };
  if (order.deliveryDate) {
    delivery.createdAt = new Date(order.deliveryDate);
  } else {
    delivery.createdAt = new Date();
  }
  delivery.createdAt = delivery.createdAt.toISOString();
  return delivery;
};

export default DeliveryModel;
