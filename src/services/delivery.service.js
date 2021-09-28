import fetch from "node-fetch";

export default async (body) => {
  const deliveryUrl = process.env.DELIVERY_URL;
  const url = `${deliveryUrl}/api/v1/deliveries`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) {
    throw new Error("Error en la comunicación");
  }
  const data = await res.json();
  return data.message;
};
