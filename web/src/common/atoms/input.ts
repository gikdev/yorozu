import { tv } from "tailwind-variants"

export const input = tv({
  base: `
    rounded-md border-2 border-mist-600
    font-inherit cursor-text transition-all
    duration-100 items-center
    py-2 px-3

    text-mist-900
    dark:text-mist-100
    bg-transparent

    hover:bg-black/10
    dark:hover:bg-white/10

    focus:border-sky-500
    focus:outline-none

    disabled:opacity-50
    disabled:duration-0
    disabled:cursor-not-allowed
  `,
  variants: {
    isMultiline: {
      false: "min-h-12",
      true: "min-h-16 resize-y",
    },
  },
  defaultVariants: {
    isMultiline: false,
  },
})
