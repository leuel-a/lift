import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useToast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { registerUserSchema, type RegisterUserType } from '@/validation/authSchema'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Undo2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/services/authService.ts'

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
            {/* IDEA: Have a group for the email and password as they are for credentials */}
          </div>
          <div>
            <Button className="w-96 bg-indigo-600 hover:bg-indigo-600/90">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
