import fetch from "node-fetch";

export default async (geopoint) => {
  const lulisGeopoint = process.env.LULIS_GEOPOINT;
  const googleKey = process.env.GOOGLE_KEY;
  console.log(lulisGeopoint);
  let url = "https://maps.googleapis.com/maps/api/distancematrix/json";
  url += `?origins=${encodeURIComponent(`${geopoint.latitude},${geopoint.longitude}`)}`;
  url += `&destinations=${encodeURIComponent(`${lulisGeopoint}`)}`;
  url += `&region=${encodeURI("gt")}`;
  url += `&language=${encodeURI("es")}`;
  url += `&key=${encodeURI(googleKey)}`;
  console.log(url);
  const res = await fetch(
    url,
    {
      method: "GET"
    }
  );
  console.log("res.ok",res.ok);
  if (!res.ok) {
    return {
      text: "0 km",
      value: 0
    };
  }
  const data = await res.json();
  console.log("data.status",data.status);
  if (data.status !== "OK") {
    return {
      text: "0 km",
      value: 0
    };
  }
  console.log("data.rows[0]",data.rows[0]);
  if (data.rows[0]) {
    console.log("data.rows[0].elements",data.rows[0].elements);
    if (data.rows[0].elements) {
        console.log("data.rows[0].elements.distance",data.rows[0].elements.distance);
      if (data.rows[0].elements.distance) {
        data.rows[0].elements.distance.value /= 1000;
        console.log("data.rows[0].elements.distance",data.rows[0].elements.distance);
        return data.rows[0].elements.distance;
      }
    }
  }
  return {
    text: "0 km",
    value: 0
  };
};
