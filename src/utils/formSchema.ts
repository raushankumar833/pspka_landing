import * as Yup from 'yup';
import { checklength } from './flattenArray';

interface FormElement {
  mandatory: number;
  regex?: string;
  minLength?: number;
  maxLength?: number;
  desc: string;
  name: string;
}

export const createDynamicSchema = (formElements: any) =>
  checklength(formElements) &&
  formElements?.reduce((createdSchema: Record<string, any>, item: FormElement) => {
    let validator: any = Yup.string();
    const { mandatory, regex, minLength, maxLength, desc, name } = item;

    if (mandatory !== 0) {
      validator = validator.required(`${desc} is required`);
    }

    if (minLength) {
      validator = validator.min(minLength, `${desc} should be at least ${minLength} characters`);
    }

    if (maxLength !== 0) {
      validator = validator.max(
        maxLength,
        `${desc} cannot be greater than ${maxLength} characters`
      );
    }

    if (regex && regex !== '') {
      validator = validator.matches(new RegExp(regex), `Not a valid ${desc}`);
    }

    createdSchema[name] = validator;
    return createdSchema;
  }, {});
