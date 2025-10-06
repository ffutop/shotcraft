import { useState, useEffect } from 'react';
import Header, { type Tool } from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Canvas from '@/components/Canvas';
import Init from '@/components/Init';
import { Toaster } from '@/components/ui/sonner';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/lib/store';

function App() {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  const { content, setContent, updateArtboard } = useEditorStore();

  const { theme } = useTheme();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const imageUrl = urlParams.get('img');

    if (imageUrl) {
      // 触发图片上传处理函数
      handleImageUpload(imageUrl);
    }
  }, []); // 空依赖数组确保此 effect 仅在组件挂载时运行一次

  const handleImageUpload = (src: string) => {
    setContent({ src });

    // Perform the logic that was in the useEffect to calculate auto artboard size
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      const naturalSize = { width: img.naturalWidth, height: img.naturalHeight };
      updateArtboard({
        width: naturalSize.width,
        height: naturalSize.height,
      });
    };
  };

  const handleToolSelect = (tool: Tool | null) => {
    setActiveTool((prevTool) => (prevTool === tool ? null : tool));
  };

  return (
    <div className={cn('flex flex-col h-screen w-screen overflow-hidden antialiased bg-background text-foreground', theme)}>
      <Header activeTool={activeTool} onToolSelect={handleToolSelect} />
      <div className="flex flex-1 h-0">
        <main className="flex-1 flex items-center justify-center bg-muted">
          {content ? (
            <Canvas
              activeTool={activeTool}
              onToolSelect={handleToolSelect}
            />
          ) : <Init onImageUpload={handleImageUpload} />}
        </main>
        <Sidebar />
        <Toaster position='top-right' />
      </div>
    </div>
  );
}

export default App;