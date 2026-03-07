#pragma warning disable CA1707 // Identifiers should not contain underscores
#pragma warning disable CA1515 // Consider making public types internal
#pragma warning disable CA1034 // Nested types should not be visible

using FluentAssertions;

namespace Fanoos.Domain.Tests.Unit.Todos;

public sealed partial class TodoTests {
    public sealed class Archiving {
        [Fact]
        public void Archive_ArchivesTodo() {
            // Arrange
            var todoResult = TodoTestsUtils.CreateTodo(isArchived: false);

            // Act
            todoResult.Value.Archive();

            // Assert
            todoResult.Value.IsArchived.Should().BeTrue();
        }

        [Fact]
        public void Unarchive_UnarchivesTodo() {
            // Arrange
            var todoResult = TodoTestsUtils.CreateTodo(isArchived: true);

            // Act
            todoResult.Value.Unarchive();

            // Assert
            todoResult.Value.IsArchived.Should().BeFalse();
        }

        [Theory]
        [InlineData(true, false)]
        [InlineData(false, true)]
        public void ToggleArchive_FlipsArchiveState(bool initial, bool expected) {
            // Arrange
            var todoResult = TodoTestsUtils.CreateTodo(isArchived: initial);

            // Act
            todoResult.Value.ToggleArchive();

            // Assert
            todoResult.Value.IsArchived.Should().Be(expected);
        }
    }
}
