import { useForm } from 'react-hook-form'
import { useToast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/services/authService.ts'
import { registerUserSchema, type RegisterUserType } from '@/validation/authSchema'

// components and types
import { CircleAlert } from 'lucide-react'
import { Undo2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx'

export default function Page() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const form = useForm<RegisterUserType>({
    resolver: zodResolver(registerUserSchema),
  })
  const { mutate } = useMutation({
    mutationKey: ['registerUser'],
    mutationFn: registerUser,
    onSuccess: () => {
      toast({ description: 'User added successfully' })
      navigate('/dashboard/users')
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: 'User not added, Something went wrong',
      })
    },
  })
  const handleSubmit = async (values: RegisterUserType) => mutate(values)

  return (
    <div>
      <div className="flex gap-2">
        <Link to="/dashboard/users">
          <Undo2 />
        </Link>
        <h1 className="text-2xl">Add User</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-4 max-w-[80rem] space-y-4 pl-8">
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">First Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Jane" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phoneNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Don't include the country code" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* IDEA: Have a group for the email and password as they are for credentials */}
            <div className="col-span-full mt-4">
              <p className="text-xs text-gray-500">Credentials</p>
              <Separator />
              <div className="mt-4 grid grid-cols-1 gap-2 lg:grid-cols-2">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="jane.doe@gmail.com" type="text" />
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
                        <Input {...field} placeholder="enter password here..." type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="col-span-full flex flex-col gap-10 lg:flex-row lg:items-center">
            <div className="mt-4 flex w-80 items-center rounded-2xl border border-gray-400 px-6 py-4">
              <CircleAlert size={25} className="w-full text-red-800" />
              <p className="flex-grow text-xs text-gray-800">
                Enter the role for the user here, please be careful on how to assign role.
                <br />
                <br />
                But remember that this can always be reversed, but{' '}
                <span className="font-bold">all damage done by the user before this is not reversible</span>
              </p>
            </div>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Assign Role</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="admin" />
                        </FormControl>
                        <FormLabel className="font-normal">Administrator</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="employee" />
                        </FormControl>
                        <FormLabel className="font-normal">Employee</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-600/90 lg:w-96">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
