import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { store } from "./modules/shared/store";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./app/App";
import "./app/index.scss";
import "./i18n";
import ModalsProvider from "./modules/shared/components/ModalProvider/Index";
import { Worker } from "@react-pdf-viewer/core";
import AuthProvider from "./modules/auth/context/AuthProvider";

const workerUrl =
  "https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <HelmetProvider>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Worker workerUrl={workerUrl}>
            <App />
          </Worker>
          <ModalsProvider />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </HelmetProvider>
);
