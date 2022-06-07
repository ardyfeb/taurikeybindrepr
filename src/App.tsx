import { useCallback, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { window } from "@tauri-apps/api";
import { GlobalHotKeys, getApplicationKeyMap, KeyMap } from "react-hotkeys";

import { tabs } from "./states/tabs";
import { Layout } from "./scenes/layout/Layout";

function createDefaultMainLayout() {
  const childs = [
    {
      id: "preset:order",
      title: "Order",
      widgets: "order",
      options: {
        closeable: false,
      },
    },
    {
      id: "preset:risk-management",
      title: "Risk",
      widgets: "riskManagement",
      options: {
        closeable: false,
      },
    },
  ];

  tabs.active = "preset:order";
  tabs.child = childs;
}

/**
 * This is temporary way to transfer tab state to new child window
 * TODO: use event to create new tab to child window
 */
function createLayoutFromParams(): void {
  const url = new URL(document.location.href);

  if (url.searchParams.has("init")) {
    const serializedState = url.searchParams.get("init")!;
    const tabState = JSON.parse(atob(serializedState));

    tabs.active = tabState.id;
    tabs.child = [tabState];
  }
}

const App: React.FunctionComponent = (props) => {
  // const webview = new window.WebviewWindow("main");

  // const register = async () => {
  //   const isRegistered = await globalShortcut.isRegistered("CmdOrControl+S");
  //   if (!isRegistered) {
  //     globalShortcut.register("CmdOrControl+S", () => alert("oke"));
  //   }
  // };

  // webview.once("tauri://created", function () {
  //   console.log("oke");
  // });

  useEffect(() => {
    console.log(getApplicationKeyMap());
    // register();
    // globalShortcut.unregisterAll();
    // globalShortcut.register("CmdOrControl+S", () => alert("oke"));
    // return () => {
    //   console.log("ini jalan");
    //   globalShortcut.unregisterAll();
    // };
  }, []);

  // webview.once("tauri://created", () => {
  //   register();
  //   return () => {
  //     globalShortcut.unregister("CmdOrControl+S");
  //   };
  // });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   register();
  //   // globalShortcut.register("CmdOrControl+Q", () => alert("oke"));
  //   return () => {
  //     globalShortcut.unregister("CmdOrControl+S");
  //   };
  // }, []);

  // useEffect(() => {
  //   // webview.once("tauri://created", function () {
  //   // webview window successfully created
  // });
  // }, [])

  useEffect((): void => {
    if (window.appWindow.label === "main") {
      createDefaultMainLayout();
    } else {
      createLayoutFromParams();
    }
    console.log("mounted");
  }, []);

  // const isRegistered = globalShortcut
  //   .isRegistered("CmdOrControl+Q")
  //   .then((val) => val);

  // const register = async () => {
  //   const isRegistered = await globalShortcut.isRegistered("CmdOrControl+Q");
  //   console.log(isRegistered);
  //   console.log("ini jalan oke");
  //   globalShortcut.register("CmdOrControl+Q", () => alert("oke"));
  //   if (isRegistered) {
  //     return globalShortcut.unregister("CmdOrControl+Q");
  //   }
  // };

  type HandlerType = {
    [key: string]: () => void;
  };

  const preventDefaultHandlers = (handlers: HandlerType) => {
    const newHandlers = {} as any;
    for (const [action, handler] of Object.entries(handlers)) {
      newHandlers[action] = (event: any) => {
        if (event) {
          event.preventDefault();
        }
        handler();
      };
    }
    return newHandlers;
  };

  const showAlert = useCallback(() => alert("oke"), []);

  // const keyMap: KeyMap = {
  //   SHOW_ALERT: { name: "Show Alert", sequences: "Control+s" },
  //   SHOW_ALERT2: { name: "Show Alert 2", sequences: "Command+s" },
  // };

  const keyMap = {
    SHOW_ALERT: "Control+s",
    SHOW_ALERT2: "Command+s",
  };

  const handlers = preventDefaultHandlers({
    SHOW_ALERT: showAlert,
    SHOW_ALERT2: () => alert("show aler 2"),
  });

  return (
    <ChakraProvider>
      <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
      <Layout />
    </ChakraProvider>
  );
};

export default App;
