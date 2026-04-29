import { FormProvider, useForm, useWatch } from "react-hook-form";
import Select from "#components/form/select/select";
import { themeList } from "#features/theme/config/theme-list";
import { useCallback, useEffect, type FC } from "react";
import { useTheme } from "#features/theme/state/theme.context";
// import Checkbox from "#components/form/checkbox/checkbox";
import PreviewHint from "#components/preview-hint/preview-hint";
import Button from "#components/button/button";
import type { ConfigFormValues } from "./config-form.types";

import s from "./config-form.module.scss";
import { defaultConfig } from "./helpers/default-config";

const themeOptions = themeList.map(({ value, label }) => ({ value, label }));

export const ConfigForm: FC<{
  defaultValues: ConfigFormValues;
  submitUrl: string;
}> = ({ defaultValues, submitUrl }) => {
  const formMethods = useForm<ConfigFormValues>({
    defaultValues,
  });
  const { setColor } = useTheme();

  const { register, control, handleSubmit, setValue } = formMethods;

  const theme = useWatch({ control, name: "Theme" });

  useEffect(() => {
    if (theme < 2) {
      setColor(theme);
    }
  }, [setColor, theme]);

  const applyChanges = useCallback(
    (values: ConfigFormValues) => {
      console.log(values);
      const params = {
        Theme: values.Theme,
        Bluetooth: values.Bluetooth ? 1 : 0,
      };
      window.location.href =
        submitUrl + encodeURIComponent(JSON.stringify(params));
    },
    [submitUrl],
  );

  const resetToDefault = useCallback(() => {
    Object.entries(defaultConfig).forEach(([name, value]) => {
      setValue(name as keyof ConfigFormValues, value);
    });
  }, [defaultValues, setValue]);

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
            <Button onClick={resetToDefault}>Reset defaults</Button>
            <Button type="submit">Apply</Button>
          </div>
        </footer>
      </form>
    </FormProvider>
  );
};

export default ConfigForm;
