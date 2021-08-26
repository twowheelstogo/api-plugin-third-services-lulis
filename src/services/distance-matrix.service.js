import fetch from "node-fetch";

export default async (geopoint) => {
  const lulisGeopoint = process.env.LULIS_GEOPOINT;
  const googleKey = process.env.GOOGLE_KEY;
  let url = "https://maps.googleapis.com/maps/api/distancematrix/json";
  url += `?origins=${encodeURIComponent(`${geopoint.latitude},${geopoint.longitude}`)}`;
  url += `&destinations=${encodeURIComponent(`${lulisGeopoint}`)}`;
  url += `&region=${encodeURI("gt")}`;
  url += `&language=${encodeURI("es")}`;
  url += `&key=${encodeURI(googleKey)}`;
  const res = await fetch(
    url,
    {
      method: "GET"
    }
  );
  if (!res.ok) {
    return {
      text: "0 km",
      value: 0
    };
  }
  const data = await res.json();
  if (data.status !== "OK") {
    return {
      text: "0 km",
      value: 0
    };
  }
  if (data.rows[0]) {
    if (data.rows[0].elements) {
      if (data.rows[0].elements[0]) {
        if (data.rows[0].elements[0].distance) {
          data.rows[0].elements[0].distance.value /= 1000;
          return data.rows[0].elements[0].distance;
        }
      }
    }
  }
  return {
    text: "0 km",
    value: 0
  };
};
