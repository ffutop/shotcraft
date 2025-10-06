import { useState, useCallback, useEffect, useRef } from 'react';
import Cropper, { type Area } from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { getCroppedImg } from '@/lib/cropImage'; // We will create this helper
import { Lock, Unlock } from 'lucide-react';

interface CropDialogProps {
  src: string;
  aspect: number;
  onCropComplete: (croppedImage: string) => void;
  onClose: () => void;
}

const CropDialog = ({ src, aspect: initialAspect, onCropComplete, onClose }: CropDialogProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [aspect, setAspect] = useState<number | undefined>(initialAspect);
  const imageRef = useRef(new window.Image());

  useEffect(() => {
    const img = imageRef.current;
    img.src = src;
  }, [src]);

  const onCropCompleteInternal = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleApplyCrop = async () => {
    if (!croppedAreaPixels || !imageRef.current.src) return;
    try {
      const img = imageRef.current;
      const croppedImage = await getCroppedImg(
        src,
        croppedAreaPixels,
        img.naturalWidth,
        img.naturalHeight
      );
      if (croppedImage) {
        onCropComplete(croppedImage);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleAspect = () => {
    setAspect(aspect ? undefined : initialAspect);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Crop Image</h2>
        </div>
        <div className="flex-1 relative bg-muted">
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteInternal}
          />
        </div>
        <div className="p-4 border-t flex flex-col gap-4">
          <div className="grid grid-cols-[auto_1fr] items-center gap-4">
            <label className="text-sm">Zoom</label>
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(value) => setZoom(value[0])}
            />
          </div>
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={toggleAspect} className="flex items-center gap-2">
              {aspect ? <Lock size={16} /> : <Unlock size={16} />}
              {aspect ? 'Lock Aspect Ratio' : 'Free Aspect Ratio'}
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
              <Button onClick={handleApplyCrop}>Apply</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDialog;