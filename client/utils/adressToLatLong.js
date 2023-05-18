export default async function adressToLatLong(address, city) {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}, ${city}.json?limit=1&access_token=pk.eyJ1IjoiYWRyaWFuYjExIiwiYSI6ImNsaDZqMHlqdzA2ZmEzcm1nOHo4MHJkdW4ifQ.1DzSIHkydUjb2H94ijNE1g`
  );
  const data = await response.json();
  const coordonates = data.features[0].geometry.coordinates;
  return [coordonates[1], coordonates[0]];
}
