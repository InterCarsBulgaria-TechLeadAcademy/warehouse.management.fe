export function formHasErrors(errors: Record<any, any>) {
  return Object.keys(errors).length > 0
}
