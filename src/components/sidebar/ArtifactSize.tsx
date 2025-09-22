import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check, Maximize } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import sizeConfig, { type ISize, type ISizeCategory } from '@/components/sidebar/ArtifactSizeConfig';
import { Label } from '@radix-ui/react-label';

export interface IArtifactSize {
  type: 'auto' | 'custom' | string;
  title: string;
  width: number;
  height: number;
}

interface CustomSizeProps {
  artifactSize: IArtifactSize;
  onSet: (value: IArtifactSize) => void;
}

const CustomSize = ({ artifactSize, onSet }: CustomSizeProps) => {
  const [width, setWidth] = useState<number | string>('');
  const [height, setHeight] = useState<number | string>('');

  useEffect(() => {
    if (artifactSize.type === 'custom') {
      setWidth(artifactSize.width);
      setHeight(artifactSize.height);
    } else {
      setWidth('');
      setHeight('');
    }
  }, [artifactSize]);

  const setAuto = () => {
    onSet({ type: 'auto', title: 'Auto', width: 0, height: 0 });
  };

  const setCustom = () => {
    if (width && height) {
      onSet({ type: 'custom', title: 'Custom', width: Number(width), height: Number(height) });
    }
  };

  return (
    <div className='flex gap-2 items-center p-2 font-normal border-b'>
      <Label htmlFor='width'>W</Label> 
      <Input
        id="width"
        type="number"
        min={1}
        value={width}
        onChange={(e) => setWidth(e.target.value)}
        placeholder={`${artifactSize.width}`}
        className='flex-1'
      />
      <span className='text-xs opacity-50'>x</span>
      <Label htmlFor='height'>H</Label>
      <Input
        id="height"
        type="number"
        min={1}
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        placeholder={`${artifactSize.height}`}
        className='flex-1'
      />
      <Button size="icon" onClick={setCustom} disabled={!width || !height}><Check size={18} /></Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="outline" onClick={setAuto} disabled={artifactSize.type === 'auto'}><Maximize size={18} /></Button>
          </TooltipTrigger>
          <TooltipContent>Auto size</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

interface ArtifactSizeProps {
  artifactSize: IArtifactSize;
  onSizeChange: (size: IArtifactSize) => void;
  imageSize: { width: number, height: number } | null;
}

const ArtifactSize = ({ artifactSize, onSizeChange, imageSize }: ArtifactSizeProps) => {
  const [open, setOpen] = useState(false);
  console.log(artifactSize)
  console.log(imageSize)

  const handleSet = (value: IArtifactSize) => {
    setOpen(false);
    if (value.type === 'auto' && imageSize) {
      const margin = Math.round(Math.min(imageSize.width, imageSize.height) * 0.15);
      onSizeChange({ ...value, width: imageSize.width + margin, height: imageSize.height + margin });
      return;
    }
    onSizeChange(value);
  };

  const toSelected = (category: ISizeCategory, item: ISize) => {
    setOpen(false);
    onSizeChange({
      type: category.key,
      title: `${category.title}${item.title ? ` ${item.title} ` : ' '}${item.w} : ${item.h}`,
      width: item.width,
      height: item.height,
    });
  };

  const aspectRatio = artifactSize.width && artifactSize.height ? artifactSize.width / artifactSize.height : 16 / 9;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={cn('px-3 py-1.5 border shrink-0 border-border gap-3 shadow-sm overflow-hidden rounded-md hover:border-primary cursor-pointer flex items-center', open && 'shadow-md border-primary')}>
          <div className="border border-foreground/50 bg-foreground/10 w-4 rounded-sm" style={{ aspectRatio }} />
          <div className="text-xs flex-1">
            <div className="font-semibold leading-3 mb-0.5">{artifactSize.title}</div>
            <div className="text-muted-foreground leading-3">
              {artifactSize.type === 'auto' && !imageSize ? 'Adaptive screenshot size' : `${artifactSize.width} x ${artifactSize.height} px`}
            </div>
          </div>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 max-h-[70vh] overflow-y-auto">
        <CustomSize artifactSize={artifactSize} onSet={handleSet} />
        <div className="py-2">
          {sizeConfig.map(category => (
            <div key={category.key}>
              {category.key !== 'default' && <div className="font-semibold pt-2 px-4 text-sm">{category.title}</div>}
              <section className="grid grid-cols-3 p-2">
                {category.lists.map((child, index) => (
                  <Button key={index} variant="ghost" className="h-auto flex-col gap-1 p-2" onClick={() => toSelected(category, child)}>
                    <div className="py-2 px-3 w-full"><div className='border border-foreground/50 bg-foreground/10 w-full flex items-center justify-center rounded-md opacity-75' style={{ aspectRatio: child.w / child.h }}><span>{child.w} : {child.h}</span></div></div>
                    {child.title && <div className="text-xs">{child.title}</div>}
                    <div className="text-xs overflow-hidden text-muted-foreground">{child.width} x {child.height}</div>
                  </Button>
                ))}
              </section>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ArtifactSize;