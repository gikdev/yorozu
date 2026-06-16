import { btn } from "#/common/atoms/btn"
import { useAppForm } from "#/common/forms"
import {
  AirplayIcon,
  BookmarkSimpleIcon,
  CalculatorIcon,
  HeartIcon,
  LockSimpleIcon,
  MapPinIcon,
} from "@phosphor-icons/react"
import type { ContentItemFormProps } from "./ContentItemFormProps"
import {
  contentItemFormEmptyValues,
  ContentItemFormSchema,
} from "./ContentItemFormSchema"
import {
  ContentItemFormat,
  ContentUnitType,
  LocationType,
} from "#/common/api/client"
import { useIsUnlocked } from "#/features/secret-mode/useSecretModeStore"
import { Activity } from "react"

const formatTagOptions: Array<{ title: string; value: ContentItemFormat }> =
  Object.values(ContentItemFormat).map(format => ({
    title: format,
    value: format,
  }))

const locationTypeTagOptions: Array<{ title: string; value: LocationType }> =
  Object.values(LocationType).map(type => ({ title: type, value: type }))

const unitTypeTagOptions: Array<{ title: string; value: ContentUnitType }> =
  Object.values(ContentUnitType).map(type => ({ title: type, value: type }))

export function ContentItemForm(p: ContentItemFormProps) {
  const isUnlocked = useIsUnlocked()
  const form = useAppForm({
    defaultValues:
      p.mode === "UPDATE" ? p.initialValues : contentItemFormEmptyValues,
    validators: {
      onSubmit: ContentItemFormSchema,
    },
    async onSubmit({ value }) {
      const reset = () => form.reset(contentItemFormEmptyValues)
      await p.onSubmit(value, reset)
    },
  })

  return (
    <div className="flex flex-col gap-4">
      <form.AppForm>
        <form.AppField name="coverImagePath">
          {field => <field.ImgUrlWithPreviewInput title="Cover Image" />}
        </form.AppField>

        <form.AppField name="fullTitle">
          {field => <field.SimpleTextInput title="Full Title" />}
        </form.AppField>

        <form.AppField name="nickName">
          {field => <field.SimpleTextInput title="Nick Name" />}
        </form.AppField>

        <div className="grid grid-cols-2">
          <form.AppField name="isBookmarked">
            {field => (
              <field.SvgToggleInput
                Icon={BookmarkSimpleIcon}
                iconSelectedClass="text-yellow-500"
                title="Is Bookmarked"
              />
            )}
          </form.AppField>

          <form.AppField name="isFavorite">
            {field => (
              <field.SvgToggleInput
                Icon={HeartIcon}
                iconSelectedClass="text-rose-500"
                title="Is Favorite"
              />
            )}
          </form.AppField>

          <Activity mode={isUnlocked ? "visible" : "hidden"}>
            <form.AppField name="isSecret">
              {field => (
                <field.SvgToggleInput
                  Icon={LockSimpleIcon}
                  iconSelectedClass="text-purple-500"
                  title="Is Secret"
                />
              )}
            </form.AppField>
          </Activity>

          <form.AppField name="isOngoing">
            {field => (
              <field.SvgToggleInput
                Icon={AirplayIcon}
                iconSelectedClass="text-emerald-500"
                title="Is Ongoing"
              />
            )}
          </form.AppField>

          <form.AppField name="hasLocation">
            {field => (
              <field.SvgToggleInput
                Icon={MapPinIcon}
                iconSelectedClass="text-sky-500"
                title="Has Location"
              />
            )}
          </form.AppField>

          <form.AppField name="hasUnitSpec">
            {field => (
              <field.SvgToggleInput
                Icon={CalculatorIcon}
                iconSelectedClass="text-sky-500"
                title="Has Unit Spec"
              />
            )}
          </form.AppField>
        </div>

        <form.Subscribe selector={state => state.values.hasLocation}>
          {hasLocation =>
            hasLocation && (
              <form.AppField name="locationType">
                {field => (
                  <field.TagOptionsInput
                    title="Location Type"
                    options={locationTypeTagOptions}
                  />
                )}
              </form.AppField>
            )
          }
        </form.Subscribe>

        <form.Subscribe selector={state => state.values.hasLocation}>
          {hasLocation =>
            hasLocation && (
              <form.AppField name="locationValue">
                {field => <field.SimpleTextInput title="Location Value" />}
              </form.AppField>
            )
          }
        </form.Subscribe>

        <form.Subscribe selector={state => state.values.hasUnitSpec}>
          {hasUnitSpec =>
            hasUnitSpec && (
              <form.AppField name="totalUnits">
                {field => <field.CounterNumberInput title="Total Units" />}
              </form.AppField>
            )
          }
        </form.Subscribe>

        <form.Subscribe selector={state => state.values.hasUnitSpec}>
          {hasUnitSpec =>
            hasUnitSpec && (
              <form.AppField name="unitType">
                {field => (
                  <field.TagOptionsInput
                    title="Unit Type"
                    options={unitTypeTagOptions}
                  />
                )}
              </form.AppField>
            )
          }
        </form.Subscribe>

        <form.AppField name="format">
          {field => (
            <field.TagOptionsInput title="Format" options={formatTagOptions} />
          )}
        </form.AppField>

        <form.AppField name="tags">
          {field => <field.SimpleWordListInput title="Tags" />}
        </form.AppField>

        <form.SimpleSubmitBtn className={btn()} title="Submit" />
      </form.AppForm>
    </div>
  )
}
