import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/lib/utils';

interface SegmentedControlContextProps {
  value: string;
  onValueChange: (value: string) => void;
}

const SegmentedControlContext = React.createContext<SegmentedControlContextProps | null>(null);

const SegmentedControl = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  const contextValue = React.useMemo(() => ({
    value: props.value || '',
    onValueChange: props.onValueChange || (() => {}),
  }), [props.value, props.onValueChange]);

  return (
    <SegmentedControlContext.Provider value={contextValue}>
      <RadioGroupPrimitive.Root
        ref={ref}
        className={cn('grid grid-flow-col auto-cols-fr gap-1', className)}
        {...props}
      />
    </SegmentedControlContext.Provider>
  );
});
SegmentedControl.displayName = 'SegmentedControl';

const SegmentedControlList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
      className
    )}
    {...props}
  />
));
SegmentedControlList.displayName = 'SegmentedControlList';

const SegmentedControlItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, value, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      value={value}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        'data-[state=checked]:bg-background data-[state=checked]:text-foreground data-[state=checked]:shadow-sm',
        className
      )}
      {...props}
    />
  );
});
SegmentedControlItem.displayName = RadioGroupPrimitive.Item.displayName;

const SegmentedControlTrigger = SegmentedControlItem;

export {
  SegmentedControl,
  SegmentedControlList,
  SegmentedControlItem,
  SegmentedControlTrigger,
};