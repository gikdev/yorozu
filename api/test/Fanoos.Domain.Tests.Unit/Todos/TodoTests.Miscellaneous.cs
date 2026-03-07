#pragma warning disable CA1707 // Identifiers should not contain underscores
#pragma warning disable CA1515 // Consider making public types internal
#pragma warning disable CA1034 // Nested types should not be visible

using Fanoos.Domain.Todos;
using FluentAssertions;

namespace Fanoos.Domain.Tests.Unit.Todos;

public sealed partial class TodoTests {
    public sealed class Miscellaneous {
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

        [Fact]
        public void SetTitle_ChangesTitle() {
            // Arrange
            var startingTitle = "Starting title";
            var newTitle = "New Title";
            var todoResult = TodoTestsUtils.CreateTodo(title: startingTitle);

            // Act
            todoResult.Value.SetTitle(newTitle);

            // Assert
            todoResult.Value.Title.Should().Be(newTitle);
        }

        [Theory]
        [InlineData(null, null, null)]
        [InlineData(1, null, null)]
        [InlineData(null, 1, 1)]
        [InlineData(1, 2, 2)]
        public void SetTime_ChangesTime(int? startingTime, int? newTime, int? expectedTime) {
            // Arrange
            var todoResult = TodoTestsUtils.CreateTodo(time: startingTime);

            // Act
            todoResult.Value.SetTime(newTime);

            // Assert
            todoResult.Value.Time.Should().Be(expectedTime);
        }

        [Theory]
        [InlineData(null, null, null)]
        [InlineData("Work", null, null)]
        [InlineData(null, "Personal", "Personal")]
        [InlineData("Errand", "Shopping", "Shopping")]
        public void SetTag_ChangesTag(string? startingTag, string? newTag, string? expectedTag) {
            // Arrange
            var todoResult = TodoTestsUtils.CreateTodo(tag: startingTag);

            // Act
            todoResult.Value.SetTag(newTag);

            // Assert
            todoResult.Value.Tag.Should().Be(expectedTag);
        }

        [Theory]
        [InlineData(null, null, null)]
        [InlineData("Home", null, null)]
        [InlineData(null, "Office", "Office")]
        [InlineData("Garden", "Yard", "Yard")]
        public void SetProject_ChangesProject(string? startingProject, string? newProject, string? expectedProject) {
            // Arrange
            var todoResult = TodoTestsUtils.CreateTodo(project: startingProject);

            // Act
            todoResult.Value.SetProject(newProject);

            // Assert
            todoResult.Value.Project.Should().Be(expectedProject);
        }

        [Theory]
        [InlineData(null, null, null)]
        [InlineData("Phone", null, null)]
        [InlineData(null, "Computer", "Computer")]
        [InlineData("Online", "Offline", "Offline")]
        public void SetContext_ChangesContext(string? startingContext, string? newContext, string? expectedContext) {
            // Arrange
            var todoResult = TodoTestsUtils.CreateTodo(context: startingContext);

            // Act
            todoResult.Value.SetContext(newContext);

            // Assert
            todoResult.Value.Context.Should().Be(expectedContext);
        }

        [Theory]
        [InlineData(EnergyLevel.None, EnergyLevel.None, EnergyLevel.None)]
        [InlineData(EnergyLevel.High, EnergyLevel.None, EnergyLevel.None)]
        [InlineData(EnergyLevel.None, EnergyLevel.Low, EnergyLevel.Low)]
        [InlineData(EnergyLevel.Medium, EnergyLevel.High, EnergyLevel.High)]
        public void SetEnergyLevel_ChangesEnergyLevel(EnergyLevel startingEnergyLevel, EnergyLevel newEnergyLevel, EnergyLevel expectedEnergyLeve) {
            // Arrange
            var todoResult = TodoTestsUtils.CreateTodo(energyLevel: startingEnergyLevel);

            // Act
            todoResult.Value.SetEnergyLevel(newEnergyLevel);

            // Assert
            todoResult.Value.EnergyLevel.Should().Be(expectedEnergyLeve);
        }
    }
}
