// @ts-nocheck
import { DockLayout, LayoutData, } from "rc-dock";
import { useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { selectLayoutDockBox } from "./utils";
import * as savedLayout from "./saved-layouts"
import { select } from "@/utils/select"
import { setTabWidgets, tabs } from "@/states/tabs"
import { useSnapshot } from "valtio"

interface DraggableContainerProps {
  draggableRef?: React.MutableRefObject;
}

let tab = {
  title: 'Tab',
  content: <div>Tab Content</div>
};

let box = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'vertical',
        children: [
          {
            tabs: [{ ...tab, id: 't1' }, { ...tab, id: 't2' }, { ...tab, id: 't3' }],
          },
          {
            tabs: [{ ...tab, id: 't4' }, { ...tab, id: 't5' }, { ...tab, id: 't6' }],
          }
        ]
      },
      {
        tabs: [{ ...tab, id: 't7' }, { ...tab, id: 't8' }, { ...tab, id: 't9' }]
      },
    ]
  }
};

let newBox = {
  "dockbox": {
    "mode": "horizontal",
    "children": [
      {
        "tabs": []
      }
    ]
  }
}

const getTab = function getTab(id) {
  return {
    ...tab,
    id,
    title: id,
    group: "closeAll"
  };
};

let tabId = 0

export const DraggableContainer: React.FunctionComponent<DraggableContainerProps> = props => {
  const dockLayoutNode = useRef<DockLayout>();
  const tabsSnap = useSnapshot(tabs)

  const dockLayout = useMemo(
    (): LayoutData => {
      const layout = select(
        typeof tabsSnap.currentActive?.widgets,
        {
          string: savedLayout[tabsSnap.currentActive?.widgets],
          object: tabsSnap.currentActive?.widgets
        }
      )

      if (layout) return layout

      return {
        dockbox: {
          mode: 'vertical',
          children: []
        }
      }
    },
    [tabsSnap]
  )

  const addWidget = (panelId) => {
    const panelData = dockLayoutNode.current.find(panelId);
    const newTabId = `tab${++tabId }`;
    const newTab = getTab(newTabId);
    
    dockLayoutNode.current.dockMove(
      newTab, panelData, "middle"
    );
  }

  //#region LIFECYCLE
  useImperativeHandle(props.draggableRef, () => ({
    addWidget: () => {
      const { 
        children: [child] 
      } = selectLayoutDockBox(dockLayoutNode.current.state.layout);
  
      addWidget(child.id);
    }
  }))
  //#endregion

  const onLoadTab = (tab) => {
    const tabData = {
      ...tab,
      title: tab.id,
      closable: true,
      content: <div>{tab.id}</div>,
      group: "closeAll"
    }

    return tabData;
  }

  const onLayoutChange = (newLayout) => {
    setTabWidgets(tabsSnap.active, newLayout)
  }

  const onPanelLoaded = (savedPanel, loadedPanel) => {
    // setActivePanelId(savedPanel.id);
  }
  return (
    <>
      <DockLayout
        ref={dockLayoutNode}
        layout={dockLayout}
        onLayoutChange={onLayoutChange}
        loadTab={onLoadTab}
        afterPanelLoaded={onPanelLoaded}
        style={
          { 
            position: 'absolute', 
            left: 12, 
            top: 12, 
            right: 12,
            bottom: 12,
            zIndex: 0
          }
         }
      />
    </>
  )
}
