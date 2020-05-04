import { ValidationError } from 'yup';

interface ErrorsFound {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): ErrorsFound {
  const validationErrors: ErrorsFound = {};

  err.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
