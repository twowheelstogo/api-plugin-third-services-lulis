import fetch from "node-fetch";

export default async (body) => {
  const invoiceUrl = process.env.INVOICE_URL;
  const res = await fetch(
    `${invoiceUrl}/api/invoices`,
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
  return data.order.id;
};
