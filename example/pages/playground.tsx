import React from 'react';
import { NextPage } from 'next';
import { z } from 'zod';

import { Form, InputField, SelectField } from '../../dist';

enum Gender {
  male = 'male',
  female = 'female'
}

export const schema = z.object({
  index: z
    .number()
    .int()
    .positive(),
  year: z
    .number()
    .int()
    .positive(),
  gender: z.nativeEnum(Gender),
  email: z.string().optional(), // make this z.string().email()
  phoneNumber: z.string().optional(),

  immunizations: z.array(
    z.object({
      id: z.string(),
      typeId: z.string(),
      date: z.date()
    })
  )
});

type FormType = z.infer<typeof schema>;
const PlaygroundPage: NextPage = () => {
  const data: any = undefined;

  const onSubmit = (data: FormType) => {
    console.log(data);
  };

  return (
    <Form
      schema={schema}
      initialValues={{
        gender: Gender.male,
        ...data,
        email: data?.user.email,
        phoneNumber: data?.user.phoneNumber || undefined,
        immunizations:
          data?.immunizations.map((i: any) => ({ id: i.id, typeId: i.typeId, date: i.date })) || []
      }}
      onSubmit={onSubmit}
      submitText={data?.id ? 'Update' : 'Create'}
    >
      <InputField name="index" isRequired type="number" />
      <InputField name="year" isRequired label="Year of birth" type="number" />

      <SelectField name="gender">
        <option value={Gender.male}>Male</option>
        <option value={Gender.female}>Female</option>
      </SelectField>

      <InputField name="email" />
      <InputField name="phoneNumber" label="Phone Number" type="tel" />

      {/* <ImmunizationTypesSelect /> */}
    </Form>
  );
};

export default PlaygroundPage;
