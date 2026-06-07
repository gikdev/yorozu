import { tv } from "tailwind-variants"

export const styleContentItemCardBtn = tv({
  base: `
    cursor-pointer
    w-16 h-32 p-4
    flex items-center justify-center

    bg-transparent text-mist-400
    hover:bg-mist-800 hover:text-sky-100
    active:bg-sky-500 active:text-sky-50

    transition-all duration-100
  `,
})
