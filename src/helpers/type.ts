const allowed_types = [
  'text',
  'password',
  'current_password',
  'confirm_password',
  'email',
  'number'
] as const;

export type AllowedTypes = typeof allowed_types[number];

export function isSpecifiedType(name: string): name is AllowedTypes {
  return (allowed_types as any).includes(name);
}

export const resoleType = (name: string) => {
  if (isSpecifiedType(name)) {
    if (name === 'confirm_password' || name === 'current_password') {
      return 'password';
    }

    return name;
  }

  return 'text';
};
