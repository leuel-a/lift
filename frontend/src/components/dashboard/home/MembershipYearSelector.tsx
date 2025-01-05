import { Select, SelectValue, SelectContent, SelectTrigger, SelectItem } from '@/components/ui/select'

export default function MembershipYearSelector() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select Year" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"2024"}>2024</SelectItem>
      </SelectContent>
    </Select>
  )
}
