export interface IRegistrationState {
  isLoading: boolean;
  error: Error | string | null;
  status: string;
  message: string;
  steps: IRegistrationSteps[];
}

export interface IRegistrationSteps {
  id: number;
  stepName: string;
  params: IRegistrationParam[];
}

export interface IRegistrationParam {
  id: number;
  name: string;
  label: string;
  regex?: string;
  visibility: boolean;
  placeholder: string;
  hint?: any;
  required: boolean;
}
