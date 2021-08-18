import fetch from "node-fetch";

export default async (body) => {
  const invoiceUrl = process.env.INVOICE_URL;
  const url = `${invoiceUrl}/api/invoices`;
  console.log("url:", url);
  console.log("body", body);
  const res = await fetch(
    url,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  );
  if (!res.ok) {
    console.log(res);
    console.log(body);
    throw new Error("Error en la comunicación");
  }
  const data = await res.json();
  return data.order.id;
};
