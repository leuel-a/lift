import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AxiosResponse, AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'

// components
import {
  Form,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
} from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { ValidationError } from '@/services/apiTypes'
import logo from './assets/lift-logo.png'
import {
  loginUser,
  LoginResponseError,
  LoginResponseSuccess,
} from './services/authService'
import { LoginUserType, loginUserSchema } from './validation/authSchema'

export default function App() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const form = useForm<LoginUserType>({
    resolver: zodResolver(loginUserSchema),
  })

  const { mutate: loginUserMutation, isPending: isLoginUserPending } =
    useMutation<
      AxiosResponse<LoginResponseSuccess>,
      AxiosError<LoginResponseError>,
      LoginUserType
    >({
      mutationFn: loginUser,
      onSuccess: response => {
        const {
          data: { accessToken, refreshToken },
        } = response

        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)

        toast({
          variant: 'default',
          description: 'Login Successful',
        })

        navigate('/dashboard')
      },
      onError: error => {
        const { response } = error
        console.log(response)

        // Two different routes -> 1. validation error 2. incorrect credentials
        if (Array.isArray(response?.data.error)) {
          response.data.error.forEach((error: ValidationError) => {
            const path = error.path.split('.')[1]

            form.setError(path as 'email' | 'password', {
              message: error.message,
            })
          })
        } else {
          form.setError('root', { message: response?.data.error.message })
        }
      },
    })

  const handleSubmit = (value: LoginUserType) => {
    loginUserMutation({
      email: value.email,
      password: value.password,
    })
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center font-epilogue text-rich-black">
      <div className="mb-6 w-16 rounded-full">
        <img src={logo} alt="" className="rounded-full" />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6 px-8 md:max-w-[32rem]"
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="h-10"
                    placeholder="leuel.asfaw@gmail.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="h-10"
                    placeholder="enter your password here"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <div className="text-sm text-red-500">
              {form.formState.errors.root.message}
            </div>
          )}
          <Button disabled={isLoginUserPending} className="h-10 w-full">
            Login
          </Button>
          <p className="text-center text-sm text-yinmn-blue">
            Please contact your Administrator for any assistance
          </p>
        </form>
      </Form>
    </div>
  )
}
