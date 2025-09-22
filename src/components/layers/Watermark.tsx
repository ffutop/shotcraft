import { useEffect, useMemo } from 'react';
import { Rect } from 'leafer-ui';
import type { IUI } from 'leafer-ui';

interface WatermarkProps {
  parent: IUI;
  svg: string;
  width: number;
  height: number;
  zIndex?: number;
}

const Watermark = ({ parent, svg, width, height, zIndex }: WatermarkProps) => {
  const rect = useMemo(() => new Rect(), [parent]);

  useEffect(() => {
    rect.width = width;
    rect.height = height;
    rect.zIndex = zIndex || 100; // 确保水印在顶层
    rect.fill = {
      type: 'image',
      url: svg,
      mode: 'repeat',
      format: 'svg',
      size: Math.round(width / 6), // 与 image-beautifier 保持一致
    };
  }, [rect, svg, width, height, zIndex]);

  useEffect(() => {
    parent.add(rect);
    return () => { rect.remove() };
  }, [parent, rect]);

  return null;
};

export default Watermark;