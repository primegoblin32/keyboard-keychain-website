
import { useEffect, useRef, useState } from 'react'
import { ANIMATION_ONE_VIDEOS, animations, GRID_SIZE } from './animations.js'

const VIDEO_FOLDER = `${import.meta.env.BASE_URL}videos/`
const IMAGE_FOLDER = `${import.meta.env.BASE_URL}images/`
const SOUNDS = Array.from({ length: 15 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0')
  return `${import.meta.env.BASE_URL}sounds/click-${number}.mp3`
})

function chooseRandomVideo() {
  const videos = ANIMATION_ONE_VIDEOS
  return videos[Math.floor(Math.random() * videos.length)]
}

function playRandomSound() {
  const randomIndex = Math.floor(Math.random() * SOUNDS.length)
  const sound = new Audio(SOUNDS[randomIndex])

  sound.play().catch((error) => {
    console.error('Sound playback failed:', error)
  })
}

export default function App() {
  const [row, setRow] = useState(0)
  const [column, setColumn] = useState(0)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mediaError, setMediaError] = useState(false)

  const videoRef = useRef(null)
  const previousIndexRef = useRef(0)

  const currentIndex = row * GRID_SIZE + column
  const current = animations[currentIndex]

  const imageSrc = `${IMAGE_FOLDER}${current.image}`

  const videoSrc = selectedVideo
    ? `${VIDEO_FOLDER}${selectedVideo}`
    : null

  // Reset Animation 1 whenever the visitor returns to it.
  useEffect(() => {
    if (currentIndex === 0 && previousIndexRef.current !== 0) {
      setSelectedVideo(null)
      setIsPlaying(false)
      setMediaError(false)
    }

    previousIndexRef.current = currentIndex
  }, [currentIndex])

  // Start the selected video.
  useEffect(() => {
    if (!isPlaying || !videoSrc) return

    const video = videoRef.current
    if (!video) return

    video.play().catch(() => {
      setMediaError(true)
      setIsPlaying(false)
    })
  }, [isPlaying, videoSrc])

  function toggleVideo() {
    if (isPlaying) {
      setIsPlaying(false)
      setSelectedVideo(null)
      return
    }

  setMediaError(false)
  setSelectedVideo(chooseRandomVideo())
  setIsPlaying(true)
}

  function moveColumn(direction) {
    setColumn((value) => (value + direction + GRID_SIZE) % GRID_SIZE)
  }

  function moveRow(direction) {
    setRow((value) => (value + direction + GRID_SIZE) % GRID_SIZE)
  }

  if (animations.length !== GRID_SIZE * GRID_SIZE) {
    return <main className="empty-state">The gallery must contain exactly 25 items.</main>
  }

  return (
    <main className="page">
      <section className="gallery" aria-label="Animation gallery">

        <div className="nav-stack" aria-label="Previous navigation">
          <button
            className="nav-arrow"
            type="button"
            onClick={() => {
              playRandomSound()
              moveRow(-1)
            }}
            aria-label="Previous vertical position"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            className="nav-arrow"
            type="button"
            onClick={() => {
              playRandomSound()
              moveColumn(-1)
            }}
            aria-label="Previous vertical position"
          >
            <span aria-hidden="true">←</span>
          </button>
        </div>

        <div className="stage">
          {currentIndex === 0 && isPlaying ? (
            <video
              ref={videoRef}
              key={videoSrc}
              className="animation"
              src={videoSrc}
              playsInline
              preload="auto"
              loop
              onError={() => {
                setMediaError(true)
                setIsPlaying(false)
              }}
            />
          ) : (
            <img
              key={imageSrc}
              className="animation"
              src={imageSrc}
              alt={current.title}
              onError={() => setMediaError(true)}
            />
          )}
          {mediaError && (
            <div className="message">
              {currentIndex === 0
                ? 'Video or image could not be loaded. Check your media filenames.'
                : 'Image not found. Check public/images/.'}
            </div>
          )}
        </div>

        <div className="nav-stack" aria-label="Next navigation">
          <button
            className="nav-arrow"
            type="button"
            onClick={() => {
              playRandomSound()
              moveRow(1)
            }}
            aria-label="Previous vertical position"
          >
            <span aria-hidden="true">→</span>
          </button>

          <button
            className="nav-arrow"
            type="button"
            onClick={() => {
              playRandomSound()
              moveColumn(1)
            }}
            aria-label="Previous vertical position"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      {currentIndex === 0 && (
        <button
          className="play-animation-button"
          type="button"
          onClick={toggleVideo}
        >
          {isPlaying ? 'Stop Animation' : 'Play Animation'}
        </button>
      )}

      <footer className="caption">
        <span>{current.title}</span>
        <span className="counter">
          {String(currentIndex + 1).padStart(2, '0')} / 25
        </span>
      </footer>
    </main>
  )
}
