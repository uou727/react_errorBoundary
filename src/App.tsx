import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useErrorReporting from "./utils/useErrorReporting";

function App() {
  const [count, setCount] = useState(0);
  const { reportError } = useErrorReporting();

  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      const urlParams = {
        error: { message: event.message, stack: event.error?.stack || "" },
        data: { errTime: new Date().toISOString() },
        browserInfo: { userAgent: navigator.userAgent },
      };
      reportError(urlParams);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const urlParams = {
        error: {
          message: event.reason.message,
          stack: event.reason.stack || "",
        },
        data: { errTime: new Date().toISOString() },
        browserInfo: { userAgent: navigator.userAgent },
      };
      reportError(urlParams);
    };

    window.addEventListener("error", handleGlobalError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleGlobalError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, [reportError]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
