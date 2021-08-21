import fetch from "node-fetch";

export default async (body) => {
  const invoiceUrl = process.env.INVOICE_URL;
  const url = `${invoiceUrl}/api/invoices`;
  const res = await fetch(
    url,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  );
  if (!res.ok) {
    throw new Error("Error en la comunicación");
  }
  const data = await res.json();
  return data.order;
};
