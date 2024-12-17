import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '@/app/services/axiosInstance';
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
} from '../app/style/loginStyle';

interface LoginResponse {
    access_token: string;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', { email, password });
      if (response.data?.access_token) {
        localStorage.setItem('token', response.data.access_token);
        alert('Login successful');
        router.push('/upload');
      } else {
        alert('Login failed: No token received');
      }
    } catch (error) {
      alert('Invalid credentials');
    }
  };
  

  return (
    <Container>
      <GlobalStyle/>
      <Title>Login</Title>
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
          <Text>Haven&apos;t registered yet?</Text>
          <Text1 onClick={() => router.push('/register')}>Click here</Text1>
        </ContainerText>
      <LoginButton onClick={handleLogin}>Login</LoginButton>
    </Container>
  );
}
