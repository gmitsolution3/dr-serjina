const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEV_API_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getServicesData() {
  const res = await fetch(
    `${baseUrl}/treatment-service?page=1&limit=0`,
  );

  return await res.json();
}
