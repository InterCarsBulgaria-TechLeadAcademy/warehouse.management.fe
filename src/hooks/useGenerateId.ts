export function useGenerateId() {
  let id = 0

  function generateId() {
    return ++id
  }

  return generateId
}
