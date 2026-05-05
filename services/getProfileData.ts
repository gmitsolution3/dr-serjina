export async function getProfileData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DEV_API_BASE_URL}/profile`);

  return await res.json();
}