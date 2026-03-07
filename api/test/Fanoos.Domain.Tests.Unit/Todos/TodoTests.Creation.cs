#pragma warning disable CA1707 // Identifiers should not contain underscores
#pragma warning disable CA1515 // Consider making public types internal
#pragma warning disable CA1034 // Nested types should not be visible

using Fanoos.Domain.Todos;
using FluentAssertions;

namespace Fanoos.Domain.Tests.Unit.Todos;

public sealed partial class TodoTests {
    public sealed class Creation {
        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("    ")]
        public void Create_ShouldReturnError_WhenTitleIsInvalid(string? invalidTitle) {
            // Arrange
            // Act
            var todoResult = Todo.Create(
                id: null,
                isArchived: null,
                isDone: null,
                isUrgent: null,
                isImportant: null,
                bucket: null,
                energy: null,
                tag: null,
                time: null,
                project: null,
                context: null,
                title: invalidTitle!
            );

            // Assert
            todoResult.IsError.Should().BeTrue();
            todoResult.FirstError.Should().Be(TodoErrors.TitleIsEmpty);
        }

        [Fact]
        public void Create_ShouldCreateTodo_WhenTitleIsValid() {
            // Arrange
            const string providedTitle = "Buy milk!";
            const string expectedTitle = providedTitle;

            // Act
            var todo = TodoTestsUtils.CreateTodo(title: providedTitle);

            // Assert
            todo.Title.Should().Be(expectedTitle);
        }

        [Fact]
        public void Create_ShouldGenerateNewId_WhenIdIsNull() {
            // Arrange
            Guid? providedId = null;

            // Act
            var todo = TodoTestsUtils.CreateTodo(id: providedId);

            // Assert
            todo.Id.Should().NotBe(Guid.Empty);
        }

        [Fact]
        public void Create_ShouldUseProvidedId_WhenIdIsProvided() {
            // Arrange
            Guid providedId = Guid.NewGuid();
            Guid expectedId = providedId;

            // Act
            var todo = TodoTestsUtils.CreateTodo(id: providedId);

            // Assert
            todo.Id.Should().Be(expectedId);
        }

        [Fact]
        public void Create_ShouldDefaultBucketToUncategorized_WhenBucketIsNull() {
            // Arrange
            TodoBucket? selectedBucket = null;
            TodoBucket defaultBucket = TodoBucket.Uncategorized;

            // Act
            var todo = TodoTestsUtils.CreateTodo(bucket: selectedBucket);

            // Assert
            todo.Bucket.Should().Be(defaultBucket);
        }

        [Fact]
        public void Create_ShouldDefaultIsArchivedToFalse_WhenNull() {
            // Arrange
            bool? providedIsArchived = null;
            bool expectedIsArchived = false;

            // Act
            var todo = TodoTestsUtils.CreateTodo(isArchived: providedIsArchived);

            // Assert
            todo.IsArchived.Should().Be(expectedIsArchived);
        }

        [Fact]
        public void Create_ShouldDefaultIsDoneToFalse_WhenNull() {
            // Arrange
            bool? providedIsDone = null;
            bool expectedIsDone = false;

            // Act
            var todo = TodoTestsUtils.CreateTodo(isDone: providedIsDone);

            // Assert
            todo.IsDone.Should().Be(expectedIsDone);
        }

        [Fact]
        public void Create_ShouldDefaultIsImportantToFalse_WhenNull() {
            // Arrange
            bool? providedIsImportant = null;
            bool expectedIsImportant = false;

            // Act
            var todo = TodoTestsUtils.CreateTodo(isImportant: providedIsImportant);

            // Assert
            todo.IsImportant.Should().Be(expectedIsImportant);
        }

        [Fact]
        public void Create_ShouldDefaultIsUrgentToFalse_WhenNull() {
            // Arrange
            bool? providedIsUrgent = null;
            bool expectedIsUrgent = false;

            // Act
            var todo = TodoTestsUtils.CreateTodo(isUrgent: providedIsUrgent);

            // Assert
            todo.IsUrgent.Should().Be(expectedIsUrgent);
        }

        [Fact]
        public void Create_ShouldAssignContext_WhenProvided() {
            // Arrange
            string? providedContext = "SampleContext";
            string? expectedContext = providedContext;

            // Act
            var todo = TodoTestsUtils.CreateTodo(context: providedContext);

            // Assert
            todo.Context.Should().Be(expectedContext);
        }

        [Fact]
        public void Create_ShouldAssignProject_WhenProvided() {
            // Arrange
            string? providedProject = "SampleProject";
            string? expectedProject = providedProject;

            // Act
            var todo = TodoTestsUtils.CreateTodo(project: providedProject);

            // Assert
            todo.Project.Should().Be(expectedProject);
        }

        [Fact]
        public void Create_ShouldAssignTag_WhenProvided() {
            // Arrange
            string? providedTag = "SampleTag";
            string? expectedTag = providedTag;

            // Act
            var todo = TodoTestsUtils.CreateTodo(tag: providedTag);

            // Assert
            todo.Tag.Should().Be(expectedTag);
        }

        [Fact]
        public void Create_ShouldAssignTime_WhenProvided() {
            // Arrange
            int? providedTime = 2;
            int? expectedTime = providedTime;

            // Act
            var todo = TodoTestsUtils.CreateTodo(time: providedTime);

            // Assert
            todo.Time.Should().Be(expectedTime);
        }

        [Fact]
        public void Create_ShouldAssignEnergy_WhenProvided() {
            // Arrange
            EnergyLevel providedEnergy = EnergyLevel.Medium;
            EnergyLevel expectedEnergy = providedEnergy;

            // Act
            var todo = TodoTestsUtils.CreateTodo(energy: providedEnergy);

            // Assert
            todo.Energy.Should().Be(expectedEnergy);
        }
    }
}
