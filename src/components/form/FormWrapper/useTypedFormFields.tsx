import { FieldValues, useFormContext } from 'react-hook-form';
import { FormInput } from '../FormInput';
import { FormSelect } from '../FormSelect';
import { FormCheckbox } from '../FormCheckbox';
import { FormRadioGroup } from '../FormRadioGroup';
import { FormTextarea } from '../FormTextArea';
import { FormNumberInput } from '../FormNumberInput';

export function useTypedFormFields<T extends FieldValues>() {
  const context = useFormContext<T>();
  if (!context) {
    throw new Error('useTypedFormFields must be used within a FormWrapper');
  }
  return {
    FormInput: FormInput<T>,
    FormSelect: FormSelect<T>,
    FormCheckbox: FormCheckbox<T>,
    FormRadioGroup: FormRadioGroup<T>,
    FormTextarea: FormTextarea<T>,
    FormNumberInput: FormNumberInput<T>,
  };
}
