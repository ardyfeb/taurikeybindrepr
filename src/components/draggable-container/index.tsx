// @ts-nocheck
import { DockLayout, } from "rc-dock";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { selectLayoutDockBox } from "./utils";
import * as savedLayout from "./saved-layouts"

interface IDraggableContainer {
  onCreateNewWidget?: Function;
  savedLayoutType: string;
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

export const DraggableContainer: React.FC<IDraggableContainer> = ({
  savedLayoutType,
  draggableRef
}) => {

  //#region REF
  const dockLayoutNode = useRef<DockLayout>();
  //#endregion

  //#region STATE
  const [tabCount, setTabCount] = useState(0)
  const [widget, setWidgets] = useState(box);
  const [activePanelId, setActivePanelId] = useState("");
  //#endregion

  //#region LIFECYCLE
  useImperativeHandle(draggableRef, () => ({
    onClickNewWidget
  }))
  useEffect(() => {
    if (savedLayoutType.length) {
      setWidgets(savedLayout[savedLayoutType]);
    }
  }, [savedLayoutType])
  //#endregion



  const onLoadTab = (tab) => {
    const { id } = tab;
    const tabData = {
      ...tab,
      title: id,
      closable: true,
      content: <div>{id}</div>,
      group: "closeAll"
    }
    return tabData;
  }

  const addWidget = (panelId) => {
    const panelData = dockLayoutNode.current.find(panelId);
    const newTabId = `tab${tabCount + 1}`;
    setTabCount(tabCount + 1);
    const newTab = getTab(newTabId);
    dockLayoutNode.current.dockMove(newTab, panelData, "middle");

  }

  const onClickNewWidget = () => {
    const { children } = selectLayoutDockBox(dockLayoutNode.current.state.layout);

    const [child] = children;
    const { id } = child;
    setActivePanelId(id);
    setWidgets({ ...widget, newBox })
    addWidget(id);
  }

  const onLayoutChange = (newLayout) => {
    setWidgets(newLayout);
  }

  const onPanelLoaded = (savedPanel, loadedPanel) => {
    const { id } = savedPanel;
    setActivePanelId(id);
  }
  return (
    <>
      <DockLayout
        ref={dockLayoutNode}
        layout={widget}
        onLayoutChange={onLayoutChange}
        loadTab={onLoadTab}
        afterPanelLoaded={onPanelLoaded}
        style={{ position: 'absolute', left: 10, top: 60, right: 10, bottom: 10 }}

      />
    </>
  )
}