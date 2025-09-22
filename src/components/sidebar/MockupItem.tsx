import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/lib/store';
import type { IMockupItem } from './MockupConfig';

interface MockupItemProps {
  item: IMockupItem;
  onSelect: (item: IMockupItem) => void;
}

const MockupItem = ({ item, onSelect }: MockupItemProps) => {
  const selectedMockupId = useEditorStore((state) => state.mockup?.id);

  return (
    <Button
      variant={selectedMockupId === item.id ? 'secondary' : 'ghost'}
      className="h-auto flex-col gap-1 p-2"
      onClick={() => onSelect(item)}
    >
      <div className="py-2 px-3 w-full">
        <img src={item.url} alt={item.id} className="w-full h-auto object-contain" />
      </div>
      <div className="text-xs">{item.id}</div>
    </Button>
  );
};

export default MockupItem;
