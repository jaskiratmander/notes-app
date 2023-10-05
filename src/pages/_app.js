import "@/styles/globals.css";
import { ActiveStateProvider } from "@/context/ActiveStateContext";

import { NotesProvider } from "@/context/NotesContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={client}>
      <ActiveStateProvider>
        <NotesProvider>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </NotesProvider>
      </ActiveStateProvider>
    </QueryClientProvider>
  );
}
