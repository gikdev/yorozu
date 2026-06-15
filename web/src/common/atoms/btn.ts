import { tv } from "tailwind-variants"

export const btn = tv({
  base: `
    inline-flex items-center justify-center
    font-inherit cursor-pointer transition-all
    duration-100

    active:scale-95

    disabled:opacity-50
    disabled:scale-100
    disabled:duration-0
    disabled:cursor-not-allowed

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-offset-2
    focus-visible:ring-sky-500
  `,
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
    theme: {
      glass: `
        rounded-md border-none
        text-mist-900 dark:text-mist-100
        bg-transparent
        hover:bg-black/10 dark:hover:bg-white/10
      `,
      primary: `
        rounded-md border-none
        bg-sky-500 text-white
        hover:bg-sky-600
      `,
      secondary: `
        rounded-md border-none
        bg-mist-200 text-mist-900
        dark:bg-mist-700 dark:text-mist-100
        hover:bg-mist-300 dark:hover:bg-mist-600
      `,
      outline: `
        rounded-md border border-mist-400 dark:border-mist-600
        bg-transparent text-mist-900 dark:text-mist-100
        hover:bg-mist-100 dark:hover:bg-mist-800
      `,
      ghost: `
        rounded-md border-none bg-transparent
        text-mist-900 dark:text-mist-100
        hover:bg-mist-100 dark:hover:bg-mist-800
      `,
      danger: `
        rounded-md border-none
        bg-red-500 text-white
        hover:bg-red-600
      `,
      link: `
        rounded-none border-none bg-transparent
        text-sky-600 dark:text-sky-400
        underline-offset-4 hover:underline
        p-0 h-auto
      `,
    },
    isIcon: {
      false: "",
      true: "",
    },
  },
  compoundVariants: [
    // --- Text + icon buttons (isIcon: false) sizing ---
    {
      isIcon: false,
      size: "sm",
      class: "gap-1.5 px-3 py-2 text-sm min-h-9",
    },
    {
      isIcon: false,
      size: "md",
      class: "gap-2 px-4 py-3 text-base min-h-12",
    },
    {
      isIcon: false,
      size: "lg",
      class: "gap-3 px-6 py-4 text-lg min-h-14",
    },

    // --- Icon-only buttons (isIcon: true) sizing ---
    {
      isIcon: true,
      size: "sm",
      class: "p-1.5 h-8 w-8",
    },
    {
      isIcon: true,
      size: "md",
      class: "p-2 h-12 w-12",
    },
    {
      isIcon: true,
      size: "lg",
      class: "p-3 h-14 w-14",
    },
  ],
  defaultVariants: {
    size: "md",
    theme: "glass",
    isIcon: false,
  },
})
