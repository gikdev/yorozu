using MediatR;
using Fanoos.Application.Backups.Common;

namespace Fanoos.Application.Backups.GetBackup;

public sealed record GetBackupQuery : IRequest<BackupDto>;
