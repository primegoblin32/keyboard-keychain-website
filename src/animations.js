
export const ANIMATION_ONE_VIDEOS = [
  'animation-01-clips/clip-01.mp4',
  'animation-01-clips/clip-02.mp4',
  'animation-01-clips/clip-03.mp4',
]

export const animations = [
  {
    id: 1,
    title: 'Animation 01',
    type: 'image',
    image: 'animation-01.png',
    hasVideo: true,
  },

  ...Array.from({ length: 24 }, (_, index) => {
    const number = String(index + 2).padStart(2, '0')

    return {
      id: index + 2,
      title: `Animation ${number}`,
      type: 'image',
      image: `animation-${number}.png`,
    }
  }),
]

export const GRID_SIZE = 5
