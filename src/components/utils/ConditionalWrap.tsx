import React from 'react';

// TODO: Extract || use Kitze package
export interface CondWrapProps {
  val: boolean | undefined | null | number | string;
  Wrap: (children: React.ReactNode | null | undefined) => JSX.Element | null;
}

export const ConditionalWrap: React.FC<CondWrapProps> = ({ val, Wrap, children }) => {
  if (!!val) {
    return Wrap(children);
  }

  return <>{children}</>;
};
