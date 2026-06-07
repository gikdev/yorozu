import { tv } from "tailwind-variants"

export const styleBottomNavItem = tv({
  base: [
    "h-16 flex flex-col gap-0.5 items-center flex-1 text-xs justify-center pb-0.5",
    "hover:bg-mist-900",
    "bg-transparent border-none cursor-pointer",
  ],
  variants: {
    active: {
      true: "font-bold text-sky-500",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed hover:bg-transparent",
    },
  },
  defaultVariants: {
    active: false,
    disabled: false,
  },
})
