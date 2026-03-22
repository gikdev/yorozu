#pragma warning disable CA1707 // Identifiers should not contain underscores
#pragma warning disable CA1515 // Consider making public types internal
#pragma warning disable CA1034 // Nested types should not be visible

using Fanoos.Domain.Todos;
using FluentAssertions;

namespace Fanoos.Domain.Tests.Unit.Todos;

public sealed partial class TodoTests {
    public sealed class Miscellaneous {
        [Fact]
        public void SetPriority_ShouldErrorOnIsUrgent_WhenTodoIsInSomedayBucket() {
            // Arrange
            var todoResult = TodoTestsUtils.CreateTodo(bucket: TodoBucket.SomedayMaybe);

            // Act
            var priorityResult = todoResult.Value.SetUrgency(isUrgent: true);

            // Assert
            priorityResult.IsError.Should().BeTrue();
            priorityResult.FirstError.Should().Be(TodoErrors.UrgentTodoCannotBeInSomedayBucket);
        }

        [Fact]
        public void MoveToBucket_ChangesBucket() {
            // Arrange
            var startingBucket = TodoBucket.NextActions;
            var newBucket = TodoBucket.Waiting;
            var todoResult = TodoTestsUtils.CreateTodo(bucket: startingBucket);

            // Act
            todoResult.Value.MoveToBucket(newBucket);

            // Assert
            todoResult.Value.Bucket.Should().Be(newBucket);
        }

        [Fact]
        public void MoveToBucket_ShouldFail_WhenTodoIsUrgent_AndWantsToGoInSomedayBucket() {
            // Arrange
            var startingBucket = TodoBucket.Uncategorized;
            var newBucket = TodoBucket.SomedayMaybe;
            var todoResult = TodoTestsUtils.CreateTodo(bucket: startingBucket, isUrgent: true);

            // Act
            var moveResult = todoResult.Value.MoveToBucket(newBucket);

            // Assert
            moveResult.IsError.Should().BeTrue();
            moveResult.FirstError.Should().Be(TodoErrors.UrgentTodoCannotBeInSomedayBucket);
        }
    }
}
