import { LayoutBase, LayoutData } from 'rc-dock'
import { proxy } from 'valtio'

export const tabs = proxy(
  {
    active: '',
    child: [] as Array<
      {
        id: string
        title: string
        options: {
          closeable: boolean
        },
        widget: LayoutBase
      }
    >
  }
)

let tabId = 2

export function addTab(window?: string): void {
  const tabState = {
    id: `custom:${++tabId}`,
    title: `Custom`,
    options: {
      closeable: true,
    }
  }

  tabs.child.push(tabState)
}

export function removeTab(tabId: string): void  {
  if (tabId == tabs.active) {
    tabs.active = tabs.child[tabs.child.length - 2].id
  }

  tabs.child = tabs.child.filter(child => child.id != tabId)
}

export function reorderTabs(startIndex: number, endIndex: number): void {
  const selectedTab = tabs.child[startIndex]
  if (endIndex != undefined) {
    tabs.child.splice(startIndex, 1);
    tabs.child.splice(endIndex, 0, selectedTab);
  }
}
