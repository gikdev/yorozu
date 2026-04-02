import { tv } from "tailwind-variants"

export const btn = tv({
  base: `
    flex items-center justify-center
    font-inherit cursor-pointer transition-all
    duration-100 items-center


    active:scale-95

    disabled:opacity-50
    disabled:scale-100
    disabled:duration-0
    disabled:cursor-not-allowed
  `,
  variants: {
    isIcon: {
      false: "gap-2 px-4 py-3 min-h-12",
      true: "gap-1 p-2 h-12 w-12",
    },
    theme: {
      glass: `
        rounded-md
        border-none

        text-mist-900
        dark:text-mist-100
        bg-transparent

        hover:bg-black/10
        dark:hover:bg-white/10
      `,
      primary: `
        rounded-md
        border-none

        bg-sky-500
        text-mist-100

        hover:bg-sky-600
      `,
    },
  },
  defaultVariants: {
    isIcon: false,
    theme: "glass",
  },
})
