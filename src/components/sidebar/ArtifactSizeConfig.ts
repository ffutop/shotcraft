export interface ISize {
  width: number;
  height: number;
  w: number;
  h: number;
  title?: string;
}

export interface ISizeCategory {
  key: string;
  title: string;
  lists: ISize[];
}

const sizeConfig: ISizeCategory[] = [
  {
    key: 'default',
    title: 'Default',
    lists: [
      {
        title: 'Landscape',
        width: 1920,
        height: 1080,
        w: 16,
        h: 9,
      },
      {
        title: 'Portrait',
        width: 1080,
        height: 1350,
        w: 4,
        h: 5,
      },
      {
        title: 'Square',
        width: 1080,
        height: 1080,
        w: 1,
        h: 1,
      },
      {
        title: 'Story',
        width: 1080,
        height: 1920,
        w: 9,
        h: 16,
      },
      {
        title: 'Widescreen',
        width: 1280,
        height: 720,
        w: 16,
        h: 9,
      },
      {
        title: 'Standard',
        width: 1200,
        height: 900,
        w: 4,
        h: 3,
      },
      {
        title: 'Classic Photo',
        width: 1200,
        height: 800,
        w: 3,
        h: 2,
      },
    ],
  },
  {
    key: 'instagram',
    title: 'Instagram',
    lists: [
      {
        title: 'Square Post',
        width: 1080,
        height: 1080,
        w: 1,
        h: 1,
      },
      {
        title: 'Portrait Post',
        width: 1080,
        height: 1350,
        w: 4,
        h: 5,
      },
      {
        title: 'Landscape Post',
        width: 1080,
        height: 566,
        w: 1.91,
        h: 1,
      },
      {
        title: 'Story / Reel',
        width: 1080,
        height: 1920,
        w: 9,
        h: 16,
      },
    ],
  },
  {
    key: 'x',
    title: 'X (Twitter)',
    lists: [
      {
        title: 'Photo Card',
        width: 1200,
        height: 628,
        w: 1.91,
        h: 1,
      },
      {
        title: 'Banner',
        width: 1500,
        height: 500,
        w: 3,
        h: 1,
      },
    ],
  },
  {
    key: 'youtube',
    title: 'YouTube',
    lists: [
      {
        title: 'Thumbnail / Video',
        width: 1280,
        height: 720,
        w: 16,
        h: 9,
      },
      {
        title: 'Banner',
        width: 1500,
        height: 500,
        w: 3,
        h: 1,
      },
      {
        title: 'Shorts',
        width: 1080,
        height: 1920,
        w: 9,
        h: 16,
      },
    ],
  },
  {
    key: 'facebook',
    title: 'Facebook',
    lists: [
      {
        title: 'Post',
        width: 1200,
        height: 630,
        w: 1.91,
        h: 1,
      },
      {
        title: 'Story',
        width: 1080,
        height: 1920,
        w: 9,
        h: 16,
      },
      {
        title: 'Cover Photo',
        width: 851,
        height: 315,
        w: 2.7,
        h: 1,
      },
    ],
  },
  {
    key: 'linkedin',
    title: 'LinkedIn',
    lists: [
      {
        title: 'Post Image',
        width: 1200,
        height: 627,
        w: 1.91,
        h: 1,
      },
      {
        title: 'Cover Image',
        width: 1584,
        height: 396,
        w: 4,
        h: 1,
      },
    ],
  },
];

export default sizeConfig;