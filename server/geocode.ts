// eslint-disable-next-line @typescript-eslint/no-require-imports
const fetch = require('node-fetch');

export const getLatLng = async (
  address: string
): Promise<{ lat: number; lng: number }> => {
  const apiKey = "YOUR_OPENCAGE_API_KEY";
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      address
    )}&key=${apiKey}&language=ja&pretty=1`
  );
  const data = (await response.json()) as {
    results: { geometry: { lat: number; lng: number } }[];
  };
  const location = data.results[0].geometry;
  return { lat: location.lat, lng: location.lng };
};
