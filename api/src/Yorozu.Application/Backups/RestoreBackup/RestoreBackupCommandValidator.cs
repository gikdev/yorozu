using Yorozu.Application.Backups.Common;
using FluentValidation;

namespace Yorozu.Application.Backups.RestoreBackup;

internal sealed class RestoreBackupCommandValidator : AbstractValidator<RestoreBackupCommand> {
    public RestoreBackupCommandValidator() {
        RuleFor(x => x.Version)
            .Equal(Constants.CurrentVersion)
            .WithMessage("Versions do not match!");
    }
}
