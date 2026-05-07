import { FormProvider, useForm, useWatch } from "react-hook-form";
import { themeList } from "#features/theme/config/theme-list";
import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { useTheme } from "#features/theme/state/theme.context";
// import Checkbox from "#components/form/checkbox/checkbox";
import PreviewHint from "#components/preview-hint/preview-hint";
import Button from "#components/button/button";
import type { ConfigFormValues } from "./config-form.types";
import { defaultConfig } from "./helpers/default-config";
import RadioThemebox from "#components/form/radio-themebox/radio-themebox";

import s from "./config-form.module.scss";

export const ConfigForm: FC<{
  defaultValues: ConfigFormValues;
  bw?: boolean;
  submitUrl: string;
}> = ({ defaultValues, bw, submitUrl }) => {
  const formMethods = useForm<ConfigFormValues>({
    defaultValues: defaultConfig,
  });
  const { setColor } = useTheme();
  const [initialised, setInitialised] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty },
  } = formMethods;

  const theme = useWatch({ control, name: "Theme" });

  const themeOptions = useMemo(
    () =>
      themeList
        .filter((option) => !bw || option.bw)
        .map(({ value, label, className, altClassName }) => ({
          value,
          label,
          theme: className,
          themeAlt: altClassName,
        })),
    [],
  );

  useEffect(() => {
    if (initialised) {
      return;
    }
    setInitialised(true);
    Object.keys(defaultConfig).forEach((n) => {
      const name = n as keyof ConfigFormValues;
      const value = defaultValues[name];
      setValue(name, name === "Theme" ? String(value) : value);
    });
  }, []);

  useEffect(() => {
    const numTheme = Number(theme);
    if (!Number.isNaN(numTheme) && numTheme < themeList.length) {
      if (bw && (numTheme < 2 || numTheme > 3)) {
        // fix b&w to 2 and 3
        setValue("Theme", String((numTheme % 2) + 2));
        setColor((numTheme % 2) + 2);
        return;
      }
      setColor(numTheme);
    }
  }, [setColor, theme]);

  const applyChanges = useCallback(
    (values: ConfigFormValues) => {
      const params = {
        Theme: values.Theme && Number(values.Theme),
        Bluetooth: values.Bluetooth ? 1 : 0,
      };
      window.location.href =
        submitUrl + encodeURIComponent(JSON.stringify(params));
    },
    [submitUrl],
  );

  const resetToDefault = useCallback(() => {
    reset();
  }, [reset]);

  const close = useCallback(() => {
    window.location.href = submitUrl;
  }, []);

  return (
    <FormProvider {...formMethods}>
      <form className={s.form} onSubmit={handleSubmit(applyChanges)}>
        <PreviewHint />
        <div className={s.fields}>
          {/*<Select
            options={themeOptions}
            {...register("Theme", { valueAsNumber: true })}
            label="Theme"
          />*/}
          <RadioThemebox
            label="Theme"
            options={themeOptions}
            radioProps={register("Theme")}
          />
          {/*<Checkbox {...register("Bluetooth")} label="Show bluetooth" />*/}
        </div>
        <footer className={s.footer}>
          <div className={s.footerbuttons}>
            <div className={s.footerbuttongroup}>
              <Button onClick={close}>Close</Button>
              {isDirty && (
                <Button onClick={resetToDefault}>Reset defaults</Button>
              )}
            </div>
            <Button type="submit">Apply</Button>
          </div>
        </footer>
      </form>
    </FormProvider>
  );
};

export default ConfigForm;
