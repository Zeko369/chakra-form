import React from 'react';
import { NextPage } from 'next';
import { Button } from '@chakra-ui/button';
import { z } from 'zod';
import { Heading, VStack } from '@chakra-ui/react';

import {
  CheckboxField,
  Form,
  InputField,
  TextAreaField,
  SelectField,
  ReactSelectField
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
  interestedInLibrary: z.boolean()
});

const Home: NextPage = () => {
  return (
    <Form
      schema={schema}
      onSubmit={(data) => {
        console.log(data);
      }}
      initialValues={{
        name: 'Foo',
        surname: 'Bar',
        email: 'foo@bar.com',
        age: 21,
        bio: 'Foooooo',
        password: 'password',
        job: 'fs',
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

        <CheckboxField name="interestedInLibrary" label="Are you interested in this library" />

        <Button type="submit">Submit</Button>
      </VStack>
    </Form>
  );
};

export default Home;
