export const BIRMINGHAM_BOUNDARIES = {
  minLat: 52.3861,
  maxLat: 52.5861,
  minLng: -1.967,
  maxLng: -1.767,
};

export const isWithinBirmingham = (latitude: number, longitude: number) => {
  return (
    latitude >= BIRMINGHAM_BOUNDARIES.minLat &&
    latitude <= BIRMINGHAM_BOUNDARIES.maxLat &&
    longitude >= BIRMINGHAM_BOUNDARIES.minLng &&
    longitude <= BIRMINGHAM_BOUNDARIES.maxLng
  );
};
