import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { useStore } from '@/state/store';


export default function FieldOptions() {

    const { fields, setFields } = useStore();
    const fieldOptions = ["Asin", "Url"];

    const toggleField = (field: string) => {
        if (fields.includes(field)) {
          setFields(fields.filter((f) => f !== field));
        } else {
          setFields([...fields, field]);
        }
      };
    
      const toggleSelectAll = () => {
        if (fields.length === fieldOptions.length) {
          setFields([]);
        } else {
          setFields([...fieldOptions]);
        }
      };
    
  return (
    <Popover >
    <PopoverTrigger className="w-40" asChild>
      <Button className="w-40" variant="outline">Select fields</Button>
    </PopoverTrigger>
    <PopoverContent className="w-40">
      <div className='flex m-1 gap-2 justify-start'>
        <Checkbox
          checked={fields.length === fieldOptions.length}
          onCheckedChange={toggleSelectAll}
        />
        <Label htmlFor="select-all">Select All</Label>
      </div>
      {
        fieldOptions.map((f) => (
          <div className='flex m-1 gap-2 justify-start ' key={f}>
            <Checkbox
              checked={fields.includes(f)}
              onCheckedChange={() => toggleField(f)}
            />
            <Label htmlFor={f}>{f}</Label>
          </div>
        ))
      }
    </PopoverContent>
  </Popover>
  )
}
