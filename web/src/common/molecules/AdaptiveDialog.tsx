import { XIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { tv } from 'tailwind-variants'

import { btn } from '../atoms/btn'

const styleAdaptiveDialog = tv({
  slots: {
    backdrop: `
      fixed inset-0 z-10 flex min-h-dvh min-w-dvw flex-col items-center bg-black/70
      justify-end p-0 sm:justify-center sm:p-4
    `,
    container: `
      flex flex-col border border-mist-700 bg-mist-900
      rounded-t-md sm:rounded-md
      min-h-[50dvh] sm:min-h-auto
      max-w-full sm:max-w-120
      min-w-full sm:min-w-80
    `,
    header:
      'flex items-center justify-between border-b border-mist-700 px-4 py-2',
    title: 'font-bold text-mist-100',
    content: 'p-4',
  },
})

export const AdaptiveDialog = (p: {
  isOpen: boolean
  title: string
  onClose: (() => void) | null
  children: ReactNode
}) => {
  const styles = styleAdaptiveDialog()

  return (
    <AnimatePresence>
      {p.isOpen && (
        <motion.div
          key='modal__backdrop'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.backdrop()}
        >
          <motion.div
            key='modal__container'
            initial={{ y: '100%', scale: 0 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: '100%', scale: 0 }}
            className={styles.container()}
          >
            <div className={styles.header()}>
              <p className={styles.title()}>{p.title}</p>

              <motion.button
                key='modal__close-btn'
                whileTap={{ scale: 0.95 }}
                className={btn({ isIcon: true })}
                disabled={p.onClose == null}
                onClick={p.onClose || undefined}
                type='button'
              >
                <XIcon size={20} />
              </motion.button>
            </div>

            <div className={styles.content()}>{p.children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
