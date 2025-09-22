import { useEffect, useRef } from "react";
import { App, DragEvent, Platform, ZoomEvent, type ILeafer } from "leafer-ui";
import { ScrollBar } from '@leafer-in/scroll';
import '@leafer-in/viewport';
import '@leafer-in/editor';
import '@leafer-in/view'
import { nanoid } from "nanoid";

import Zoom from "@/components/Zoom";
import SceneManager from "@/components/layers/SceneManager";
import DrawingManager from "@/components/layers/DrawingManager"; // Import new manager
import { useEditorStore } from "@/lib/store";
import { type IShape } from "@/components/layers/ShapeLine";
import { type Tool } from "@/components/Header";

interface CanvasProps {
  activeTool: Tool | null;
  onToolSelect: (tool: Tool | null) => void;
}

const Canvas = ({
  activeTool,
  onToolSelect,
}: CanvasProps) => {
  const viewRef = useRef<HTMLDivElement>(null);
  const { app, setApp, artboard, setZoom, addShape, updateShape } = useEditorStore();
  const activeToolRef = useRef(activeTool);
  const drawingShapeRef = useRef<IShape | null>(null);

  useEffect(() => {
    activeToolRef.current = activeTool;
    if (app) {
      app.editor.config.editBox = activeTool === null;
      app.editor.config.selector = activeTool === null;
    }
  }, [activeTool]);

  // App creation and drawing logic setup
  useEffect(() => {
    if (viewRef.current && !app) {
      const leaferApp = new App({
        view: viewRef.current,
        tree: { type: 'viewport', usePartRender: true },
        sky: { type: "draw", usePartRender: true },
        editor: {
          lockRatio: 'corner',
          stroke: '#3f99f7',
          skewable: false,
          hover: false,
          middlePoint: { cornerRadius: 100, width: 20, height: 6 },
          rotatePoint: {
            width: 20,
            height: 20,
            fill: {
              type: 'image',
              url: Platform.toURL('<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="-6 -6 36 36" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>', 'svg'),
            }
          },
        },
      });
      new ScrollBar(leaferApp, {});
      setApp(leaferApp);

      // --- Drawing Logic --- 
      const onStart = (e: DragEvent) => {
        const currentTool = activeToolRef.current;
        if (!currentTool || currentTool === "Move") return;

        const artboardEl = leaferApp.findOne('#artboard');
        if (!artboardEl) return;
        const localPoint = e.getPagePoint();

        const newShape: IShape = {
          id: nanoid(),
          type: currentTool,
          x: localPoint.x,
          y: localPoint.y,
          width: 0,
          height: 0,
          stroke: "#FF0000",
          strokeWidth: 4,
          editable: true,
          points: [localPoint.x, localPoint.y],
        };
        
        drawingShapeRef.current = newShape;
        addShape(newShape);
      };

      const onDrag = (e: DragEvent) => {
        const currentTool = activeToolRef.current;
        const drawingShape = drawingShapeRef.current;
        if (!currentTool || currentTool === "Move" || !drawingShape) return;

        const artboardEl = leaferApp.findOne('#artboard');
        if (!artboardEl) return;
        const localPoint = e.getPagePoint();

        if (["Line", "Arrow", "Pencil"].includes(currentTool)) {
          const points = drawingShape.points ? [...drawingShape.points] : [];
          if (currentTool === 'Pencil') {
            points.push(localPoint.x, localPoint.y);
          } else { // Line and Arrow
            points[2] = localPoint.x;
            points[3] = localPoint.y;
          }
          const updatedShape = { ...drawingShape, points };
          drawingShapeRef.current = updatedShape;
          updateShape(updatedShape);
        } else { // Square, Circle
          const newWidth = localPoint.x - drawingShape.x;
          const newHeight = localPoint.y - drawingShape.y;
          const updatedShape = {
            ...drawingShape,
            width: Math.abs(newWidth),
            height: Math.abs(newHeight),
            x: newWidth > 0 ? drawingShape.x : localPoint.x,
            y: newHeight > 0 ? drawingShape.y : localPoint.y,
          };
          drawingShapeRef.current = updatedShape;
          updateShape(updatedShape);
        }
      };

      const onEnd = () => {
        drawingShapeRef.current = null;
        const currentTool = activeToolRef.current;
        if (currentTool && currentTool !== "Pencil") {
          onToolSelect(null);
        }
      };

      leaferApp.tree.on(DragEvent.START, onStart);
      leaferApp.tree.on(DragEvent.DRAG, onDrag);
      leaferApp.tree.on(DragEvent.END, onEnd);
    }
  }, [app, setApp, addShape, updateShape, onToolSelect]);

  // Effect for app-level setup (runs once when app is ready)
  useEffect(() => {
    if (!app) return;
    const viewWidth = (app.view as HTMLDivElement).clientWidth, viewHeight = (app.view as HTMLDivElement).clientHeight;
    const targetWidth = viewWidth * 0.8, targetHeight = viewHeight * 0.8;
    const scaleX = targetWidth / artboard.width, scaleY = targetHeight / artboard.height;
    const initialScale = Math.min(scaleX, scaleY);
    app.zoom(initialScale);
    setZoom(initialScale);
    app.tree.zoom('fit', { scroll: true });

    const handleGlobalZoom = () => { if (typeof app.tree.scale === 'number') setZoom(app.tree.scale); };
    app.on(ZoomEvent.ZOOM, handleGlobalZoom);
    return () => { app.off(ZoomEvent.ZOOM, handleGlobalZoom); };
  }, [app, artboard.width, artboard.height, setZoom]);

  // Effect for tool-based mode switching
  useEffect(() => {
    if (!app) return;
    // debugger
    // if (activeTool === 'Move') app.editor.hittable = false;
    // else app.editor.hittable = true;
  }, [app, activeTool]);

  return (
    <div ref={viewRef} className="w-full h-full bg-muted rounded-md">
      {app && <SceneManager parent={app.tree as ILeafer} />}
      {app && <DrawingManager app={app} />}
      <Zoom leafer={app} />
    </div>
  );
};

export default Canvas;
