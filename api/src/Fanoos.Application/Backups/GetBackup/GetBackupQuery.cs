using Fanoos.Application.Backups.Common;
using MediatR;

namespace Fanoos.Application.Backups.GetBackup;

public sealed record GetBackupQuery : IRequest<BackupDto>;
