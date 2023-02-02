export interface YoutubeItem {
  snippet: {
    thumbnail: {
      url: string;
    };
  };
}

const list: Array<YoutubeItem> = [
  {
    snippet: {
      thumbnail: {
        url: "fff",
      },
    },
  },
];
