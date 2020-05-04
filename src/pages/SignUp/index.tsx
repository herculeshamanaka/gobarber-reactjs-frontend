import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background, AnimatedContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Name is mandatory!'),
        email: Yup.string()
          .required('E-mail is mandatory!')
          .email('Type a valid e-mail!'),
        password: Yup.string().min(6, 'Password must have at least 6 digits!'),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      const errorsFound = getValidationErrors(err);

      formRef.current?.setErrors(errorsFound);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <AnimatedContainer>
          <img src={logoImg} alt="GoBarber" />
          {/* initialData={{ name: 'Hercules' }} */}
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Signing up</h1>
            <Input name="name" icon={FiUser} placeholder="Name" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />
            <Button type="submit">Sign Up</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Back to Login
          </Link>
        </AnimatedContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
