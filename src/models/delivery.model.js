const DeliveryModel = (order) => {
  const delivery = {};
  delivery.address = order.shipping[0].address.address || "SIN DIRECCION";
  delivery.orderId = order.orderId;
  delivery.name = order.email;
  delivery.lat = order.shipping[0].address.geolocation.latitude || 14.6262096;
  delivery.lon = order.shipping[0].address.geolocation.longitude || -90.5626013;
  delivery.depto = "SIN DEPARTAMENTO";
  delivery.munic = "SIN MUNICIPIP";
  delivery.zone = 0;
  delivery.circle = {
    id: 1,
    distance: order.shipping[0].address.metaddress.distance.value
  };
  return delivery;
};

export default DeliveryModel;
