import { create } from 'zustand';
import type { App as LeaferApp, Image as LeaferImage, IFill } from 'leafer-ui';
import { type IShape } from '@/components/layers/ShapeLine';

// --- Types ---

export interface Artboard {
  width: number;
  height: number;
  background: string | IFill;
  backgroundKey: string;
  padding: number;
  cornerRadius: number;
  shadow: number;
}

export interface Mockup {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  contentArea: {
    x: number;
    y: number;
    width: number;
    height: number;
    cornerRadius: number | number[];
  };
}

export interface Content {
  src: string;
  originalSrc: string;
  element?: LeaferImage;
}

// --- Store ---

interface EditorState {
  artboard: Artboard;
  mockup: Mockup | null;
  content: Content | null;
  contentScale: number;
  contentFlip: { horizontal: boolean; vertical: boolean };
  shapes: IShape[];
  zoom: number;
  exportMultiplier: number;
  app: LeaferApp | null;
  destroy: () => void;

  // Actions
  updateArtboard: (config: Partial<Artboard>) => void; 
  setArtboardBackground: (key: string, fill: IFill) => void;
  setMockup: (mockup: Mockup | null) => void;
  setContent: (content: { src: string, originalSrc?: string } | null) => void;
  setContentScale: (scale: number) => void;
  setCroppedContent: (croppedSrc: string) => void;
  flipContent: (direction: 'horizontal' | 'vertical') => void;
  addShape: (shape: IShape) => void;
  updateShape: (shape: Partial<IShape> & { id: string }) => void;
  clearShapes: () => void;
  setZoom: (zoom: number) => void;
  setExportMultiplier: (multiplier: number) => void;
  setApp: (app: LeaferApp) => void;
}
export const useEditorStore = create<EditorState>((set, get) => ({
  // Initial State
  artboard: {
    width: 1920,
    height: 1080,
    background: { type: 'linear', stops: [{ offset: 0, color: '#6366f1' }, { offset: 0.5, color: '#a855f7' }, { offset: 1, color: '#ec4899' }] },
    backgroundKey: 'default_1',
    padding: 20,
    cornerRadius: 10,
    shadow: 3,
  },
  mockup: null,
  content: null,
  contentScale: 0.8,
  contentFlip: { horizontal: false, vertical: false },
  shapes: [],
  zoom: 1,
  exportMultiplier: 1,
  app: null,

  // Actions
  updateArtboard: (config) =>
    set((state) => ({ artboard: { ...state.artboard, ...config } })),
  setArtboardBackground: (key, fill) =>
    set((state) => {
      // Add to recent list, avoid duplicates, and keep it at a certain length
      return {
        artboard: {
          ...state.artboard,
          backgroundKey: key,
          background: fill,
        },
      };
    }),
  setMockup: (mockup) => set({ mockup }),
  setContent: (newContent) => {
    if (newContent === null) {
      set({ content: null });
    } else {
      set({
        content: {
          src: newContent.src,
          originalSrc: newContent.originalSrc || newContent.src,
        }
      });
    }
  },
  setContentScale: (scale) => set({ contentScale: scale }),
  setCroppedContent: (croppedSrc) => set((state) => {
    if (!state.content) return {};
    return { content: { ...state.content, src: croppedSrc } };
  }),
  flipContent: (direction) =>
    set((state) => ({
      contentFlip: {
        ...state.contentFlip,
        [direction]: !state.contentFlip[direction],
      },
    })),
  addShape: (shape) => set((state) => ({ shapes: [...state.shapes, shape] })),
  updateShape: (updatedShape) =>
    set((state) => ({
      shapes: state.shapes.map((shape) =>
        shape.id === updatedShape.id ? { ...shape, ...updatedShape } : shape
      ),
    })),
  clearShapes: () => set({ shapes: [] }),
  setZoom: (zoom) => set({ zoom }),
  setExportMultiplier: (multiplier) => set({ exportMultiplier: multiplier }),
  setApp: (app) => set({ app }),
  destroy: () =>
    set((state) => {
      state.app?.destroy();
      return { content: null, app: null, shapes: [] };
    }),
}));