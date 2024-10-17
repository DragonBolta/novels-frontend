import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
} from '@mantine/core';
import { GoogleButton, TwitterButton } from '@/features/auth/components/social-buttons.tsx';
import {loginWithEmailAndPassword, registerWithEmailAndPassword} from "@/lib/auth.ts";
import {useNavigate} from "react-router-dom";
import {notifications} from "@mantine/notifications";

export function AuthenticationForm(props: PaperProps) {
    const navigate = useNavigate();
    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            username: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
            terms: (val) => (!val ? 'You must accept the Terms of Service' : null),
        },
    });

    const handleError = (errors: typeof form.errors) => {
        if (errors.username) {
            notifications.show({ message: 'Please fill name field', color: 'red' });
        } else if (errors.email) {
            notifications.show({ message: 'Please provide a valid email', color: 'red' });
        } else if (errors.password) {
            notifications.show({ message: 'Please provide a valid password', color: 'red' });
        } else if (errors.terms) {
            notifications.show({ message: 'Please agree to the terms and conditions', color: 'red' });
        }
    };

    const submitHandler = async (values: typeof form.values) => {
        try {
            if (type === 'register') {
                // Make a POST request to your registration endpoint
                const response = await registerWithEmailAndPassword(values);

                if (response.status == 201) {
                    notifications.show({color: 'green', position: 'bottom-center', title: "Success!", message: "Successfully registered as " + values.username});
                }
                else {
                    notifications.show({color: 'red', position: 'bottom-center', title: 'Failure.', message: 'Error registering. Status code: ' + response.status});
                }

            } else {
                // Handle login if needed
                const response = await loginWithEmailAndPassword(values);

                if (response.status == 200) {
                    localStorage.setItem('access_token', response.access_token);
                    localStorage.setItem('refresh_token', response.refresh_token);
                    notifications.show({color: 'green', position: 'bottom-center', title: 'Success!', message: 'Logged in as ' + values.username});
                    navigate('/');
                }
                else {
                    notifications.show({color: 'red', position: 'bottom-center', title: 'Failure.', message: 'Error logging in. Status code: ' + response.status});
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="lg" fw={500}>
                Welcome to Novels, {type} with
            </Text>

            <Group grow mb="md" mt="md">
                <GoogleButton radius="xl" disabled>Google</GoogleButton>
                <TwitterButton radius="xl" disabled>Twitter</TwitterButton>
            </Group>

            <Divider label="Or continue with email" labelPosition="center" my="lg" />

            <form onSubmit={form.onSubmit(submitHandler, handleError)}>
                <Stack>
                    {type === 'register' && (
                        <TextInput
                            label="Username"
                            placeholder="Your username"
                            value={form.values.username}
                            onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
                            radius="md"
                        />
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="example@gmail.com"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                        radius="md"
                    />

                    {type === 'register' && (
                        <Checkbox
                            label="I accept terms and conditions"
                            checked={form.values.terms}
                            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                        />
                    )}
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                        {type === 'register'
                            ? 'Already have an account? Login'
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit" radius="xl">
                        {upperFirst(type)}
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}

export default AuthenticationForm;