#pragma warning disable CA1707 // Identifiers should not contain underscores
#pragma warning disable CA1515 // Consider making public types internal
#pragma warning disable CA1034 // Nested types should not be visible

using Fanoos.Common.Domain;
using Fanoos.Domain.Todos;
using FluentAssertions;

namespace Fanoos.Domain.Tests.Unit.Todos;

public sealed partial class TodoTests {
    public sealed class Creation {
        [Fact]
        public void Create_ShouldCreateTodo_WhenTitleIsValid() {
            // Arrange
            const string title = "Buy milk!";

            // Act
            var todoResult = TodoTestsUtils.CreateTodo(
                title: NotEmptyString.Create(title).Value
            );

            // Assert
            todoResult.Value.Title.Value.Should().Be(title);
        }

        [Fact]
        public void Create_ShouldFail_WhenTodoIsUrgentAndInSomedayBucket() {
            // Arrange
            // Act
            var todoResult = TodoTestsUtils.CreateTodo(isUrgent: true, bucket: TodoBucket.SomedayMaybe);

            // Assert
            todoResult.IsError.Should().BeTrue();
            todoResult.FirstError.Should().Be(TodoErrors.UrgentTodoCannotBeInSomedayBucket);
        }
    }
}
