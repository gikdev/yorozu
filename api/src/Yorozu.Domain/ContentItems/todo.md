# What to Do?

## 1. Complete missing collection management methods
- **`AddLocation(Location location)` / `RemoveLocation(Location location)`** – enforce uniqueness.
- **`AddImage(ContentItemImage image)`** – add an image, prevent duplicate IDs.
- **`SetPrimaryImage(Guid imageId)`** – mark an existing image as primary; throw if not found.
- **`RemoveImage(Guid imageId)`** – remove image; if it’s primary, set `PrimaryImageId` to `null`.
- **`UpdateUnitSpecification(ContentUnitSpecification newSpec)`** – replace the structure (e.g., add a season).
- **`SetGallery(ContentItemGallery gallery)`** – replace the gallery (if you choose to keep it separate from images; otherwise consider merging).

## 2. Add consumption‑tracking behaviour
- **`StartConsumption(DateTimeOffset startedAt, string? device = null)`** – create a new `ConsumptionTrack` and add it.
- **`PauseConsumption(Guid trackId, DateTimeOffset pausedAt)`** – pause an active track.
- **`ResumeConsumption(Guid trackId, DateTimeOffset resumedAt)`** – resume a paused track.
- **`CompleteConsumption(Guid trackId, DateTimeOffset completedAt)`** – complete a track.
- **Private helper `GetTrack(Guid trackId)`** – locate a track or throw.

## 3. Tighten the factory (and consider other constructors)
- **Validate `ContentItemFormat`** – e.g., throw or return `Error.Validation` if unknown.
- **Accept optional `ContentUnitSpecification` and `ContentItemGallery`** as creation parameters (some formats demand a unit spec, others don’t).
- **Decide if `UnitSpecification` should be required for certain formats** (e.g., series must have seasons/episodes). If so, enforce it in the factory.

## 4. Add business rules and validation
- **`ChangeNickName`** – allow removal by passing `null` or use an explicit `ClearNickName()`?
- **`AddTag`/`RemoveTag`** – return `ErrorOr` or throw on duplicates/not found? Keep it consistent.
- **`AddGenre`/`RemoveGenre`** – same question; if `Genre` is an enum, deduplication is fine.
- **Guard against removing the last image** if a primary is required? (Decide rule.)

## 5. Introduce domain events
- **Define `IDomainEvent` interface and a `DomainEvents` collection**.
- **Raise events for key mutations**, e.g.:
  - `ContentItemCreated`
  - `ContentItemBookmarked` / `Unbookmarked`
  - `ConsumptionStarted`, `ConsumptionCompleted`
  - `PrimaryImageChanged`
- **Collect them in a `List<IDomainEvent>`** and dispatch after persistence.

## 6. Make the aggregate robust for persistence (EF Core)
- **Ensure all value objects (`NonEmptyString`, `Location`, `ConsumptionTrack`, etc.) are properly mapped** (owned types, value converters).
- **Configure `OwnsMany` for collections** that are entities (`ConsumptionTrack`, `ContentItemImage` might be entities; `Location` likely a value object?).
- **Add a private parameterless constructor** (you already have one) and ensure EF can reconstruct the object.

## 7. Write unit tests
- **Factory tests**: valid creation, invalid format, missing title (already handled by `NonEmptyString`).
- **Title mutations**: update full title, change/clear nickname.
- **Flag toggles**: bookmark, favorite, secret – check state changes and `UpdatedAt`.
- **Collection operations**: add/remove tags, genres, locations, images (including deduplication).
- **Consumption tracking**: start/pause/resume/complete, and error when track not found.
- **Image primary management**: setting primary, removing primary, removing image that was primary.

## 8. Refine the gallery concept
- **Clarify relationship between `ContentItemGallery` and `List<ContentItemImage>`**. Currently you have both. Either:
  - Keep gallery as a separate property that holds image metadata (like ordering, display settings), and keep `Images` as the raw list; or
  - Merge them – let `ContentItemGallery` own the images and expose methods to add/remove/set primary through it.
- **Avoid duplication** – if you keep both, ensure they stay in sync.

## 9. Consider soft‑delete / archival (if needed)
- Add `IsArchived` flag and methods `Archive()` / `Restore()`.

## 10. Integrate with application layer
- **Define repository interface `IContentItemRepository`** (Add, GetById, Update, Delete).
- **Create command/handler** for each mutation using MediatR (or your preferred pattern).
- **Build API endpoints** that call those commands.
