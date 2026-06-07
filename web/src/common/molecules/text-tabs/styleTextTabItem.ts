import { tv } from "tailwind-variants"

export const styleTextTabItem = tv({
  base: `
    border-b-2 cursor-pointer h-12
    flex items-center justify-center
    flex-1
    transition-all duration-300
  `,
  variants: {
    isActive: {
      false: "text-mist-400 border-mist-900 font-normal",
      true: "text-sky-500 border-sky-500 font-bold",
    },
  },
  defaultVariants: {
    isActive: false,
  },
})
