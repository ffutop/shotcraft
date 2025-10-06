import {
  Circle,
  Hand,
  MoveDownLeft,
  Sun,
  Moon,
  Pencil,
  Slash,
  Square,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTheme } from './theme-provider';
import { type ReactElement } from 'react';

export type Tool = 'Square' | 'Circle' | 'Line' | 'Arrow' | 'Pencil' | 'Move';

const toolList: { name: Tool; icon: ReactElement; tooltip: string }[] = [
  { name: 'Square', icon: <Square size={16} />, tooltip: 'Square' },
  { name: 'Circle', icon: <Circle size={16} />, tooltip: 'Circle' },
  { name: 'Line', icon: <Slash size={16} />, tooltip: 'Line' },
  { name: 'Arrow', icon: <MoveDownLeft size={16} />, tooltip: 'Arrow' },
  { name: 'Pencil', icon: <Pencil size={16} />, tooltip: 'Pencil' },
];

interface HeaderProps {
  activeTool: Tool | null;
  onToolSelect: (tool: Tool) => void;
}

function Header({ activeTool, onToolSelect }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="flex items-center justify-center shrink-0 gap-3 bg-background py-2 px-5 border-b shadow-sm relative z-10 select-none">
      <div className="flex-1 flex items-center gap-2">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo/logo-color.svg" alt="ShotCraft Logo" className="w-8 h-8" />
        </a>
        <h1 className="text-md font-bold">ShotCraft</h1>
      </div>

      {/* 工具栏 */}
      <TooltipProvider delayDuration={200}>
        <div className="flex gap-1 justify-center items-center">
          {toolList.map(({ name, icon, tooltip }) => (
            <Tooltip key={name}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={activeTool === name ? 'bg-accent text-accent-foreground' : ''}
                  onClick={() => onToolSelect(name)}
                >
                  {icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>

      <Separator orientation="vertical" className="h-6" />

      {/* 移动工具 */}
      <TooltipProvider delayDuration={200}>
        <div className="flex gap-1 justify-center items-center">
          {/* TODO: 实现颜色选择器和线条宽度下拉菜单 */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={activeTool === 'Move' ? 'bg-accent text-accent-foreground' : ''}
                onClick={() => onToolSelect('Move')}
              >
                <Hand size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Move Canvas</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

      <div className="flex-1 flex justify-end">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle Theme</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle Theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
}

export default Header;