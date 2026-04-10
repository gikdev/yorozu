import { type TodoResponse } from "#/common/api/client"
import {
  CheckCircleIcon,
  CircleIcon,
  WarningIcon,
  InfoIcon,
  TagIcon,
  QuestionIcon,
  PencilSimpleIcon,
  TrashIcon,
  CircleNotchIcon,
} from "@phosphor-icons/react"
import { WaitingForCard } from "./waiting-for-card"
import { DueDateCard } from "./due-date-card"
import { TodoBucketCard } from "./todo-bucket-card"
import { EffortTypeCard } from "./effort-type-card"
import { EnergyLevelCard } from "./energy-level-card"
import { PomodoroCard } from "./pomodoro-card"
import { PriorityCard } from "./priority-card"
import { btn } from "#/common/atoms/btn"

interface TodoDetailsProps {
  todo: TodoResponse
  onEdit: (() => void) | null
  isEditBtnLoading: boolean
  onDelete: (() => void) | null
  isDeleteBtnLoading: boolean
}

export function TodoDetails(p: TodoDetailsProps) {
  const {
    bucket,
    contexts,
    description,
    dueDate,
    effortType,
    energyLevel,
    estimatedPomodoros,
    isDone,
    isUrgent,
    priority,
    title,
    waitingForInfo,
    why,
  } = p.todo

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2">
        {isDone ? (
          <CheckCircleIcon size={32} weight="fill" />
        ) : (
          <CircleIcon size={32} />
        )}

        <h1 className="text-2xl font-bold text-mist-100">{title}</h1>

        {isUrgent && (
          <WarningIcon size={24} className="text-amber-500 ms-auto" />
        )}
      </div>

      {contexts.length > 0 && (
        <div className="flex items-center flex-wrap gap-2">
          {contexts.map((c, i) => (
            <span
              key={i}
              className="flex items-center font-mono gap-1 bg-mist-950 px-2 py-0.5 rounded-md"
            >
              <TagIcon size={16} />
              <span>{c}</span>
            </span>
          ))}
        </div>
      )}

      {description && (
        <div className="flex gap-2 items-start">
          <InfoIcon size={20} className="shrink-0 mt-0.5" />
          <p className="">{description}</p>
        </div>
      )}

      {why && (
        <div className="flex gap-2 items-start">
          <QuestionIcon size={20} className="shrink-0 mt-0.5" />
          <p className="">{why}</p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-8">
        {dueDate && <DueDateCard dueDate={dueDate} />}

        <PriorityCard priority={priority} />

        {estimatedPomodoros != null && (
          <PomodoroCard pomodoros={estimatedPomodoros} />
        )}

        <EnergyLevelCard energyLevel={energyLevel} />

        <EffortTypeCard effortType={effortType} />

        <TodoBucketCard bucket={bucket} />
      </div>

      {waitingForInfo && (
        <WaitingForCard
          description={waitingForInfo.description}
          reviewAt={waitingForInfo.reviewAt}
        />
      )}

      {(p.onEdit || p.onDelete) && (
        <div className="flex flex-col gap-2 md:flex-row md:*:flex-1">
          {p.onEdit && (
            <button
              type="button"
              className={btn()}
              onClick={p.onEdit}
              disabled={p.isEditBtnLoading}
            >
              {p.isEditBtnLoading ? (
                <CircleNotchIcon size={20} className="animate-spin" />
              ) : (
                <PencilSimpleIcon size={20} />
              )}

              <span>Edit</span>
            </button>
          )}

          {p.onDelete && (
            <button
              type="button"
              className={btn()}
              onClick={p.onDelete}
              disabled={p.isDeleteBtnLoading}
            >
              {p.isEditBtnLoading ? (
                <CircleNotchIcon size={20} className="animate-spin" />
              ) : (
                <TrashIcon size={20} />
              )}

              <span>Delete</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
