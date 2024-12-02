import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { useToast } from '@/hooks/use-toast'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { addMember } from '@/services/membersService'
import { zodResolver } from '@hookform/resolvers/zod'
import { createMemberSchema, CreateMemberType } from '@/validation/memberSchema'

//region component imports
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon, Undo2 } from 'lucide-react'
//endregion

export default function Page() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const form = useForm<CreateMemberType>({
    resolver: zodResolver(createMemberSchema),
  })
  const { mutate } = useMutation({
    mutationFn: addMember,
    onSuccess: () => {
      toast({ description: 'Member added successfully' })
      navigate('/dashboard/members')
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: 'Member not added, Something went wrong',
      })
    },
  })
  const handleSubmit = async (values: CreateMemberType) => mutate(values)
  return (
    <div className="">
      <div className="flex gap-2">
        <Link to="/dashboard/members">
          <Undo2 />
        </Link>
        <h1 className="text-2xl">Add Member</h1>
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
                    <Input {...field} type="text" className="" placeholder="Leuel" />
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
                  <FormLabel className="font-normal">Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" className="" placeholder="Gebreselassie" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" className="" placeholder="leuel.gebreselassie@gmail.com" />
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
                  <FormLabel className="font-normal">Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="membershipType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Membership Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Membership Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="membershipStartDate"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0.5 pt-2">
                  <FormLabel className="font-normal">Membership Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button className="w-96 bg-indigo-600 hover:bg-indigo-700/90">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
