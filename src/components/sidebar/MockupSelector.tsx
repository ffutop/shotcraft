import { useState } from 'react';
import { ChevronDown, ChevronUp, Laptop, Smartphone, Tablet, Monitor, Watch } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useEditorStore, type Mockup } from '@/lib/store';
import mockupConfig, { type IMockupCategory, type IMockupItem } from './MockupConfig';
import MockupItem from './MockupItem';
import { cn } from '@/lib/utils';

const categoryIcons: Record<IMockupCategory['key'], React.ReactElement> = {
  phone: <Smartphone size={20} />,
  tablet: <Tablet size={20} />,
  laptop: <Laptop size={20} />,
  desktop: <Monitor size={20} />,
  watch: <Watch size={20} />,
};

const MockupSelector = () => {
  const [open, setOpen] = useState(false);
  const { mockup: selectedMockup, setMockup } = useEditorStore();

  const handleSelect = (item: IMockupItem) => {
    setOpen(false);
    const newMockup: Mockup = {
      ...item,
      name: item.id,
    };
    setMockup(newMockup);
  };

  const handleClear = () => {
    setOpen(false);
    setMockup(null);
  };

  const TriggerIcon = selectedMockup ? categoryIcons[mockupConfig.find(c => c.lists.some(l => l.id === selectedMockup.id))?.key || 'desktop'] : <Monitor size={20} />;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={cn('px-3 py-1.5 border shrink-0 border-border gap-3 shadow-sm overflow-hidden rounded-md hover:border-primary cursor-pointer flex items-center', open && 'shadow-md border-primary')}>
          <div className="w-6 flex items-center justify-center text-muted-foreground">
            {TriggerIcon}
          </div>
          <div className="text-xs flex-1">
            <div className="font-semibold leading-3 mb-0.5">{selectedMockup?.name || 'None'}</div>
            <div className="text-muted-foreground leading-3">
              {selectedMockup ? `${selectedMockup.width} x ${selectedMockup.height} px` : 'No device mockup'}
            </div>
          </div>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 max-h-[70vh] overflow-y-auto">
        <div className="p-2 border-b">
          <Button variant={!selectedMockup ? 'secondary' : 'ghost'} onClick={handleClear} className="w-full justify-start">
            No Mockup
          </Button>
        </div>
        <div className="py-2">
          {mockupConfig.map(category => (
            <div key={category.key}>
              <div className="font-semibold pt-2 px-4 text-sm flex items-center gap-2 text-muted-foreground">
                {categoryIcons[category.key]} {category.title}
              </div>
              <section className="grid grid-cols-3 p-2">
                {category.lists.map((item) => (
                  <MockupItem key={item.id} item={item} onSelect={handleSelect} />
                ))}
              </section>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MockupSelector;
