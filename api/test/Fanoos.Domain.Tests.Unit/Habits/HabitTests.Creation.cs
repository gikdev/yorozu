#pragma warning disable CA1707 // Identifiers should not contain underscores
#pragma warning disable CA1515 // Consider making public types internal
#pragma warning disable CA1034 // Nested types should not be visible

using Fanoos.Domain.Habits;
using FluentAssertions;

namespace Fanoos.Domain.Tests.Unit.Habits;

public sealed partial class HabitTests {
    public sealed class Creation {
        [Theory]
        [InlineData("")]
        [InlineData("   ")]
        public void Create_ShouldError_WhenNameIsInvalid(string? name) {
            // Arrange
            // Act
            var habitResult = HabitTestUtils.CreateHabit(name: name!);

            // Assert
            habitResult.IsError.Should().BeTrue();
            habitResult.FirstError.Should().Be(HabitErrors.NameIsEmpty);
        }

        [Fact]
        public void Create_ShouldNotError_WhenNameIsValid() {
            // Arrange
            var name = HabitTestUtils.ValidTitle;

            // Act
            var habitResult = HabitTestUtils.CreateHabit(name: name);

            // Assert
            habitResult.IsError.Should().BeFalse();
        }

        [Fact]
        public void Create_ShouldSetNameProperly() {
            // Arrange
            var name = HabitTestUtils.ValidTitle;

            // Act
            var habitResult = HabitTestUtils.CreateHabit(name: name);

            // Assert
            habitResult.Value.Name.Should().Be(name);
        }

        [Fact]
        public void Create_ShouldSetIdealCount_WhenProvided() {
            // Arrange
            var providedIdealCount = 2;
            var expectedIdealCount = providedIdealCount;

            // Act
            var habitResult = HabitTestUtils.CreateHabit(idealCount: providedIdealCount);

            // Assert
            habitResult.Value.IdealCount.Should().Be(expectedIdealCount);
        }

        [Fact]
        public void Create_ShouldSetDefaultIdealCount_WhenNotProvided() {
            // Arrange
            var defaultIdealCount = Habit.Defaults.IdealCount;

            // Act
            var habitResult = HabitTestUtils.CreateHabit();

            // Assert
            habitResult.Value.IdealCount.Should().Be(defaultIdealCount);
        }

        [Fact]
        public void Create_ShouldSetDescription_WhenProvided() {
            // Arrange
            var providedDescription = "Sth pretty stupid...";
            var expectedDescription = providedDescription;

            // Act
            var habitResult = HabitTestUtils.CreateHabit(description: providedDescription);

            // Assert
            habitResult.Value.Description.Should().Be(expectedDescription);
        }

        [Fact]
        public void Create_ShouldNotSetDescription_WhenNotProvided() {
            // Arrange
            // Act
            var habitResult = HabitTestUtils.CreateHabit();

            // Assert
            habitResult.Value.Description.Should().Be(null);
        }

        [Fact]
        public void Create_ShouldSetId_WhenProvided() {
            // Arrange
            var providedId = Guid.NewGuid();
            var expectedId = providedId;

            // Act
            var habitResult = HabitTestUtils.CreateHabit(id: providedId);

            // Assert
            habitResult.Value.Id.Should().Be(expectedId);
        }

        [Fact]
        public void Create_ShouldSetNewId_WhenNotProvided() {
            // Arrange
            // Act
            var habitResult = HabitTestUtils.CreateHabit();

            // Assert
            habitResult.Value.Id.Should().NotBeEmpty();
        }

        [Fact]
        public void Create_ShouldSetColor_WhenProvided() {
            // Arrange
            var providedColor = HabitColor.Tomato;
            var expectedColor = providedColor;

            // Act
            var habitResult = HabitTestUtils.CreateHabit(color: providedColor);

            // Assert
            habitResult.Value.Color.Should().Be(expectedColor);
        }

        [Fact]
        public void Create_ShouldSetDefaultColor_WhenNotProvided() {
            // Arrange
            var defaultColor = Habit.Defaults.Color;

            // Act
            var habitResult = HabitTestUtils.CreateHabit();

            // Assert
            habitResult.Value.Color.Should().Be(defaultColor);
        }

        [Fact]
        public void Create_ShouldSetIsArchived_WhenProvided() {
            // Arrange
            var providedIsArchived = true;
            var expectedIsArchived = providedIsArchived;

            // Act
            var habitResult = HabitTestUtils.CreateHabit(isArchived: providedIsArchived);

            // Assert
            habitResult.Value.IsArchived.Should().Be(expectedIsArchived);
        }

        [Fact]
        public void Create_ShouldSetDefaultIsArchived_WhenNotProvided() {
            // Arrange
            var defaultIsArchived = Habit.Defaults.IsArchived;

            // Act
            var habitResult = HabitTestUtils.CreateHabit();

            // Assert
            habitResult.Value.IsArchived.Should().Be(defaultIsArchived);
        }
    }
}
