import { ContentItemForm } from "../ContentItemForm"

export function NewContentItemSection() {
  return <ContentItemForm mode="CREATE" onSubmit={v => console.log(v)} />
}
