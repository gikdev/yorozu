using Microsoft.EntityFrameworkCore;
using Yorozu.Application.ConsumptionTracks.Common;
using Yorozu.Domain.ConsumptionTracks;
using Yorozu.Domain.ContentItems;
using Yorozu.Infrastructure.Database;

namespace Yorozu.Infrastructure.ConsumptionTracks;

internal class ConsumptionTrackRepository(
    MainDbCtx db
) : IConsumptionTrackRepository {
    public void Add(ConsumptionTrack consumptionTrack) => db.ConsumptionTracks.Add(consumptionTrack);

    public void Update(ConsumptionTrack consumptionTrack) => db.ConsumptionTracks.Update(consumptionTrack);

    public void Remove(ConsumptionTrack consumptionTrack) => db.ConsumptionTracks.Remove(consumptionTrack);

    public Task<ConsumptionTrack?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => db.ConsumptionTracks.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

    public Task<List<ConsumptionTrack>> ListAsync(CancellationToken cancellationToken = default)
        => db.ConsumptionTracks.ToListAsync(cancellationToken);

    public Task<List<ConsumptionTrack>> GetByContentItemIdAsync(Guid contentItemId, CancellationToken cancellationToken = default)
        => db.ConsumptionTracks.Where(x => x.ContentItemId == contentItemId).ToListAsync(cancellationToken);

    public async Task<ConsumptionTrackSummaryDto?> GetSummaryByIdAsync(Guid id, CancellationToken cancellationToken) {
        var result = await (
            from t in db.ConsumptionTracks
            join c in db.ContentItems on t.ContentItemId equals c.Id
            where t.Id == id
            select new { t, c }
        ).FirstOrDefaultAsync(cancellationToken);

        return result is null ? null : MapToSummary(result.t, result.c);
    }

    public async Task<List<ConsumptionTrackSummaryDto>> GetSummariesByContentItemIdAsync(Guid contentItemId, CancellationToken cancellationToken) {
        var items = await (
            from t in db.ConsumptionTracks
            join c in db.ContentItems on t.ContentItemId equals c.Id
            where t.ContentItemId == contentItemId
            select new { t, c }
        ).ToListAsync(cancellationToken);

        return items.ConvertAll(x => MapToSummary(x.t, x.c));
    }

    public async Task<List<ConsumptionTrackSummaryDto>> GetAllSummariesAsync(CancellationToken cancellationToken) {
        var items = await (
            from t in db.ConsumptionTracks
            join c in db.ContentItems on t.ContentItemId equals c.Id
            select new { t, c }
        ).ToListAsync(cancellationToken);

        return items.ConvertAll(x => MapToSummary(x.t, x.c));
    }

    private static ConsumptionTrackSummaryDto MapToSummary(ConsumptionTrack track, ContentItem contentItem)
        => new() {
            Id = track.Id,
            ContentItemId = track.ContentItemId,
            ContentItemTitle = contentItem.Title.Value,
            ContentItemCoverImageUrl = contentItem.CoverImageUrl?.Value,
            ContentItemPlaceholderColor = contentItem.PlaceholderColor,
            ContentItemPlaceholderLetter = contentItem.PlaceholderLetter,
            ContentItemFormat = contentItem.Format,
            Type = track.Type,
            Status = track.Status,
            Title = track.Title,
            CurrentUnit = track.CurrentUnit,
            TotalUnits = track.TotalUnits,
            Description = track.Description,
            CreatedAt = track.CreatedAt,
            UpdatedAt = track.UpdatedAt,
            StartedAt = track.StartedAt,
            CompletedAt = track.CompletedAt,
            DroppedAt = track.DroppedAt,
            PausedAt = track.PausedAt,
            CanStart = track.CanStart,
            CanPause = track.CanPause,
            CanResume = track.CanResume,
            CanComplete = track.CanComplete,
            CanDrop = track.CanDrop,
            CanProgress = track.CanProgress,
            CanDecrement = track.CanDecrement,
        };
}
