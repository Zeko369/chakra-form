import React from 'react';
import { NextPage } from 'next';
import { Heading, VStack, Button, Code } from '@chakra-ui/react';
import { useUNSTABLE_Alert } from 'chakra-confirm';
import { z } from 'zod';

import {
  CheckboxField,
  Form,
  InputField,
  ReactSelectField,
  SelectField,
  TextAreaField,
  ToggleField
} from '../../dist';

const options = [
  { value: 'fe', label: 'Front end' },
  { value: 'be', label: 'Back end' },
  { value: 'ui', label: 'UI/UX' },
  { value: 'fs', label: 'Full stack' }
];

const languages = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'py', label: 'Python' },
  { value: 'rb', label: 'Ruby' },
  { value: 'php', label: 'PHP' },
  { value: 'java', label: 'Java' },
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'swift', label: 'Swift' },
  { value: 'scala', label: 'Scala' },
  { value: 'go', label: 'Go' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'groovy', label: 'Groovy' },
  { value: 'scala', label: 'Scala' },
  { value: 'perl', label: 'Perl' },
  { value: 'r', label: 'R' },
  { value: 'rust', label: 'Rust' },
  { value: 'elixir', label: 'Elixir' },
  { value: 'haskell', label: 'Haskell' },
  { value: 'clojure', label: 'Clojure' },
  { value: 'lua', label: 'Lua' }
];

const schema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  bio: z.string().min(1),
  age: z
    .number()
    .min(18)
    .max(100),
  job: z.string(),
  favLanguages: z.array(z.string()).nonempty(),
  isSingle: z.string(),
  interestedInLibrary: z.boolean(),
  interestedInLibrary2: z.boolean()
});

const Home: NextPage = () => {
  const alert = useUNSTABLE_Alert();

  return (
    <Form
      schema={schema}
      onSubmit={(data) => {
        alert({
          title: 'Submitted data',
          body: (
            <Code whiteSpace="pre" w="full">
              {JSON.stringify(data, null, 2)}
            </Code>
          )
        });
      }}
      initialValues={{
        name: 'Foo',
        surname: 'Bar',
        email: 'foo@bar.com',
        age: 21,
        bio: 'Foooooo',
        password: 'password',
        job: 'fs',
        isSingle: 'fs',
        favLanguages: ['js', 'ts'],
        interestedInLibrary: true
      }}
    >
      <VStack w="50%" mt="2" align="flex-start">
        <Heading>Form</Heading>

        <InputField name="name" />
        <InputField name="surname" />
        <InputField name="email" />
        <InputField name="age" type="number" />

        <InputField name="password" />

        <TextAreaField name="bio" />

        <SelectField name="job" defaultValue="">
          <option disabled value="">
            Select job
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>

        <ReactSelectField
          name="favLanguages"
          options={languages}
          reactSelectProps={{
            id: 'fav-lang-id',
            instanceId: 'fav-lang-id'
          }}
        />

        <ReactSelectField
          isSingle
          name="isSingle"
          options={options}
          reactSelectProps={{
            id: 'single-id',
            instanceId: 'single-id'
          }}
        />

        <CheckboxField name="interestedInLibrary" label="Are you interested in this library" />

        <ToggleField name="interestedInLibrary2" label="Are you sure?" />

        <Button type="submit">Submit</Button>
      </VStack>
    </Form>
  );
};

export default Home;
