import { useCallback } from 'react';
import { App as LeaferApp } from 'leafer-ui';
import '@leafer-in/view'
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { useEditorStore } from '@/lib/store';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ZoomProps {
  leafer: LeaferApp | null;
}

const zoomLevels = [0.5, 1, 1.5, 2];

const Zoom = ({ leafer }: ZoomProps) => {
  // 1. Get state and actions from the global store
  const { zoom, setZoom } = useEditorStore();

  const handleZoomAction = useCallback((level: number | 'in' | 'out') => {
    if (!leafer) return;
    leafer.tree.zoom(level);
    setTimeout(() => {
      if (typeof leafer.tree.scale === 'number') {
        setZoom(leafer.tree.scale);
      }
    }, 50);
  }, [leafer, setZoom]);

  const fitZoom = useCallback(() => {
    if (!leafer) return;
    const { width: viewWidth = 0, height: viewHeight = 0 } = leafer.tree;

    const paddingX = 0.10 * viewWidth;
    const paddingY = 0.10 * viewHeight;
    const padding = Math.min(paddingX, paddingY);
    leafer.tree.zoom('fit', { padding });

    setTimeout(() => {
      if (typeof leafer.tree.scale === 'number') {
        setZoom(leafer.tree.scale);
      }
    }, 50);
  }, [leafer])

  if (!leafer) return null;

  const scalePercent = Math.round(zoom * 100);

  return (
    <div className="absolute z-10 bottom-4 right-4 flex items-center gap-2">
      <div className="flex bg-card rounded-full shadow-md overflow-hidden border">
        <Button variant="ghost" size="icon" onClick={() => handleZoomAction('in')}>
          <ZoomIn size={16} />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-20">{scalePercent}%</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            {zoomLevels.map((level) => (
              <DropdownMenuItem key={level} onSelect={() => handleZoomAction(level)}>
                {level * 100}%
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" onClick={() => handleZoomAction('out')}>
          <ZoomOut size={16} />
        </Button>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full bg-card border shadow-md" onClick={fitZoom}>
              <Maximize size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent><p>Fit to screen</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Zoom;