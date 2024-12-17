import api from '@/app/services/axiosInstance';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { 
  Container, 
  ContainerInputs, 
  ContainerText, 
  GlobalStyle, 
  Input,
  LoginButton,
  Text,
  Text1,
  TextInput,
  Title 
} from '../app/style/registerStyle';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', { email, password });
      router.push('/login');
      alert('Registration successful');
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <Container>
      <GlobalStyle/>
      <Title>Register</Title>
      <ContainerInputs>
        <TextInput>E-mail</TextInput>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        <TextInput>Password</TextInput>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </ContainerInputs>
      <ContainerText>
          <Text>Already registered?</Text>
          <Text1 onClick={() => router.push('/login')}>Login</Text1>
        </ContainerText>
      <LoginButton onClick={handleRegister}>Register</LoginButton>
    </Container>
  );
}
