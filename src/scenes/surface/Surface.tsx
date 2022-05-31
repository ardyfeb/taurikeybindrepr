// import {
//   createTilePanes,
//   TileBranchSubstance,
//   TileProvider,
//   TileContainer,
//   TilePane,
//   DraggableTitle,
// } from "react-tile-pane";

// interface PaneProps {
//   name: string;
// }

// const Pane = ({ name }: PaneProps) => {
//   return <div style={{ border: "1px solid red", padding: "20px" }}>{name}</div>;
// };

// export const Surface = () => {
//   const [paneList, names] = createTilePanes({
//     watchList: <Pane name="Watch List" />,
//     orderBook: <Pane name="Order Book" />,
//     orderList: <Pane name="Order List" />,
//     runningTrade: <Pane name="Running Trade" />,
//     accountPosition: <Pane name="Account Position" />,
//     riskMonitoring: <Pane name="Risk Monitoring" />,
//   });

//   const rootPane: TileBranchSubstance = {
//     children: [
//       { children: [names.watchList] },
//       { children: [names.orderList] },
//       { children: [names.runningTrade] },
//       { children: [names.accountPosition] },
//       { children: [names.riskMonitoring] },
//     ],
//   };

//   const addPane = () => {
//     paneList.push({ name: "watchList2", child: <Pane name="Watch List 2" /> });
//   };

//   return (
//     <TileProvider tilePanes={paneList} rootNode={rootPane}>
//       <div>
//         <button onClick={addPane}>Add Pane</button>
//       </div>
//       <TileContainer />
//       <DraggableTitle name={names.watchList}>Drag this banana🍌</DraggableTitle>
//     </TileProvider>
//   );
// };
import React, { useCallback, useMemo, useState } from "react";
import {
  createTilePanes,
  DraggableTitle,
  TileBranchSubstance,
  TileContainer,
  TileProvider,
  useGetRootNode,
  TabsBarConfig,
  TabBarPropsWithAction,
  PaneName,
} from "react-tile-pane";
import "./Surface.css";

// function createStyles<T extends Record<string, React.CSSProperties>>(
//   styles: T
// ): T {
//   return styles;
// }

// export const thickness = 40;

// export const color = {
//   backL: "#1C242D",
//   back: "#181E26",
//   backD: "#12171D",
//   secondary: "#567091",
//   secondaryL: "#29394e",
//   secondaryLL: "rgba(41,57,78,0.3)",
//   primary: "#60cbff",
// };

// export const size = createStyles({
//   full: {
//     height: "100%",
//     width: "100%",
//   },
// });

// export const flex = createStyles({
//   center: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   around: {
//     display: "flex",
//     justifyContent: "space-around",
//     alignItems: "center",
//   },
//   between: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   columnBetween: {
//     flexDirection: "column",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
// });

// export const styles = createStyles({
//   container: {
//     color: "#fff",
//     height: 600,
//     width: 1000,
//   },
//   tabBar: {
//     background: color.backL,
//     ...size.full,
//     ...flex.columnBetween,
//   },
//   tabTitle: {
//     height: thickness * 0.8,
//     width: thickness,
//     ...flex.between,
//     background: color.secondaryLL,
//     marginBottom: 6,
//     cursor: "move",
//     userSelect: "none",
//   },
//   tabTitleOn: {
//     height: thickness * 0.8,
//     width: thickness,
//     ...flex.between,
//     background: color.secondaryL,
//     marginBottom: 6,
//     cursor: "move",
//     userSelect: "none",
//   },
//   pane: {
//     background: color.back,
//     flexDirection: "column",
//     ...size.full,
//     ...flex.center,
//   },
//   closeButton: {
//     height: thickness * 1.5,
//     width: thickness,
//     color: color.secondary,
//     fontSize: 35,
//     cursor: "pointer",
//     ...flex.center,
//   },
// });

// const localStorageKey = "react-tile-pane-layout";
// const TabBar: React.FC<TabBarPropsWithAction> = ({ tabs, onTab, action }) => {
//   const tabBar = useCallback(
//     (tab: PaneName, i: number) => (
//       <DraggableTitle
//         style={i === onTab ? styles.tabTitleOn : styles.tabTitle}
//         name={tab}
//         key={tab}
//         onClick={() => action.switchTab(i)}
//       >
//         <div
//           style={{
//             background: i === onTab ? color.primary : color.secondaryL,
//             height: "100%",
//             width: 6,
//           }}
//         />
//         <div style={{ ...flex.center, ...size.full }}>Tab</div>
//       </DraggableTitle>
//     ),
//     [action, onTab]
//   );

//   return useMemo(
//     () => (
//       <div style={styles.tabBar}>
//         <div>{tabs.map(tabBar)}</div>
//         <div onClick={() => action.closeTab(onTab)} style={styles.closeButton}>
//           ×
//         </div>
//       </div>
//     ),
//     [action, onTab, tabBar, tabs]
//   );
// };

// export const tabBarConfig: TabsBarConfig = {
//   render: TabBar,
//   thickness,
//   position: "bottom",
//   preBox: {
//     isRow: false,
//     isReverse: false,
//   },
// };

const [nodeList, names] = createTilePanes({
  arbutus: <div className="pane">arbutus</div>,
  cherry: <div className="pane">cherry</div>,
  apple: <div className="pane">apple</div>,
  banana: <div className="pane">banana</div>,
  lemon: <div className="pane">lemon</div>,
  mango: <div className="pane">mango</div>,
  pomelo: <div className="pane">pomelo</div>,
});

const rootPane: TileBranchSubstance = {
  children: [
    { children: [names.apple, names.cherry] },
    {
      isRow: true,
      grow: 2,
      children: [
        { children: names.arbutus },
        { children: names.lemon },
        {
          children: [
            { children: names.mango, grow: 3 },
            { children: names.pomelo },
          ],
        },
      ],
    },
  ],
};

function SaveLayout() {
  const getRootNode = useGetRootNode();
  //localStorage.setItem(localStorageKey, JSON.stringify(getRootNode()));
  return <></>;
}

// const tabBarConfig: TabsBarConfig = {
//   render: TabBar,
//   thickness,
//   position: "bottom",
//   preBox: {
//     isRow: false,
//     isReverse: false,
//   },
// };

export const Surface: React.FC = () => {
  // const localRoot = localStorage.getItem(localStorageKey);
  // const root = localRoot
  //   ? (JSON.parse(localRoot) as TileBranchSubstance)
  //   : rootPane;
  return (
    <TileProvider
      tilePanes={nodeList}
      rootNode={rootPane}
      // tabBar={tabBarConfig}
    >
      <div className="App">
        <div className="fence">
          <TileContainer />
        </div>
      </div>
    </TileProvider>
  );
};
