export type ArrayType<T extends any[] | readonly any[]> = T extends Array<infer C> ? C : never 
