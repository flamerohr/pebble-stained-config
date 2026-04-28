import ThemeProvider from "#features/theme/state/theme.provider";
import { useMemo, type ComponentType } from "react";

export const Providers = (App: ComponentType) => (props: {}) => {
  const params = useMemo(() => {
    return new URLSearchParams(window.location.search);
  }, [window.location.search]);

  return (
    <ThemeProvider bw={params.get("bw") == "1"}>
      <App {...props} />
    </ThemeProvider>
  );
};

export default Providers;
