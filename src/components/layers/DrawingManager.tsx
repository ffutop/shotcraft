import { useEditorStore } from '@/lib/store';
import ShapeLine from './ShapeLine';
import type { ILeafer, IUI } from 'leafer-ui';
import '@leafer-in/find';
import { useEffect, useState } from 'react';

interface DrawingManagerProps {
  app: ILeafer | null;
}

const DrawingManager = ({ app }: DrawingManagerProps) => {
  const shapes = useEditorStore((state) => state.shapes);
  const [artboard, setArtboard] = useState<IUI | null>(null);

  useEffect(() => {
    if (!app) return;
    // Find the artboard once the app is ready
    const artboardElement = app.findOne('#artboard');
    if (artboardElement) {
      setArtboard(artboardElement);
    }
    // If the artboard is added later, this effect won't re-run.
    // A more robust solution might involve a global ready state or event.
  }, [app]);

  if (!artboard) return null;

  return (
    <>
      {shapes.map((shape) => (
        <ShapeLine key={shape.id} {...shape} parent={artboard} />
      ))}
    </>
  );
};

export default DrawingManager;
