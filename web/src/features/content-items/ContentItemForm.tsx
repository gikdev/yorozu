import {
  AirplayIcon,
  ArrowClockwiseIcon,
  BookmarkSimpleIcon,
  HeartIcon,
  LockKeyIcon,
  XIcon,
} from '@phosphor-icons/react'
import { z } from 'zod'
import {
  type ContentItemFormat,
  type LocationType,
  zContentItemFormat,
  zLocationType,
} from '#/common/api/client'
import { btn } from '#/common/atoms/btn'
import { useAppForm } from '#/common/forms'

const zContentItemFormValues = z.object({
  fullTitle: z.string().min(1, 'Required'),
  nickName: z.string(),
  format: zContentItemFormat,
  unitType: z.string().min(1, 'Required'),
  totalUnits: z.number().int().nonnegative().nullable(),
  coverImageUrl: z.string(),
  locationType: zLocationType.nullable(),
  locationValue: z.string(),
  tags: z.array(z.string()),
  isSecret: z.boolean(),
  isFavorited: z.boolean(),
  isBookmarked: z.boolean(),
  isOngoing: z.boolean(),
})

export type ContentItemFormValues = z.infer<typeof zContentItemFormValues>

const emptyValues: ContentItemFormValues = {
  fullTitle: '',
  format: 'Mixed',
  unitType: 'Unit',
  totalUnits: null,
  coverImageUrl: '',
  locationValue: '',
  tags: [],
  isSecret: false,
  isFavorited: false,
  isBookmarked: false,
  isOngoing: false,
  locationType: null,
  nickName: '',
}

export type ContentItemFormSubmitHandler = (
  values: ContentItemFormValues,
  empty: () => void,
) => Promise<void>

type ContentItemFormProps = {
  allTags: string[]
  submitLabel: string
  onCancel: () => void
  onSubmit: ContentItemFormSubmitHandler
} & (
  | { mode: 'CREATE' }
  | { mode: 'EDIT'; initialValues: ContentItemFormValues }
)

export function ContentItemForm(p: ContentItemFormProps) {
  const defaultValues = p.mode === 'CREATE' ? emptyValues : p.initialValues
  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: zContentItemFormValues,
    },
    onSubmit: async ({ value }) => {
      const reset = () => form.reset(emptyValues)
      await p.onSubmit(value, reset)
    },
  })

  return (
    <form.AppForm>
      <div className='flex flex-col gap-4'>
        <form.AppField name='fullTitle'>
          {field => <field.SimpleTextInput title='Full Title' />}
        </form.AppField>

        <form.AppField name='nickName'>
          {field => <field.SimpleTextInput title='Nick Name' />}
        </form.AppField>

        <form.AppField name='coverImageUrl'>
          {field => <field.ImgUrlWithPreviewInput title='Cover Image' />}
        </form.AppField>

        <form.AppField name='format'>
          {field => (
            <field.SimpleSelectInput
              title='Format'
              options={
                [
                  'Interactive',
                  'Listenable',
                  'Mixed',
                  'Readable',
                  'Watchable',
                ] satisfies ContentItemFormat[]
              }
            />
          )}
        </form.AppField>

        <p>Options</p>
        <div className='flex flex-wrap *:flex-1 *:min-w-24'>
          <form.AppField name='isBookmarked'>
            {field => (
              <field.SvgToggleInput
                title='Bookmarked'
                Icon={BookmarkSimpleIcon}
                iconSelectedClass='text-amber-400'
              />
            )}
          </form.AppField>

          <form.AppField name='isFavorited'>
            {field => (
              <field.SvgToggleInput
                title='Favorite'
                Icon={HeartIcon}
                iconSelectedClass='text-rose-400'
              />
            )}
          </form.AppField>

          <form.AppField name='isOngoing'>
            {field => (
              <field.SvgToggleInput
                title='Ongoing'
                Icon={AirplayIcon}
                iconSelectedClass='text-emerald-400'
              />
            )}
          </form.AppField>

          <form.AppField name='isSecret'>
            {field => (
              <field.SvgToggleInput
                title='Secret'
                Icon={LockKeyIcon}
                iconSelectedClass='text-violet-400'
              />
            )}
          </form.AppField>
        </div>

        <form.AppField name='unitType'>
          {field => (
            <field.SimpleTextInput
              title='Unit Type'
              suggestions={['Unit', 'Page', 'Lesson', 'Episode']}
            />
          )}
        </form.AppField>

        <form.AppField name='totalUnits'>
          {field => <field.CounterNumberInput title='Total Units' />}
        </form.AppField>

        <form.AppField name='locationType'>
          {field => (
            <field.SimpleSelectInput
              title='Location Type'
              options={['FilePath', 'Physical', 'Url'] satisfies LocationType[]}
            />
          )}
        </form.AppField>

        <form.AppField name='locationValue'>
          {field => (
            <field.SimpleTextInput title='Location Value' isMultiline />
          )}
        </form.AppField>

        <form.AppField name='tags'>
          {field => <field.SmartTagsInput title='Tags' allTags={p.allTags} />}
        </form.AppField>

        <div className='flex gap-2 flex-wrap *:min-w-max'>
          <button
            type='button'
            onClick={() => form.reset(defaultValues)}
            className={btn({ isIcon: true })}
          >
            <ArrowClockwiseIcon size={24} />
          </button>

          <form.SimpleSubmitBtn
            className={btn({ theme: 'primary', class: 'flex-1' })}
            title={p.submitLabel}
          />

          <button
            type='button'
            onClick={p.onCancel}
            className={btn({ isIcon: true })}
          >
            <XIcon size={24} />
          </button>
        </div>
      </div>
    </form.AppForm>
  )
}
