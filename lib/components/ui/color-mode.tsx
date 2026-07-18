import * as React from "react";

export type ColorModeProviderProps = React.PropsWithChildren;

export function ColorModeProvider(props: ColorModeProviderProps) {
  return <>{props.children}</>;
}
