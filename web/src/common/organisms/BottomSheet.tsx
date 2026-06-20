// bottomsheet.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react"
import { XIcon } from "@phosphor-icons/react"
import { cn } from "tailwind-variants"

// ---------- Context ----------
interface BottomSheetContextType {
  isOpen: boolean
  open: () => void
  close: () => void
}

const BottomSheetContext = createContext<BottomSheetContextType | null>(null)

function useBottomSheet() {
  const ctx = useContext(BottomSheetContext)
  if (!ctx)
    throw new Error(
      "BottomSheet components must be used inside <BottomSheet.Root>",
    )
  return ctx
}

// ---------- Root ----------
interface RootProps {
  children: React.ReactNode
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function Root({ children, defaultOpen = false, onOpenChange }: RootProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const open = useCallback(() => {
    setIsOpen(true)
    onOpenChange?.(true)
  }, [onOpenChange])

  const close = useCallback(() => {
    setIsOpen(false)
    onOpenChange?.(false)
  }, [onOpenChange])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, close])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <BottomSheetContext.Provider value={{ isOpen, open, close }}>
      {children}
    </BottomSheetContext.Provider>
  )
}

// ---------- Trigger ----------
interface TriggerProps {
  children: React.ReactNode
  className?: string
}

function Trigger({ children, className }: TriggerProps) {
  const { open } = useBottomSheet()
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  )
}

// ---------- Backdrop ----------
interface BackdropProps {
  closable?: boolean // clicking backdrop closes the sheet
  className?: string
}

function Backdrop({ closable = false, className }: BackdropProps) {
  const { isOpen, close } = useBottomSheet()
  if (!isOpen) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-black/60 transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        className,
      )}
      onClick={closable ? close : undefined}
      aria-hidden="true"
    />
  )
}

// ---------- Container ----------
interface ContainerProps {
  children: React.ReactNode
  className?: string
  /**
   * Height of the sheet when fully open (e.g., "h-1/2", "h-3/4", "max-h-[90%]").
   * Default: "h-1/2"
   */
  height?: string
}

function Container({ children, className, height = "h-1/2" }: ContainerProps) {
  const { isOpen } = useBottomSheet()

  return (
    <>
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-2xl bg-mist-900 text-mist-100 shadow-2xl transition-transform duration-300 ease-out",
          height,
          isOpen ? "translate-y-0" : "translate-y-full",
          className,
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Drag handle (subtle indicator) */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-mist-600" />
        </div>
        {children}
      </div>
    </>
  )
}

// ---------- Header ----------
interface HeaderProps {
  title?: string
  showCloseButton?: boolean
  className?: string
  children?: React.ReactNode
}

function Header({
  title,
  showCloseButton = true,
  className,
  children,
}: HeaderProps) {
  const { close } = useBottomSheet()

  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 border-b border-mist-800",
        className,
      )}
    >
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      {children}
      {showCloseButton && (
        <button
          onClick={close}
          className="ml-auto rounded-full p-1 hover:bg-mist-800 transition-colors"
          aria-label="Close"
        >
          <XIcon size={20} />
        </button>
      )}
    </div>
  )
}

// ---------- Content (scrollable) ----------
function Content({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex-1 overflow-y-auto p-4", className)}>
      {children}
    </div>
  )
}

/**
 * A compound bottom sheet organism with dark theme and slide-up transition.
 *
 * @example
 * // 1. Minimal: no backdrop, simple header
 * <BottomSheet.Root>
 *   <BottomSheet.Trigger className={btn({ size: "sm" })}>
 *     Open
 *   </BottomSheet.Trigger>
 *   <BottomSheet.Container height="h-3/4">
 *     <BottomSheet.Header title="Details" />
 *     <BottomSheet.Content>
 *       <p>Your content here</p>
 *     </BottomSheet.Content>
 *   </BottomSheet.Container>
 * </BottomSheet.Root>
 *
 * @example
 * // 2. With static backdrop (not closable)
 * <BottomSheet.Root>
 *   <BottomSheet.Trigger className={btn({ size: "sm" })}>
 *     Open
 *   </BottomSheet.Trigger>
 *   <BottomSheet.Backdrop />
 *   <BottomSheet.Container height="h-1/2">
 *     <BottomSheet.Content>
 *       <p>No header, backdrop is decorative</p>
 *     </BottomSheet.Content>
 *   </BottomSheet.Container>
 * </BottomSheet.Root>
 *
 * @example
 * // 3. Closable backdrop, custom header with action buttons
 * <BottomSheet.Root>
 *   <BottomSheet.Backdrop closable />
 *   <BottomSheet.Container height="max-h-[80%]">
 *     <BottomSheet.Header showCloseButton={false}>
 *       <div className="flex gap-2">
 *         <button>Save</button>
 *         <button>Cancel</button>
 *       </div>
 *     </BottomSheet.Header>
 *     <BottomSheet.Content className="space-y-4">
 *       <p>Custom header, click backdrop to close</p>
 *     </BottomSheet.Content>
 *   </BottomSheet.Container>
 * </BottomSheet.Root>
 *
 * @example
 * // 4. Controlled via external button (no Trigger)
 * const { open } = useBottomSheet() // inside <BottomSheet.Root>
 * <button onClick={open}>Open sheet</button>
 * <BottomSheet.Container height="h-1/2">
 *   <BottomSheet.Header title="Controlled" />
 *   <BottomSheet.Content>...</BottomSheet.Content>
 * </BottomSheet.Container>
 *
 * @example
 * // 5. No header at all
 * <BottomSheet.Root>
 *   <BottomSheet.Trigger>Show</BottomSheet.Trigger>
 *   <BottomSheet.Container height="h-1/2">
 *     <BottomSheet.Content>Just content</BottomSheet.Content>
 *   </BottomSheet.Container>
 * </BottomSheet.Root>
 */
export const BottomSheet = {
  Root,
  Trigger,
  Backdrop,
  Container,
  Header,
  Content,
}
