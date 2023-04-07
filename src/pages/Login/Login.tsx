import {
  BackgroundImage,
  Box,
  Button,
  Card,
  Center,
  Grid,
  Image,
  MediaQuery,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock } from '@tabler/icons-react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { authActions } from '../../reducers/auth/auth.action';
import { useNavigate } from 'react-router-dom';
import { LoginValues } from '../../reducers/auth/auth.types';
import { FormEventHandler } from 'react';
import { FormEvent } from 'react';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = (value: LoginValues) => {
    console.log(value);
    dispatch(
      authActions.Login(
        {
          username: value.username,
          password: value.password,
        },
        navigate
      )
    );
  };

  return (
    <Grid style={{ height: '100vh' }} align="center" justify="center">
      <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
        <Grid.Col p={0} md={7}>
          <BackgroundImage
            src={
              'https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
            }
          >
            <Box
              sx={{
                minHeight: '100vh',
                maxHeight: '100vh',
              }}
            ></Box>
          </BackgroundImage>
        </Grid.Col>
      </MediaQuery>
      <Grid.Col xs={12} md={5}>
        <Stack spacing="xs">
          <Text align="center" fw="700" fz={28}>
            ĐĂNG NHẬP
          </Text>
          <Text align="center" color="dimmed" fz="xl">
            Chào mừng quay trở lại. Đăng nhập để tiếp tục
          </Text>
          <Center mt="sm">
            <Card shadow="md" w={360}>
              <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Stack>
                  <TextInput
                    label="Tên đăng nhập"
                    placeholder="Nhập tên tài khoản"
                    {...form.getInputProps('username')}
                  />
                  <TextInput
                    label="Mật khẩu"
                    type="password"
                    icon={<IconLock size={14} />}
                    {...form.getInputProps('password')}
                  />
                  <Button variant="filled" fullWidth type="submit">
                    Đăng nhập
                  </Button>
                </Stack>
              </form>
            </Card>
          </Center>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default Login;
