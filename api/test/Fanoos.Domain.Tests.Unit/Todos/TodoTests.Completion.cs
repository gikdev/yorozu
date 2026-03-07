#pragma warning disable CA1707 // Identifiers should not contain underscores
#pragma warning disable CA1515 // Consider making public types internal
#pragma warning disable CA1034 // Nested types should not be visible

using FluentAssertions;

namespace Fanoos.Domain.Tests.Unit.Todos;

public sealed partial class TodoTests {
    public sealed class Completion {
        [Fact]
        public void MarkDone_MarksTodoAsDone() {
            // Arrange
            var todo = TodoTestsUtils.CreateTodo(isDone: false);

            // Act
            todo.MarkDone();

            // Assert
            todo.IsDone.Should().BeTrue();
        }

        [Fact]
        public void MarkDone_KeepsItDone_WhenAlreadyDone() {
            // Arrange
            var todo = TodoTestsUtils.CreateTodo(isDone: true);

            // Act
            todo.MarkDone();

            // Assert
            todo.IsDone.Should().BeTrue();
        }

        [Fact]
        public void MarkUndone_MarksTodoAsUndone() {
            // Arrange
            var todo = TodoTestsUtils.CreateTodo(isDone: true);

            // Act
            todo.MarkUndone();

            // Assert
            todo.IsDone.Should().BeFalse();
        }

        [Fact]
        public void MarkUndone_KeepsItUndone_WhenAlreadyNotDone() {
            // Arrange
            var todo = TodoTestsUtils.CreateTodo(isDone: false);

            // Act
            todo.MarkUndone();

            // Assert
            todo.IsDone.Should().BeFalse();
        }

        [Theory]
        [InlineData(true, false)]
        [InlineData(false, true)]
        public void ToggleDone_FlipsCompletionState(bool initial, bool expected) {
            // Arrange
            var todo = TodoTestsUtils.CreateTodo(isDone: initial);

            // Act
            todo.ToggleDone();

            // Assert
            todo.IsDone.Should().Be(expected);
        }
    }
}
