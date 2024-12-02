import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx'
import { useToast } from '@/hooks/use-toast.ts'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { loginUserSchema, LoginUserType } from '@/validation/authSchema.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { LoginResponseError, LoginResponseSuccess, loginUser } from '@/services/authService.ts'
import { ValidationError } from '@/services/apiTypes.ts'

export default function LoginForm() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const form = useForm<LoginUserType>({
    resolver: zodResolver(loginUserSchema),
  })

  const { mutate: loginUserMutation, isPending: isLoginUserPending } = useMutation<
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-6 px-8 md:max-w-[32rem]">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="text" className="h-10" placeholder="leuel.asfaw@gmail.com" />
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
                <Input {...field} type="password" className="h-10" placeholder="enter your password here" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && <div className="text-sm text-red-500">{form.formState.errors.root.message}</div>}
        <Button disabled={isLoginUserPending} className="h-10 w-full bg-indigo-600 hover:bg-indigo-600/90">
          Login
        </Button>
        {/*<p className="text-center text-sm text-gray-500">Please contact your Administrator for any assistance</p>*/}
      </form>
    </Form>
  )
}
