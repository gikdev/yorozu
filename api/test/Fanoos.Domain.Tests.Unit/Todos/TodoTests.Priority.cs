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
            var todoResult = TodoTestsUtils.CreateTodo(isImportant: false, isUrgent: false);

            // Act
            todoResult.Value.SetPriority(isUrgent: true, isImportant: true);

            // Assert
            todoResult.Value.IsImportant.Should().Be(true);
            todoResult.Value.IsUrgent.Should().Be(true);
        }

        [Fact]
        public void SetPriority_ShouldErrorOnIsUrgent_WhenTodoIsInSomedayBucket() {
            // Arrange
            var todoResult = TodoTestsUtils.CreateTodo(bucket: TodoBucket.SomedayMaybe);

            // Act
            var priorityResult = todoResult.Value.SetPriority(isUrgent: true, isImportant: true);

            // Assert
            priorityResult.IsError.Should().BeTrue();
            priorityResult.FirstError.Should().Be(TodoErrors.UrgentTodoCannotBeInSomedayBucket);
        }

        [Fact]
        public void ApplyEisenhowerMatrix_AppliesCorrectValues() {
            // Arrange
            var todoResult = TodoTestsUtils.CreateTodo(isImportant: false, isUrgent: false);
            var matrix = new EisenhowerMatrix { IsImportant = true, IsUrgent = true };

            // Act
            todoResult.Value.ApplyEisenhowerMatrix(matrix);

            // Assert
            todoResult.Value.IsImportant.Should().Be(matrix.IsImportant);
            todoResult.Value.IsUrgent.Should().Be(matrix.IsUrgent);
        }

        [Fact]
        public void ApplyEisenhowerMatrix_ShouldErrorOnIsUrgent_WhenTodoIsInSomedayBucket() {
            // Arrange
            var todoResult = TodoTestsUtils.CreateTodo(bucket: TodoBucket.SomedayMaybe);
            var matrix = new EisenhowerMatrix { IsImportant = true, IsUrgent = true };

            // Act
            var matrixResult = todoResult.Value.ApplyEisenhowerMatrix(matrix);

            // Assert
            matrixResult.IsError.Should().BeTrue();
            matrixResult.FirstError.Should().Be(TodoErrors.UrgentTodoCannotBeInSomedayBucket);
        }
    }
}
