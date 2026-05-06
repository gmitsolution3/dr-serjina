const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEV_API_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getProfileData() {
  const res = await fetch(`${baseUrl}/profile`);

  return await res.json();
}