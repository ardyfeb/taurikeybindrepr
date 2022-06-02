import { createContext } from "react"

import { addTab, removeTab, reorderTabs } from "@/states/tabs"

export interface LayoutController {
  dock: {
    addWidget: () => void
  }
  tabs: {
    add: typeof addTab
    remove: typeof removeTab
    reorder: typeof reorderTabs,
    focus: (tabId: string) => void
    detach: (tabId: string) => void
  }
}

export const LayoutManager = createContext<LayoutController | null>(null)
