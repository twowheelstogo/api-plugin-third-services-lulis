const DeliveryModel = (order, account, branch) => {
  const delivery = {};
  delivery.orderId = `${order.orderId}`;
  delivery.depto = "SIN DEPARTAMENTO";
  delivery.munic = "SIN MUNICIPIP";
  delivery.zone = 0;
  if (account) {
    if (account.profile) {
      delivery.phone = account.profile.phone || "00000000";
      delivery.name = account.profile.name || "SIN NOMBRE";
    } else {
      delivery.phone = "00000000";
      delivery.name = "SIN NOMBRE";
    }
  } else {
    delivery.phone = "00000000";
    delivery.name = "SIN NOMBRE";
  }
  if (branch) {
    if (branch.generalData) {
      if (branch.generalData.deliveryCode) {
        delivery.branchId = branch.generalData.deliveryCode || "";
      } else {
        delivery.branchId = "";
      }
    } else {
      delivery.branchId = "";
    }
  } else {
    delivery.branchId = "";
  }
  if (order.shipping[0].type === "pickup") {
    const [_date, _time] = order.shipping[0].pickupDetails.datetime.split(" ");
    const [_year, _month, _day] = _date.split("-");
    const [_hours, _minutes] = _time.split(":");
    delivery.createdAt = new Date(
      +_year,
      +_month - 1,
      +_day,
      +_hours,
      +_minutes
    );
    delivery.address = "20 calle 24-60 zona 10 Ofibodega pradera bodega 15 Guatemala, 01010";
    delivery.lat = 0;
    delivery.lon = 0;
    //delivery.address = branch.generalData.address;
    // eslint-disable-next-line prefer-destructuring
    //delivery.lat = branch.geographyData.point.coordinates[1];
    // eslint-disable-next-line prefer-destructuring
    //delivery.lon = branch.geographyData.point.coordinates[0];
    delivery.circle = {
      id: 1,
      distance: 1
    };
  } else {
    delivery.address = `${order.shipping[0].address.address ||
      "SIN DIRECCIÓN"}, ${order.shipping[0].address.description ||
      "SIN DESCRIPCIÓN"}, ${order.shipping[0].address.reference ||
      "SIN REFERENCIA"}`;

    delivery.lat = order.shipping[0].address.geolocation.latitude || 14.6262096;
    delivery.lon =
      order.shipping[0].address.geolocation.longitude || -90.5626013;
    delivery.circle = {
      id: 1,
      distance: order.shipping[0].address.metaddress.distance.value
    };
    delivery.createdAt = new Date();
  }

  delivery.createdAt = delivery.createdAt.toISOString();
  return delivery;
};

export default DeliveryModel;
