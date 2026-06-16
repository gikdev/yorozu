# Todo:

**Backend**
- `AddConsumptionTrack` endpoint — `POST /content-items/{id}/tracks`
- `RemoveConsumptionTrack` endpoint — `DELETE /content-items/{id}/tracks/{trackId}`
- `StartTrack` endpoint — `PATCH /content-items/{id}/tracks/{trackId}/start`
- `PauseTrack` endpoint — `PATCH /content-items/{id}/tracks/{trackId}/pause`
- `ResumeTrack` endpoint — `PATCH /content-items/{id}/tracks/{trackId}/resume`
- `CompleteTrack` endpoint — `PATCH /content-items/{id}/tracks/{trackId}/complete`
- `DropTrack` endpoint — `PATCH /content-items/{id}/tracks/{trackId}/drop`
- `SetTrackProgress` endpoint — `PATCH /content-items/{id}/tracks/{trackId}/progress`
- `IncrementTrackProgress` endpoint — `PATCH /content-items/{id}/tracks/{trackId}/increment`
- Include tracks in `GetContentItem` response
- `ConsumptionTrackResponse` DTO + mapper

**Frontend**
- Tracks section on details page (read + increment button)
- Add track modal/sheet
- Manage tracks page or modal (delete, status changes)
- Search/filter on library page
- Tags input improvement (suggestions from existing tags)
- Command palette quick-add (`add("Horimiya" #w)`)
- FAB position fix
- Form default values per format type

**Design decisions (need a decision before touching code)**
- Genres → just tags (touches domain = migration needed, decide carefully)
- "Done" state — keep as-is via completed track (recommended), or add archive flag
- Secret toggle — what's the intended behavior change?
- Tags input — what would "better" look like to you?
