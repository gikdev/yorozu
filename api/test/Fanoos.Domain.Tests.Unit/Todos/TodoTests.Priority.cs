#pragma warning disable CA1707 // Identifiers should not contain underscores
#pragma warning disable CA1515 // Consider making public types internal
#pragma warning disable CA1034 // Nested types should not be visible

using Fanoos.Domain.Todos;
using FluentAssertions;

namespace Fanoos.Domain.Tests.Unit.Todos;

public sealed partial class TodoTests {
    public sealed class Priority {
        [Fact]
        public void SetPriority_UpdatesImportanceAndUrgency() {
            // Arrange
            var todo = TodoTestsUtils.CreateTodo(isImportant: false, isUrgent: false);

            // Act
            todo.SetPriority(isUrgent: true, isImportant: true);

            // Assert
            todo.IsImportant.Should().Be(true);
            todo.IsUrgent.Should().Be(true);
        }

        [Fact]
        public void ApplyEisenhowerMatrix_AppliesCorrectValues() {
            // Arrange
            var todo = TodoTestsUtils.CreateTodo(isImportant: false, isUrgent: false);
            var matrix = new EisenhowerMatrix { IsImportant = true, IsUrgent = true };

            // Act
            todo.ApplyEisenhowerMatrix(matrix);

            // Assert
            todo.IsImportant.Should().Be(matrix.IsImportant);
            todo.IsUrgent.Should().Be(matrix.IsUrgent);
        }
    }
}
