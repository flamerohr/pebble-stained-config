import ConfigForm from "#features/config-form/config-form";
import Providers from "./components/providers";

import s from "./app.module.scss";
import { useMemo } from "react";

function App() {
  const params = useMemo(() => {
    return new URLSearchParams(window.location.search);
  }, [window.location.search]);

  return (
    <>
      <header className={s.header}>Stained glass config</header>
      <div className={s.appcontainer}>
        <ConfigForm
          submitUrl={params.get("return_to") || "pebblejs://close#"}
        />
      </div>
    </>
  );
}

export default Providers(App);
