import { proxy } from 'valtio'

export const tabs = proxy(
  {
    active: 'preset:trading',
    tabs: [
      {
        id: 'preset:trading',
        title: 'Trading',
      },
      {
        id: 'preset:position',
        title: 'Position',
      },
      {
        id: 'custom:1',
        title: 'Custom'
      }
    ]
  }
)

export function reorderTabs(startIndex: number, endIndex: number): void {
  const selectedTab = tabs.tabs[startIndex]

  if (selectedTab) {
    if (endIndex != undefined) {
      tabs.tabs.splice(startIndex, 1);
      tabs.tabs.splice(endIndex, 0, selectedTab);
    }
  }
}
