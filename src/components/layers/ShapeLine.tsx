import { useEffect, useMemo } from 'react';
import { Rect, Ellipse, Line } from 'leafer-ui';
import type { IUI } from 'leafer-ui';
import { Arrow } from '@leafer-in/arrow';

export type ShapeType = 'Square' | 'Circle' | 'Line' | 'Arrow' | 'Pencil';

export interface IShape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  points?: number[];
  editable?: boolean;
  zIndex?: number;
}

interface ShapeLineProps extends IShape {
  parent: IUI;
}

const ShapeLine = ({
  parent,
  type,
  id,
  width,
  height,
  x,
  y,
  fill,
  stroke,
  strokeWidth,
  zIndex,
  points,
  editable,
}: ShapeLineProps) => {
  const shape = useMemo(() => {
    const defaultOption = { id, x, y, zIndex, editable: !!editable };

    switch (type) {
      case 'Square':
        return new Rect({
          ...defaultOption,
          width,
          height,
          stroke: stroke || '#000000',
          strokeWidth: strokeWidth || 2,
          cornerRadius: 8,
        });
      case 'Circle':
        return new Ellipse({
          ...defaultOption,
          width,
          height,
          stroke: stroke || '#000000',
          strokeWidth: strokeWidth || 2,
        });
      case 'Line':
      case 'Pencil':
        return new Line({
          id,
          points,
          zIndex,
          stroke: stroke || '#000000',
          strokeWidth: strokeWidth || 2,
          curve: type === 'Pencil', // 曲线需要插件或自定义实现
        });
      case 'Arrow':
        return new Arrow({
          id,
          points,
          zIndex,
          stroke: stroke || '#000000',
          strokeWidth: strokeWidth || 2,
        });
      default:
        // 默认返回一个矩形作为 fallback
        return new Rect({
          ...defaultOption,
          width,
          height,
          fill: fill || 'transparent',
          stroke: stroke || '#000000',
          strokeWidth: strokeWidth || 2,
        });
    }
  }, [parent]); // 依赖 parent，确保父容器存在时创建

  useEffect(() => {
    if (type === 'Line' || type === 'Arrow' || type === 'Pencil') {
      shape instanceof Line && (shape.points = points);
      shape instanceof Arrow && (shape.points = points);
    } else {
      shape.x = x;
      shape.y = y;
      shape.width = width;
      shape.height = height;
    }
    console.log(shape.toJSON());
    // ... 其他属性更新
  }, [x, y, width, height, points, shape, type]);

  useEffect(() => {
    parent.add(shape);
    return () => { shape.remove() };
  }, [parent, shape]);

  return null;
};

export default ShapeLine;