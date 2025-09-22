import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import backgroundConfig, { type BackgroundOption } from '@/components/sidebar/backgroundConfig';
import { cn } from '@/lib/utils';

interface BackgroundSelectProps {
  type: 'default' | 'solid' | 'gradient' | 'recent';
  onChange: (value: string) => void;
  value: string;
}

const BackgroundSelect = ({ type, onChange, value }: BackgroundSelectProps) => {

  const lists: { key: string; value: BackgroundOption }[] =
    Object.entries(backgroundConfig)
          .filter(([key]) => key.startsWith(type))
          .map(([key, value]) => ({ key, value }));

  return (
    <RadioGroup
      onValueChange={onChange}
      value={value}
      className={cn(
        'grid gap-y-3',
        'grid-cols-7' // Consistent grid layout
      )}
    >
      {lists.map((item) => (
        <div key={item.key} className="relative flex items-center justify-center">
          <RadioGroupItem
            value={item.key}
            id={item.key}
            className="w-8 h-8 rounded-full border-2 data-[state=checked]:border-primary"
          />
          <label
            htmlFor={item.key}
            className={cn(
              'absolute w-[26px] h-[26px] rounded-full overflow-hidden cursor-pointer',
              item.value.class
            )}
          ></label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default BackgroundSelect;