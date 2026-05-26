using Yorozu.Common.Domain;

namespace Yorozu.Domain.Projects;

public class Project : IAggregateRoot {
    private readonly List<ProjectTask> _tasks = [];

    public required Guid Id { get; init; }
    public required NotEmptyString Title { get; set; }
    public NotEmptyString? Emoji { get; set; }

    public IReadOnlyList<ProjectTask> Tasks => _tasks.AsReadOnly();

    public ProjectTask AddTodoItem(NotEmptyString title, TaskStatus status = TaskStatus.Backlog) {
        var item = new ProjectTask {
            Id = Guid.NewGuid(),
            Title = title,
            Status = status
        };

        _tasks.Add(item);

        return item;
    }

    public void RemoveTodoItem(Guid todoItemId) {
        _tasks.RemoveAll(t => t.Id == todoItemId);
    }

    public void ChangeTodoStatus(Guid taskId, TaskStatus newStatus) {
        var item = _tasks.FirstOrDefault(t => t.Id == taskId);

        item?.Status = newStatus;
    }

    public void RenameTodoItem(Guid taskId, NotEmptyString newTitle) {
        var item = _tasks.FirstOrDefault(t => t.Id == taskId);

        item?.Title = newTitle;
    }
}
