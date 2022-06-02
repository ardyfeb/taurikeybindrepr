import { useContext } from "react"
import { LayoutController, LayoutManager } from "@/context/LayoutManager"

export function useLayoutManager(): LayoutController {
  return useContext(LayoutManager)!
}
