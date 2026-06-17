using MediatR;

namespace Yorozu.Common.Domain;

#pragma warning disable CA1040 // Avoid empty interfaces
public interface IDomainEvent : INotification;
#pragma warning restore CA1040 // Avoid empty interfaces
