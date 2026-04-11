'use client'

import { useState } from "react"
import {
  Transition,
  motion,
  stagger,
  useAnimate,
} from "framer-motion"
import { debounce } from "lodash"

interface TextProps {
  label: string
  reverse?: boolean
  transition?: Transition
  staggerDuration?: number
  staggerFrom?: "first" | "last" | "center" | number
  className?: string
  onClick?: () => void
}

export function LetterSwapForward({
  label,
  reverse = true,
  transition = {
    type: "spring",
    duration: 0.7,
  },
  staggerDuration = 0.03,
  staggerFrom = "first",
  className,
  onClick,
  ...props
}: TextProps) {
  const [scope, animate] = useAnimate()
  const [blocked, setBlocked] = useState(false)

  const hoverStart = () => {
    if (blocked) return

    setBlocked(true)

    // Function to merge user transition with stagger and delay
    const mergeTransition = (baseTransition: Transition) => ({
      ...baseTransition,
      delay: stagger(staggerDuration, {
        from: staggerFrom,
      }),
    })

    animate(
      ".letter",
      { y: reverse ? "100%" : "-100%" },
      mergeTransition(transition)
    ).then(() => {
      animate(
        ".letter",
        {
          y: 0,
        },
        {
          duration: 0,
        }
      ).then(() => {
        setBlocked(false)
      })
    })

    animate(
      ".letter-secondary",
      {
        top: "0%",
      },
      mergeTransition(transition)
    ).then(() => {
      animate(
        ".letter-secondary",
        {
          top: reverse ? "-100%" : "100%",
        },
        {
          duration: 0,
        }
      )
    })
  }

  return (
    <span
      className={`flex flex-wrap justify-center items-center relative overflow-visible text-center ${className}`}
      onMouseEnter={hoverStart}
      onTouchStart={hoverStart}
      onClick={onClick}
      ref={scope}
      {...props}
    >
      <span className="sr-only">{label}</span>

      {label.split(" ").map((word: string, wordIndex: number) => (
        <span key={wordIndex} className="inline-flex flex-nowrap items-center whitespace-nowrap">
          {word.split("").map((letter: string, i: number) => (
            <span
              className="whitespace-pre relative inline-flex overflow-hidden h-[1.1em] items-center justify-center text-center"
              key={i}
            >
              <motion.span className="relative letter inline-block" style={{ top: 0 }}>
                {letter}
              </motion.span>
              <motion.span
                className="absolute letter-secondary left-0"
                aria-hidden={true}
                style={{ top: reverse ? "-100%" : "100%" }}
              >
                {letter}
              </motion.span>
            </span>
          ))}
          {wordIndex !== label.split(" ").length - 1 && <span className="w-3" aria-hidden="true" />}
        </span>
      ))}
    </span>
  )
}

export function LetterSwapPingPong({
  label,
  reverse = true,
  transition = {
    type: "spring",
    duration: 0.7,
  },
  staggerDuration = 0.03,
  staggerFrom = "first",
  className,
  onClick,
  ...props
}: TextProps) {
  const [scope, animate] = useAnimate()
  const [isHovered, setIsHovered] = useState(false)

  const mergeTransition = (baseTransition: Transition) => ({
    ...baseTransition,
    delay: stagger(staggerDuration, {
      from: staggerFrom,
    }),
  })

  // Ensure debounce handles its dependencies safely
  const hoverStart = debounce(
    () => {
      if (isHovered) return
      setIsHovered(true)

      animate(
        ".letter",
        { y: reverse ? "100%" : "-100%" },
        mergeTransition(transition)
      )

      animate(
        ".letter-secondary",
        {
          top: "0%",
        },
        mergeTransition(transition)
      )
    },
    100,
    { leading: true, trailing: true }
  )

  const hoverEnd = debounce(
    () => {
      setIsHovered(false)

      animate(
        ".letter",
        {
          y: 0,
        },
        mergeTransition(transition)
      )

      animate(
        ".letter-secondary",
        {
          top: reverse ? "-100%" : "100%",
        },
        mergeTransition(transition)
      )
    },
    100,
    { leading: true, trailing: true }
  )

  return (
    <motion.span
      className={`flex flex-wrap justify-center items-center relative overflow-visible text-center ${className}`}
      onHoverStart={hoverStart}
      onHoverEnd={hoverEnd}
      onTapStart={hoverStart}
      onTap={hoverEnd}
      onTapCancel={hoverEnd}
      onClick={onClick}
      ref={scope}
      {...props}
    >
      <span className="sr-only">{label}</span>

      {label.split(" ").map((word: string, wordIndex: number) => (
        <span key={wordIndex} className="inline-flex flex-nowrap items-center whitespace-nowrap">
          {word.split("").map((letter: string, i: number) => (
            <span
              className="whitespace-pre relative inline-flex overflow-hidden h-[1.1em] items-center justify-center text-center"
              key={i}
            >
              <motion.span className="relative letter inline-block" style={{ top: 0 }}>
                {letter}
              </motion.span>
              <motion.span
                className="absolute letter-secondary left-0"
                aria-hidden={true}
                style={{ top: reverse ? "-100%" : "100%" }}
              >
                {letter}
              </motion.span>
            </span>
          ))}
          {wordIndex !== label.split(" ").length - 1 && <span className="w-3" aria-hidden="true" />}
        </span>
      ))}
    </motion.span>
  )
}
