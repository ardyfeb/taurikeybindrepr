export function select<
  V extends string | number, Q extends Partial<Record<V, any>> & { default?: any }
>(value: V, qualifier: Q):  Q[keyof Q] {
  return qualifier[value]
}
