import { useEffect, useMemo, useState } from 'react';
import { Image, Box, ImageEvent } from 'leafer-ui';
import type { ILeafer } from 'leafer-ui';
import { useEditorStore } from '@/lib/store';

interface SceneManagerProps {
  parent: ILeafer;
}

const SceneManager = ({ parent }: SceneManagerProps) => {
  const { artboard, mockup, content, contentScale, contentFlip } = useEditorStore();
  const [imageReadyFlag, setImageReadyFlag] = useState(0);

  const artboardBox = useMemo(() => new Box({ id: 'artboard', strokeAlign: 'outside', overflow: 'hide' }), []);
  const mockupContainer = useMemo(() => new Box({ id: 'mockup-container', overflow: 'hide' }), []);
  const mockupImage = useMemo(() => new Image({ id: 'mockup-image', zIndex: 2 }), []);
  const contentImage = useMemo(() => new Image({ id: 'content-image', editable: false }), []);

  useEffect(() => {
    if (!parent) return;

    mockupContainer.add(contentImage);
    mockupContainer.add(mockupImage);
    artboardBox.add(mockupContainer);
    parent.add(artboardBox);

    return () => {
      parent.remove(artboardBox);
    };
  }, [parent, artboardBox, mockupContainer, contentImage]);
  
  useEffect(() => {
    // 更新 artboardBox
    artboardBox.width = artboard.width;
    artboardBox.height = artboard.height;
    artboardBox.fill = artboard.background;
    artboardBox.cornerRadius = artboard.cornerRadius;
    if (artboard.shadow > 0) {
      artboardBox.shadow = { x: artboard.shadow * 2, y: artboard.shadow * 4, blur: artboard.shadow * 3, color: '#00000045' };
    } else {
      artboardBox.shadow = undefined;
    }

    // 更新 contentImage
    contentImage.url = content?.src || '';

    const applyContentLayout = (imageWidth: number, imageHeight: number) => {
      const padding = artboard.padding * 2;
      const availableWidth = artboard.width - padding;
      const availableHeight = artboard.height - padding;

      const fitScale = Math.min(availableWidth / imageWidth, availableHeight / imageHeight);
      const finalScale = fitScale * contentScale;

      contentImage.scaleX = (contentFlip.horizontal ? -1 : 1) * finalScale;
      contentImage.scaleY = (contentFlip.vertical ? -1 : 1) * finalScale;
      contentImage.x = (artboard.width - imageWidth * finalScale) / 2 + (contentFlip.horizontal ? imageWidth * finalScale : 0);
      contentImage.y = (artboard.height - imageHeight * finalScale) / 2 + (contentFlip.vertical ? imageHeight * finalScale : 0);
    };

    const applyMockupLayout = (mockupWidth: number, mockupHeight: number) => {
      const padding = artboard.padding * 2;
      const availableWidth = artboard.width - padding;
      const availableHeight = artboard.height - padding;

      const fitScale = Math.min(availableWidth / mockupWidth, availableHeight / mockupHeight);
      const finalScale = fitScale * contentScale;

      mockupContainer.scale = finalScale;
      mockupContainer.x = (artboard.width - mockupWidth * finalScale) / 2;
      mockupContainer.y = (artboard.height - mockupHeight * finalScale) / 2;
    }

    if (mockup) {
      // --- 有模型的情况 ---
      mockupContainer.width = mockup.width;
      mockupContainer.height = mockup.height;
      mockupContainer.fill = undefined;
      mockupContainer.visible = true;

      mockupImage.url = mockup.url;
      mockupImage.width = mockup.width;
      mockupImage.height = mockup.height;

      contentImage.x = mockup.contentArea.x + (contentFlip.horizontal ? mockup.contentArea.width : 0);
      contentImage.y = mockup.contentArea.y + (contentFlip.vertical ? mockup.contentArea.height : 0);
      contentImage.width = mockup.contentArea.width;
      contentImage.height = mockup.contentArea.height;
      contentImage.cornerRadius = mockup.contentArea.cornerRadius;
      contentImage.scaleX = contentFlip.horizontal ? -1 : 1;
      contentImage.scaleY = contentFlip.vertical ? -1 : 1;

      applyMockupLayout(mockup.width, mockup.height);
    } else {
      // --- 无模型的情况 ---
      mockupContainer.fill = undefined;
      // 隐藏 mockupImage
      mockupImage.url = '';
      mockupImage.width = 0;
      mockupImage.height = 0;
      mockupContainer.width = artboard.width;
      mockupContainer.height = artboard.height;
      mockupContainer.scale = 1;
      mockupContainer.x = 0;
      mockupContainer.y = 0;
      mockupContainer.visible = true;
      if (contentImage.ready) {
        applyContentLayout(contentImage.width || 100, contentImage.height || 100);
      } else {
        contentImage.once(ImageEvent.LOADED, () => {
          setImageReadyFlag(flag => flag + 1);
        });
      }
    }
  }, [artboard, mockup, content, contentScale, contentFlip, imageReadyFlag]);

  return null;
};

export default SceneManager;