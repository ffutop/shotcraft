import { type Mockup } from '@/lib/store';

export type IMockupItem = Omit<Mockup, 'name'>;

export interface IMockupCategory {
  key: string;
  title: string;
  lists: IMockupItem[];
}

// 注意: 此处的 width, height, contentArea 数据是根据通用设备模型估算的，你可能需要根据你的图片资源进行精确调整。
const mockupConfig: IMockupCategory[] = [
  {
    key: 'phone',
    title: 'Phone',
    lists: [
      {
        id: 'iPhone 17',
        url: '/iPhone 17/iPhone 17 - Black.png',
        width: 1350,
        height: 2760,
        contentArea: { x: 72, y: 69, width: 1206, height: 2622, cornerRadius: 100 },
      },
      {
        id: 'iPhone 17 Pro',
        url: '/iPhone 17 Pro/iPhone 17 Pro - Cosmic Orange.png',
        width: 1350,
        height: 2760,
        contentArea: { x: 72, y: 69, width: 1206, height: 2622, cornerRadius: 100 },
      },
    ],
  },
  {
    key: 'tablet',
    title: 'Tablet',
    lists: [
      {
        id: 'iPad Pro 11-inch',
        url: '/iPad Pro/iPad Pro 11 - M4 - Space Gray.png',
        width: 1880,
        height: 2640,
        contentArea: { x: 106, y: 110, width: 1668, height: 2420, cornerRadius: 0 },
      },
      {
        id: 'iPad Pro 13-inch',
        url: '/iPad Pro/iPad Pro 13 - M4 - Space Gray.png',
        width: 2300,
        height: 3000,
        contentArea: { x: 118, y: 124, width: 2064, height: 2752, cornerRadius: 0 },
      },
      {
        id: 'iPad Air 11-inch',
        url: '/iPad Air/iPad Air 11" - M2 - Space Gray.png',
        width: 1900,
        height: 2620,
        contentArea: { x: 130, y: 130, width: 1640, height: 2360, cornerRadius: 0 },
      },
      {
        id: 'iPad Air 13-inch',
        url: '/iPad Air/iPad Air 13" - M2 - Space Gray.png',
        width: 2300,
        height: 2980,
        contentArea: { x: 118, y: 114, width: 2064, height: 2752, cornerRadius: 0 },
      },
      {
        id: 'iPad',
        url: '/iPad/iPad - Silver.png',
        width: 1840,
        height: 2660,
        contentArea: { x: 100, y: 160, width: 1640, height: 2360, cornerRadius: 0 },
      },
      {
        id: 'iPad mini',
        url: '/iPad mini/iPad mini - Starlight.png',
        width: 1780,
        height: 2550,
        contentArea: { x: 146, y: 142, width: 1488, height: 2266, cornerRadius: 0 },
      }
    ],
  },
  {
    key: 'laptop',
    title: 'Laptop',
    lists: [
      {
        id: 'MacBook Pro 14-inch',
        url: '/MacBook Pro/MacBook Pro M4 14-inch Silver.png',
        width: 3944,
        height: 2564,
        contentArea: { x: 460, y: 300, width: 3024, height: 1964, cornerRadius: 0 },
      },
      {
        id: 'MacBook Pro 16-inch',
        url: '/MacBook Pro/MacBook Pro M4 16-inch Silver.png',
        width: 4340,
        height: 2860,
        contentArea: { x: 442, y: 313, width: 3456, height: 2234, cornerRadius: 0 },
      },
      {
        id: 'MacBook Air',
        url: '/MacBook Air/MacBook Air 13" - M4 - Midnight.png',
        width: 3220,
        height: 2100,
        contentArea: { x: 330, y: 218, width: 2560, height: 1664, cornerRadius: 0 },
      },
      {
        id: 'iMac',
        url: '/iMac/iMac 24" - Silver.png',
        width: 4760,
        height: 4040,
        contentArea: { x: 140, y: 160, width: 4480, height: 2520, cornerRadius: 0 },
      }
    ],
  },
  {
    key: 'watch',
    title: 'Watch',
    lists: [
      {
        id: 'Apple Watch',
        url: '/Apple Watch/AW Ultra 3 - Black.png',
        width: 600,
        height: 960,
        contentArea: { x: 89, y: 223, width: 422, height: 514, cornerRadius: 0 },
      },
      {
        id: 'Apple Watch',
        url: '/Apple Watch/AW Ultra 3 - Natural.png',
        width: 600,
        height: 960,
        contentArea: { x: 89, y: 223, width: 422, height: 514, cornerRadius: 0 },
      }
    ],
  }
];

export default mockupConfig;
