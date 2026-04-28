import { FormProvider, useForm } from "react-hook-form";
import Select from "#components/form/select/select";
import { themeList } from "#features/theme/config/theme-list";
import { useCallback, useEffect, type FC } from "react";
import { useTheme } from "#features/theme/state/theme.context";
import Checkbox from "#components/form/checkbox/checkbox";
import PreviewHint from "#components/preview-hint/preview-hint";
import Button from "#components/button/button";

import s from "./config-form.module.scss";

interface ConfigFormValues {
  Theme: number;
  Bluetooth: boolean;
}

const themeOptions = themeList.map(({ value, label }) => ({ value, label }));

export const ConfigForm: FC<{ submitUrl: string }> = ({ submitUrl }) => {
  const formMethods = useForm<ConfigFormValues>({
    defaultValues: {
      Theme: 0,
      Bluetooth: false,
    },
  });
  const { setColor } = useTheme();

  const { register, watch, handleSubmit } = formMethods;

  const theme = watch("Theme");

  useEffect(() => {
    if (theme < 2) {
      setColor(theme);
    }
  }, [theme]);

  const applyChanges = useCallback((values: ConfigFormValues) => {
    console.log(values);
    const params = {
      Theme: values.Theme,
      Bluetooth: values.Bluetooth ? 1 : 0,
    };
    window.location.href =
      submitUrl + encodeURIComponent(JSON.stringify(params));
  }, []);

  return (
    <FormProvider {...formMethods}>
      <form className={s.form} onSubmit={handleSubmit(applyChanges)}>
        <PreviewHint />
        <div className={s.fields}>
          <Select
            options={themeOptions}
            {...register("Theme", { valueAsNumber: true })}
            label="Theme"
          />
          {/*<Checkbox {...register("Bluetooth")} label="Show bluetooth" />*/}
        </div>
        <footer className={s.footer}>
          <div className={s.footerbuttons}>
            <Button type="submit">Apply</Button>
          </div>
        </footer>
      </form>
    </FormProvider>
  );
};

export default ConfigForm;
