using Yorozu.Application.Backups.Common;
using MediatR;

namespace Yorozu.Application.Backups.RestoreBackup;

public sealed record RestoreBackupCommand : BackupDto, IRequest<bool>;
