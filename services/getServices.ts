export async function getServicesData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_API_BASE_URL}/treatment-service?page=1&limit=0`,
  );

  return await res.json();
}
