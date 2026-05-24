#pragma warning disable CA1707 // Identifiers should not contain underscores
#pragma warning disable CA1515 // Consider making public types internal
#pragma warning disable CA1034 // Nested types should not be visible

using FluentAssertions;

namespace Yorozu.Domain.Tests.Unit.Todos;

public sealed partial class TodoTests {
    public sealed class Completion {
        [Fact]
        public void MarkDone_MarksTodoAsDone() {
            // Arrange
            var todoResult = TodoTestsUtils.CreateTodo(isDone: false);

            // Act
            todoResult.Value.MarkDone();

            // Assert
            todoResult.Value.IsDone.Should().BeTrue();
        }

        [Fact]
        public void MarkDone_KeepsItDone_WhenAlreadyDone() {
            // Arrange
            var todoResult = TodoTestsUtils.CreateTodo(isDone: true);

            // Act
            todoResult.Value.MarkDone();

            // Assert
            todoResult.Value.IsDone.Should().BeTrue();
        }

        [Fact]
        public void MarkUndone_MarksTodoAsUndone() {
            // Arrange
            var todoResult = TodoTestsUtils.CreateTodo(isDone: true);

            // Act
            todoResult.Value.MarkUndone();

            // Assert
            todoResult.Value.IsDone.Should().BeFalse();
        }

        [Fact]
        public void MarkUndone_KeepsItUndone_WhenAlreadyNotDone() {
            // Arrange
            var todoResult = TodoTestsUtils.CreateTodo(isDone: false);

            // Act
            todoResult.Value.MarkUndone();

            // Assert
            todoResult.Value.IsDone.Should().BeFalse();
        }

        [Theory]
        [InlineData(true, false)]
        [InlineData(false, true)]
        public void ToggleDone_FlipsCompletionState(bool initial, bool expected) {
            // Arrange
            var todoResult = TodoTestsUtils.CreateTodo(isDone: initial);

            // Act
            todoResult.Value.ToggleDone();

            // Assert
            todoResult.Value.IsDone.Should().Be(expected);
        }
    }
}
