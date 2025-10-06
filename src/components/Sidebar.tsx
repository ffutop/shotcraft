import { useState, useMemo } from 'react';
import {
  ChevronRight,
  Download,
  Copy,
  Crop,
  Settings2,
  Trash2,
  FlipHorizontal,
  FlipVertical,
} from 'lucide-react';
import '@leafer-in/export';
import { useEditorStore } from '@/lib/store'; // Import the store
import backgroundConfig from '@/components/sidebar/backgroundConfig';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import ArtifactSize from '@/components/sidebar/ArtifactSize';
import MockupSelector from '@/components/sidebar/MockupSelector';
import BackgroundSelect from './sidebar/BackgroundSelect';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SegmentedControl, SegmentedControlItem, SegmentedControlList } from '@/components/ui/segmented-control';
import { toDownloadFile } from '@/lib/utils';
import CropDialog from '@/components/CropDialog';
import { toast } from 'sonner';

// No more props needed!
const Sidebar = () => {
  // Get all necessary state and actions from the store
  const {
    artboard,
    mockup,
    contentScale,
    updateArtboard,
    setArtboardBackground,
    setContentScale,
    setCroppedContent,
    flipContent,
    app,
    content,
    destroy,
  } = useEditorStore();

  const [loading, setLoading] = useState(false);
  const [exportFormat, setExportFormat] = useState('png');
  const [exportRatio, setExportRatio] = useState(1);

  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const handleDownload = async () => {
    if (!app || loading) return;

    setLoading(true);
    const toastId = toast.loading('Downloading...', {
      description: 'Your image is being prepared.',
    });

    try {
      const option: any = { pixelRatio: exportRatio };
      if (['jpg', 'webp'].includes(exportFormat)) {
        option.quality = 0.9;
        option.fill = '#ffffff'; // Set a white background for opaque formats
      }

      const artboardElement = app.findOne('#artboard');
      if (!artboardElement) {
        throw new Error('Artboard element not found.');
      }

      const result = artboardElement.syncExport(exportFormat, option);
      let name = `shotcraft`;
      if (exportRatio > 1) name += `@${exportRatio}x`;
      toDownloadFile(result.data, `${name}.${exportFormat}`);

      toast.success('Download Success!', {
        id: toastId,
        description: 'Your image has been downloaded.',
      });
    } catch (error) {
      console.error('Download failed', error);
      toast.error('Download Failed!', {
        id: toastId,
        description: 'Something went wrong.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!app || loading) return;

    setLoading(true);
    const toastId = toast.loading('Copying to clipboard...');

    const artboardElement = app.findOne('#artboard');
    if (!artboardElement) {
      throw new Error('Artboard element not found.');
    }

    artboardElement.export('png', { blob: true, pixelRatio: exportRatio }).then((result) => {
      navigator.clipboard.write([
        new ClipboardItem({
          [result.data.type]: result.data,
        }),
      ]);
      toast.success('Copied to clipboard!', {
        id: toastId,
        description: 'You can now paste the image.',
      });
    }).catch((error) => {
      console.error('Copy failed', error);
      toast.error('Copy Failed!', {
        id: toastId,
        description: 'Could not copy image to clipboard.',
      });
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleCropComplete = (croppedImage: string) => {
    // Use the new action to only update the displayed src
    setCroppedContent(croppedImage);
    setIsCropDialogOpen(false);
  };

  const cropAspect = useMemo(() => {
    if (mockup) {
      return mockup.contentArea.width / mockup.contentArea.height;
    }
    if (artboard.width > 0 && artboard.height > 0) {
      return artboard.width / artboard.height;
    }
    return 16 / 9; // Default fallback
  }, [mockup, artboard.width, artboard.height]);

  const [showMoreBackgrounds, setShowMoreBackgrounds] = useState(false);

  return (
    <>
    <aside className="w-[340px] border-l flex flex-col bg-background shadow-lg select-none">
      <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
        {/* SizeBar - Now driven by the store */}
        {/* Background Placeholder */}
        <div>
          <div className='flex justify-between items-center'>
            <Label className="font-semibold text-sm">Artifact Size</Label>
          </div>
          <div className='py-3'>
            <ArtifactSize
              artifactSize={{ width: artboard.width, height: artboard.height, type: 'custom', title: 'Custom' }}
              onSizeChange={(size) => updateArtboard({ width: size.width, height: size.height })}
              imageSize={null} // This prop seems disconnected from the new arch, can be reviewed later
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <Label className="font-semibold text-sm">Background</Label>
            <Button variant="link" size="sm" className="text-xs h-auto p-0" onClick={() => setShowMoreBackgrounds(!showMoreBackgrounds)}>
              More <ChevronRight size={16} className={`transition-transform ${showMoreBackgrounds ? 'rotate-90' : ''}`} />
            </Button>
          </div>
          <div className="py-3">
            {/* Always show recent backgrounds */}
            <BackgroundSelect
              type="default"
              value={artboard.backgroundKey}
              onChange={(key) => {
                const config = backgroundConfig[key];
                if (config) {
                  setArtboardBackground(key, config.fill);
                }
              }} />
          </div>
          <div className={showMoreBackgrounds ? 'block' : 'hidden'}>
            {/* Show tabs when 'More' is expanded */}
            <Tabs defaultValue="solid" className="pt-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="solid">Solid</TabsTrigger>
                <TabsTrigger value="gradient">Gradient</TabsTrigger>
              </TabsList>
              <TabsContent value="solid" className="pt-3">
                <BackgroundSelect
                  type="solid"
                  value={artboard.backgroundKey}
                  onChange={(key) => {
                    const config = backgroundConfig[key];
                    if (config) {
                      setArtboardBackground(key, config.fill);
                    }
                  }}
                />
              </TabsContent>
              <TabsContent value="gradient" className="pt-3">
                <BackgroundSelect
                  type="gradient"
                  value={artboard.backgroundKey}
                  onChange={(key) => {
                    const config = backgroundConfig[key];
                    if (config) {
                      setArtboardBackground(key, config.fill);
                    }
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div>
          <div className='flex justify-between items-center'>
            <Label className="font-semibold text-sm">Mockup</Label>
          </div>
          <div className='py-3'>
            <MockupSelector />
          </div>
        </div>


        {/* Quick Tools */}
        <div>
          <Label className="font-semibold text-sm">Quick</Label>
          <div className="flex gap-4 items-center py-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setIsCropDialogOpen(true)} disabled={!content}>
                    <Crop size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Crop Image</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* Connect flip buttons to the store action */}
                  <Button variant="ghost" size="icon" onClick={() => flipContent('horizontal')} disabled={!content}>
                    <FlipHorizontal size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Flip Horizontal</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => flipContent('vertical')} disabled={!content}>
                    <FlipVertical size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Flip Vertical</TooltipContent>
              </Tooltip>
              {/* <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <LayoutGrid size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Position</TooltipContent>
              </Tooltip> */}
            </TooltipProvider>
          </div>
        </div>

        {/* Sliders - All driven by the store */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="scale" className="font-semibold text-sm">Scale</Label>
            <Slider id="scale" value={[contentScale]} onValueChange={([v]) => setContentScale(v)} max={3} min={0.1} step={0.1} />
          </div>
          {/* <div className="grid gap-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="padding" className="font-semibold text-sm">Padding</Label>
              <div className="w-5 h-5 rounded-sm bg-card border" />
            </div>
            <Slider id="padding" value={[artboard.padding]} onValueChange={([v]) => updateArtboard({ padding: v })} max={100} step={1} />
          </div> */}
          <div className="grid gap-2">
            <Label htmlFor="round" className="font-semibold text-sm">Rounded</Label>
            <Slider id="round" value={[artboard.cornerRadius]} onValueChange={([v]) => updateArtboard({ cornerRadius: v })} max={100} step={1} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="shadow" className="font-semibold text-sm">Shadow</Label>
            <Slider id="shadow" value={[artboard.shadow]} onValueChange={([v]) => updateArtboard({ shadow: v })} max={20} step={1} />
          </div>
        </div>

        {/* Watermark Placeholder */}
        {/* <div>
          <div className="flex justify-between items-center">
            <Label className="font-semibold text-sm">Watermark</Label>
          </div>
        </div> */}
      </div>

      {/* DownloadBar */}
      <div className="shrink-0 py-4 px-6 flex gap-2 justify-center items-center border-t">
        <TooltipProvider>
          <div className="flex flex-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="lg" className="flex-1 rounded-r-none" onClick={handleDownload} disabled={!app || loading}>
                  <Download size={18} className="mr-2" />
                  <div className='leading-4 text-left'>
                    <div className='text-sm leading-4 font-semibold'>Download</div>
                    <div className='text-xs'>{exportRatio}x as {exportFormat.toUpperCase()}</div>
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download Image</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="lg" className="rounded-l-none border-l-2 border-primary-foreground/20" onClick={handleCopy} disabled={!app || loading}>
                  <Copy size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy to Clipboard</TooltipContent>
            </Tooltip>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button size="lg" variant="outline"><Settings2 size={18} /></Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Export Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Customize the output of your image.
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label className="text-sm">Format</Label>
                  <SegmentedControl value={exportFormat} onValueChange={setExportFormat}>
                    <SegmentedControlList>
                      <SegmentedControlItem value="png">PNG</SegmentedControlItem>
                      <SegmentedControlItem value="jpg">JPG</SegmentedControlItem>
                      <SegmentedControlItem value="webp">WEBP</SegmentedControlItem>
                    </SegmentedControlList>
                  </SegmentedControl>
                  <Label className="text-sm mt-2">Pixel Ratio</Label>
                  <SegmentedControl value={String(exportRatio)} onValueChange={(v) => setExportRatio(Number(v))}>
                    <SegmentedControlList>
                      <SegmentedControlItem value="1">1x</SegmentedControlItem>
                      <SegmentedControlItem value="2">2x</SegmentedControlItem>
                      <SegmentedControlItem value="3">3x</SegmentedControlItem>
                    </SegmentedControlList>
                  </SegmentedControl>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {content?.src && <Button size="lg" variant="outline" onClick={destroy}><Trash2 size={18} /></Button>}
        </TooltipProvider>
      </div>
    </aside>
    {isCropDialogOpen && content && (
      <CropDialog
        src={content.originalSrc}
        aspect={cropAspect}
        onCropComplete={handleCropComplete}
        onClose={() => setIsCropDialogOpen(false)}
      />
    )}
    </>
  );
};

export default Sidebar;
