import { Location } from "./location";

function locationFilter(latLng: [number, number], weather: string): Location[] {
  // TODO: good weather array
  let goodWeather: string[] = ["Sunny", "Partly Sunny", "Cloudy"];
  if (goodWeather.includes(weather)) {
    // outdoor
  }
  else {
    // indoor
  }
  // TODO: if weather is bad, do not choose outdoor locations
  // TODO: sort by distance
  return null;
}

function exerciseFilter() {
  return null;
}

function changeWeight(options: [string], chosen: string) {
  // TODO: link to global db
  // TODO: chosen increase weight
  // TODO: other options decrease option
}
