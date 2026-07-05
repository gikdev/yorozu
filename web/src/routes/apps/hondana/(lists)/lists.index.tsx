import { ListBulletsIcon } from '@phosphor-icons/react'
import { createFileRoute } from '@tanstack/react-router'
import { StateMessage } from '#/common/molecules/StateMessage'

export const Route = createFileRoute('/apps/hondana/(lists)/lists/')({
  component: () => (
    <StateMessage
      icon={ListBulletsIcon}
      mode='NORMAL'
      title='No list selected.'
      className='h-full'
      description='Choose a list first!'
    />
  ),
})
