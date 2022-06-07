import { LayoutBase, LayoutData } from 'rc-dock'
import { proxy } from 'valtio'
import { proxyWithComputed } from 'valtio/utils'

export const tabs = proxyWithComputed(
  {
    active: '',
    child: [] as Array<
      {
        id: string
        title: string
        options: {
          closeable: boolean
        },
        widgets?: LayoutData | string
      }
    >
  },
  {
    currentActive: snap => snap.child.find(c => c.id === snap.active)
  }
)

let tabId = 2

export function addTab(window?: string): void {
  console.log('window', window)
  const id = `custom:${++tabId}`;
  const tabState = {
    id,
    title: `Custom`,
    options: {
      closeable: true,
    }
  }

  tabs.active = id;
  tabs.child.push(tabState)
}

export function removeTab(tabId: string): void {
  if (tabId === tabs.active) {
    tabs.active = tabs.child[tabs.child.length - 2].id
  }

  tabs.child = tabs.child.filter(child => child.id !== tabId)
}

export function reorderTabs(startIndex: number, endIndex: number): void {
  const selectedTab = tabs.child[startIndex]
  if (endIndex !== undefined) {
    tabs.child.splice(startIndex, 1);
    tabs.child.splice(endIndex, 0, selectedTab);
  }
}

export function setTabWidgets(tabId: string, widgets: LayoutData): void {
  const childIdx = tabs.child.findIndex(c => c.id === tabId)

  if (!!~childIdx) {
    tabs.child[childIdx].widgets = widgets
  }
}
