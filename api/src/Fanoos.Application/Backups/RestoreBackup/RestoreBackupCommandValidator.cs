using Fanoos.Application.Backups.Common;
using FluentValidation;

namespace Fanoos.Application.Backups.RestoreBackup;

internal sealed class RestoreBackupCommandValidator : AbstractValidator<RestoreBackupCommand> {
    public RestoreBackupCommandValidator() {
        RuleFor(x => x.Version)
            .Equal(Constants.CurrentVersion)
            .WithMessage("Versions do not match!");
    }
}
