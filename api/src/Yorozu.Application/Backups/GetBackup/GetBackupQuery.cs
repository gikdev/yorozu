using Yorozu.Application.Backups.Common;
using MediatR;

namespace Yorozu.Application.Backups.GetBackup;

public sealed record GetBackupQuery : IRequest<BackupDto>;
