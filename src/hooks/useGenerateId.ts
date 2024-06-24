export default function useGenerateId() {
  let id: number = 0

  function generateId(): number {
    return id++
  }

  return generateId
}
