import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimatedContainer } from './styles';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail is mandatory!')
            .email('Type a valid e-mail!'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'Password recovery',
          description:
            'An e-mail has been sent to confirm the password recovery.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errorsFound = getValidationErrors(err);

          formRef.current?.setErrors(errorsFound);

          return;
        }

        addToast({
          type: 'error',
          title: 'Password Recovery Error',
          description: 'Error while recovering password, try again.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimatedContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Password Recovery</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Button loading={loading} type="submit">
              Recover password
            </Button>
          </Form>

          <Link to="/">
            <FiLogIn />
            Back to Sign In
          </Link>
        </AnimatedContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
