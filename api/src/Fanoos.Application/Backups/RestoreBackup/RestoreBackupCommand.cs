using Fanoos.Application.Backups.Common;
using MediatR;

namespace Fanoos.Application.Backups.RestoreBackup;

public sealed record RestoreBackupCommand : BackupDto, IRequest<bool>;
