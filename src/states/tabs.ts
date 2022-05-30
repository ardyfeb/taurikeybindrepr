import { proxy } from 'valtio'

export const tabs = proxy(
  {
    active: 0,
    tabs: [] as Array<
      {
        title: string
      }
    >
  }
)
