export function markerIsSelected(markers: string[] | number[], markerId: number) {
  return markers.some((marker) => marker.toString() === markerId.toString())
}
