import { tv } from "tailwind-variants"

export const styleInput = tv({
  base: `
    rounded-md border-2 font-inherit cursor-text
    transition-all duration-100
    py-2 px-3
    text-mist-900 dark:text-mist-100
    bg-transparent

    outline-none
    focus:outline-none

    disabled:opacity-50
    disabled:duration-0
    disabled:cursor-not-allowed
  `,
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
    variant: {
      glass: `
        border-mist-600
        hover:bg-black/10 dark:hover:bg-white/10
        focus:border-sky-500
      `,
      outline: `
        border-mist-400 dark:border-mist-600
        bg-transparent
        hover:bg-mist-100 dark:hover:bg-mist-800
        focus:border-sky-500
      `,
      filled: `
        border-transparent
        bg-mist-100 dark:bg-mist-800
        hover:bg-mist-200 dark:hover:bg-mist-700
        focus:bg-transparent dark:focus:bg-transparent
        focus:border-sky-500
      `,
      ghost: `
        border-transparent
        bg-transparent
        hover:bg-mist-100 dark:hover:bg-mist-800
        focus:border-b-sky-500 focus:rounded-b-none
        focus:ring-0
        px-1
      `,
    },
    isMultiline: {
      false: "",
      true: "resize-y",
    },
    invalid: {
      true: `
        border-red-500
        focus:ring-red-500
        text-red-600 dark:text-red-400
      `,
      false: "",
    },
  },
  compoundVariants: [
    // --- Size combinations for single-line (isMultiline: false) ---
    {
      isMultiline: false,
      size: "sm",
      class: "py-1.5 px-2.5 text-sm min-h-[2.25rem]",
    },
    {
      isMultiline: false,
      size: "md",
      class: "py-2 px-3 text-base min-h-[3rem]",
    },
    {
      isMultiline: false,
      size: "lg",
      class: "py-3 px-4 text-lg min-h-[3.5rem]",
    },

    // --- Size combinations for multiline (isMultiline: true) ---
    {
      isMultiline: true,
      size: "sm",
      class: "py-1.5 px-2.5 text-sm min-h-[4rem]",
    },
    {
      isMultiline: true,
      size: "md",
      class: "py-2 px-3 text-base min-h-[5rem]",
    },
    {
      isMultiline: true,
      size: "lg",
      class: "py-3 px-4 text-lg min-h-[6rem]",
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "glass",
    isMultiline: false,
    invalid: false,
  },
})
