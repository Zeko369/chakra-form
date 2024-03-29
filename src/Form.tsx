import React, {
  ForwardedRef,
  forwardRef,
  PropsWithoutRef,
  ReactElement,
  ReactNode,
  useImperativeHandle,
  useState
} from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonProps,
  Flex,
  HStack,
  StackProps,
  VStack
} from '@chakra-ui/react';
import { z } from 'zod';
import ConditionalWrap from 'conditional-wrap';

type zAny = z.ZodType<any, any>;

export interface FormProps<S extends zAny>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  /** All your form fields */
  children?: ReactNode;
  /** Text to display in the submit button */
  submitText?: string;
  submitButtonProps?: ButtonProps;

  schema?: S;
  // @ts-ignore
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult> | void;
  initialValues?: UseFormProps<z.infer<S>>['defaultValues'];

  wrapProps?: StackProps;
  buttonCenter?: boolean;
  noWrap?: boolean;

  buttonsLeft?: React.ReactNode;
  buttonsRight?: React.ReactNode;

  // TODO: Document
  verbose?: boolean;
  clearOnSubmit?: boolean;
  formMode?: UseFormProps['mode'];

  disableButtonOnWrongSchema?: boolean;
}

export interface OnSubmitResult {
  FORM_ERROR?: string | null | false | React.ReactNode;
  [prop: string]: any;
}

export const FORM_ERROR = 'FORM_ERROR';
export type FormHandler<S extends zAny> = UseFormReturn<z.infer<S>>;

// TODO: Add beforeParse hook to check for verbose error
// TODO: Add print whole error
// TODO: Simpler way of getting getValues (instead of useRef)

const FormComponent = <S extends zAny>(props: FormProps<S>, ref: ForwardedRef<FormHandler<S>>) => {
  const {
    children,
    submitText,
    schema,
    initialValues,
    onSubmit,
    wrapProps,
    submitButtonProps,
    buttonCenter,
    buttonsLeft,
    buttonsRight,
    noWrap,
    formMode,
    verbose,
    disableButtonOnWrongSchema,
    clearOnSubmit,
    ...rest
  } = props;

  const ctx = useForm<z.infer<S>>({
    mode: formMode || 'onBlur',
    resolver: schema
      ? async (...args) => {
          const res = await zodResolver(schema)(...args);
          if (verbose) {
            console.log('ChakraForm: RESOLVER', res);
          }

          return res;
        }
      : undefined,
    defaultValues: initialValues
  });

  useImperativeHandle(ref, () => ({ ...ctx }));

  const [formError, setFormError] = useState<OnSubmitResult['FORM_ERROR']>(null);

  const internalOnSubmit = async (values: z.TypeOf<S>) => {
    const result = (await onSubmit(values)) || {};
    if (Object.keys(result).length === 0 && clearOnSubmit) {
      ctx.reset();
    }

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
          condition={!noWrap}
          wrap={(children) => <VStack {...wrapProps}>{children}</VStack>}
        >
          <>
            {children}

            {formError && (
              <Alert status="error" role="alert">
                <AlertIcon />
                <AlertTitle>{formError}</AlertTitle>
              </Alert>
            )}

            {submitText && (
              <ConditionalWrap
                condition={!!buttonCenter}
                wrap={(children) => (
                  <Flex w="full" justify="center">
                    {children}
                  </Flex>
                )}
              >
                <HStack>
                  {buttonsLeft}
                  <Button
                    type="submit"
                    isLoading={ctx.formState.isSubmitting}
                    isDisabled={disableButtonOnWrongSchema && !ctx.formState.isValid}
                    colorScheme="blue"
                    {...submitButtonProps}
                  >
                    {submitText}
                  </Button>
                  {buttonsRight}
                </HStack>
              </ConditionalWrap>
            )}
          </>
        </ConditionalWrap>
      </form>
    </FormProvider>
  );
};

export const Form = forwardRef(FormComponent) as <T extends zAny>(
  p: FormProps<T> & { ref?: React.Ref<FormHandler<T>> }
) => ReactElement;
