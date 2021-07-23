import { Alert, AlertIcon, AlertTitle, Button, Flex, StackProps, VStack } from '@chakra-ui/react';
import React, {
  ForwardedRef,
  forwardRef,
  PropsWithoutRef,
  ReactElement,
  ReactNode,
  useImperativeHandle,
  useState
} from 'react';
import { FormProvider, useForm, UseFormMethods, UseFormOptions } from 'react-hook-form';
import { z } from 'zod';
import { ConditionalWrap } from './components/utils/ConditionalWrap';

type zAny = z.ZodType<any, any>;

export interface FormProps<S extends zAny>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  /** All your form fields */
  children?: ReactNode;
  /** Text to display in the submit button */
  submitText?: string;
  schema?: S;
  // @ts-ignore
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult> | void;
  initialValues?: UseFormOptions<z.infer<S>>['defaultValues'];

  wrapProps?: StackProps;
  buttonCenter?: boolean;
  noWrap?: boolean;
}

interface OnSubmitResult {
  FORM_ERROR?: string;
  [prop: string]: any;
}

export const FORM_ERROR = 'FORM_ERROR';
export type FormHandler<S extends zAny> = UseFormMethods<z.infer<S>>;

const FormComponent = <S extends zAny>(props: FormProps<S>, ref: ForwardedRef<FormHandler<S>>) => {
  const {
    children,
    submitText,
    schema,
    initialValues,
    onSubmit,
    wrapProps,
    buttonCenter,
    noWrap,
    ...rest
  } = props;

  const ctx = useForm<z.infer<S>>({
    mode: 'onBlur',
    // @ts-ignore
    resolver: (values) => {
      // console.log(values);
      if (schema) {
        const res = schema.safeParse(values);

        console.log(values);

        if (res.success === false) {
          console.log(res.error.formErrors.formErrors);
          console.log(JSON.stringify(res.error.formErrors.fieldErrors, null, 2));
          return { values: {}, errors: res.error.formErrors?.fieldErrors };
        }
      }
      return { values, errors: {} };
    },
    defaultValues: initialValues
  });

  useImperativeHandle(ref, () => ({ ...ctx }));

  const [formError, setFormError] = useState<string | null>(null);

  const internalOnSubmit = async (values: z.TypeOf<S>) => {
    const result = (await onSubmit(values)) || {};
    for (const [key, value] of Object.entries(result)) {
      if (key === FORM_ERROR) {
        setFormError(value);
      } else {
        ctx.setError(key as any, {
          type: 'submit',
          message: value
        });
      }
    }
  };

  return (
    <FormProvider {...ctx}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          ctx.handleSubmit(async (values) => {
            setFormError(null);
            await internalOnSubmit(values);
          })(e);
        }}
        style={{ width: '100%' }}
        {...rest}
      >
        <ConditionalWrap
          val={!noWrap}
          Wrap={(children) => <VStack {...wrapProps}>{children}</VStack>}
        >
          {children}

          {formError && (
            <Alert status="error" role="alert">
              <AlertIcon />
              <AlertTitle>{formError}</AlertTitle>
            </Alert>
          )}

          {submitText && (
            <ConditionalWrap
              val={buttonCenter}
              Wrap={(children) => (
                <Flex w="full" justify="center">
                  {children}
                </Flex>
              )}
            >
              <Button type="submit" disabled={ctx.formState.isSubmitting}>
                {submitText}
              </Button>
            </ConditionalWrap>
          )}
        </ConditionalWrap>
      </form>
    </FormProvider>
  );
};

export const Form = forwardRef(FormComponent) as <T extends zAny>(
  p: FormProps<T> & { ref?: React.Ref<FormHandler<T>> }
) => ReactElement;
