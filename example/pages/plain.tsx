import React from 'react';
import { Form, SelectField } from '../../dist';

const Page: React.FC = () => {
  return (
    <Form onSubmit={console.log} submitText="submit">
      <SelectField name="button">
        <option value="pero">Pero</option>
        <option value="slavko">Slavko</option>
        <option value="marko">Marko</option>
      </SelectField>
    </Form>
  );
};

export default Page;
