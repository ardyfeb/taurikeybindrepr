export type ArrayType<T extends any[]> = T extends Array<infer C> ? C : never 
