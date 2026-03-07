#pragma warning disable CA1707 // Identifiers should not contain underscores
#pragma warning disable CA1034 // Nested types should not be visible

using FluentAssertions;
using ErrorOr;
using Fanoos.Domain.Todos;

namespace Fanoos.Domain.Tests.Unit.Todos;

public class TodoTests {
    public class FromRaw {
        [Fact]
        public void ShouldReturnValidationError_WhenRawInputIsEmpty() {
            // Given
            string emptyRawInput = "";

            // When
            ErrorOr<Todo> todo = Todo.FromRaw(emptyRawInput);

            // Then
            todo.IsError.Should().BeTrue();
            todo.FirstError.Should().Be(TodoErrors.RawInputIsEmpty);
        }

        [Fact]
        public void ShouldExtractTitleProperly_WhenRawInputHasProperTitle() {
            // Given
            string rawTitle = "Do sth";

            // When
            ErrorOr<Todo> todoResult = Todo.FromRaw(rawTitle);
            Todo todo = todoResult.Value;

            // Then
            todoResult.IsError.Should().BeFalse();
            todo.Title.Should().Be(rawTitle);
        }

        [Fact]
        public void ShouldExtractContext_WhenRawInputHasProperContext() {
            // Given
            string sampleContext = "pc";
            string rawInput = $"Do sth @{sampleContext}";

            // When
            ErrorOr<Todo> todoResult = Todo.FromRaw(rawInput);
            Todo todo = todoResult.Value;

            // Then
            todoResult.IsError.Should().BeFalse();
            todo.Context.Should().Be(sampleContext);
        }

        [Fact]
        public void ShouldExtractProjectProperly_WhenRawInputHasProperProject() {
            // Given
            string sampleProject = "MyTodoApp";
            string rawInput = $"Do sth +{sampleProject}";

            // When
            ErrorOr<Todo> todoResult = Todo.FromRaw(rawInput);
            Todo todo = todoResult.Value;

            // Then
            todoResult.IsError.Should().BeFalse();
            todo.Project.Should().Be(sampleProject);
        }

        [Fact]
        public void ShouldExtractTimeProperly_WhenRawInputHasProperTime() {
            // Given
            int sampleTime = 2;
            string rawInput = $"Do sth ~{sampleTime}";

            // When
            ErrorOr<Todo> todoResult = Todo.FromRaw(rawInput);
            Todo todo = todoResult.Value;

            // Then
            todoResult.IsError.Should().BeFalse();
            todo.Time.Should().Be(sampleTime);
        }

        [Fact]
        public void ShouldExtractTagProperly_WhenRawInputHasProperTag() {
            // Given
            string sampleTag = "cool";
            string rawInput = $"Do sth #{sampleTag}";

            // When
            ErrorOr<Todo> todoResult = Todo.FromRaw(rawInput);
            Todo todo = todoResult.Value;

            // Then
            todoResult.IsError.Should().BeFalse();
            todo.Tag.Should().Be(sampleTag);
        }

        [Fact]
        public void ShouldExtractEnergyProperly_WhenRawInputHasProperEnergy() {
            // Given
            string rawSampleEnergy = ".$$$";
            EnergyLevel finalSampleEnergy = EnergyLevel.High;
            string rawInput = $"Do sth {rawSampleEnergy}";

            // When
            ErrorOr<Todo> todoResult = Todo.FromRaw(rawInput);
            Todo todo = todoResult.Value;

            // Then
            todoResult.IsError.Should().BeFalse();
            todo.Energy.Should().Be(finalSampleEnergy);
        }

        [Theory]
        [InlineData("Do sth .$")]
        [InlineData("Do sth .$$")]
        [InlineData("Do sth .$$$")]
        [InlineData("Do sth @sth +sth .$")]
        [InlineData("Do sth @sth +sth .$$")]
        [InlineData("Do sth @sth +sth .$$$")]
        [InlineData("Do sth @sth .$ +sth")]
        [InlineData("Do sth @sth .$$ +sth")]
        [InlineData("Do sth @sth .$$$ +sth")]
        [InlineData("Do sth .$ @sth +sth")]
        [InlineData("Do sth .$$ @sth +sth")]
        [InlineData("Do sth .$$$ @sth +sth")]
        public void ShouldNotHaveExcessDollarSign_WhenRawInputHasEnergyLevel(string rawInput) {
            // Given
            // When
            ErrorOr<Todo> todoResult = Todo.FromRaw(rawInput);
            Todo todo = todoResult.Value;

            // Then
            todoResult.IsError.Should().BeFalse();
            todo.Title.Should().NotContain("$");
        }

        [Fact]
        public void ShouldSetIsImportant_WhenRawInputIsStarOnly() {
            // Arrange
            string raw = ".* Do task";

            // Act
            var todo = Todo.FromRaw(raw).Value;

            // Assert
            todo.IsImportant.Should().BeTrue();
        }

        [Fact]
        public void ShouldSetIsUrgent_WhenRawInputIsExclamationOnly() {
            // Arrange
            string raw = ".! Do task";

            // Act
            var todo = Todo.FromRaw(raw).Value;

            // Assert
            todo.IsUrgent.Should().BeTrue();
        }

        [Fact]
        public void ShouldSetBothUrgentAndImportant_WhenRawInputIsExclamationStar() {
            // Arrange
            string raw = ".*! Do task";

            // Act
            var todo = Todo.FromRaw(raw).Value;

            // Assert
            todo.IsImportant.Should().BeTrue();
            todo.IsUrgent.Should().BeTrue();
        }

        [Fact]
        public void ShouldNotMisinterpretInternalAsterisk_WhenCheckingPriority() {
            // Arrange
            string raw = "Task with * inside title";

            // Act
            var todo = Todo.FromRaw(raw).Value;

            // Assert
            todo.IsImportant.Should().BeFalse();
            todo.Title.Should().Be(raw);
        }

        [Theory]
        [InlineData(".!* Do sth @ctx +proj #tag ~10 .$$$")]
        [InlineData(".*! Do sth @ctx +proj #tag ~10 .$$$")]
        public void ShouldHandleMixedAnnotationsBeforeEnergy_WhenAllMarkersPresent(string raw) {
            // Arrange
            // Act
            var todo = Todo.FromRaw(raw).Value;

            // Assert
            todo.IsImportant.Should().BeTrue();
            todo.IsUrgent.Should().BeTrue();
            todo.Context.Should().Be("ctx");
            todo.Project.Should().Be("proj");
            todo.Tag.Should().Be("tag");
            todo.Time.Should().Be(10);
            todo.Energy.Should().Be(EnergyLevel.High);
        }

        [Fact]
        public void ShouldPreserveTitleText_WhenAnnotationMarkerIsNotFollowedByToken() {
            // Arrange
            string raw = "Call Mike about the @ symbol";

            // Act
            var todo = Todo.FromRaw(raw).Value;

            // Assert
            todo.Title.Should().Be("Call Mike about the @ symbol");
            todo.Context.Should().BeNull();
        }

        [Fact]
        public void ShouldNotStripInternalPriorityMarkersFromTitle_WhenNotAtStart() {
            // Arrange
            string raw = "Task to review the * feature";

            // Act
            var todo = Todo.FromRaw(raw).Value;

            // Assert
            todo.Title.Should().Be("Task to review the * feature");
        }

        [Fact]
        public void ShouldNotIncludeEmptyOrFalseMarkersInRawString_WhenItemIsNotDoneOrArchived() {
            // Arrange
            var todo = Todo.FromRaw("Clean slate task").Value;

            // Act
            string raw = todo.ToRawString();

            // Assert
            raw.Should().Be("Clean slate task");
        }

        [Fact]
        public void ShouldHaveBucketAsUncategorized_ByDefault() {
            // Arrange
            var todo = Todo.FromRaw("Sth").Value;

            // Act
            var isSame = todo.Bucket == TodoBucket.Uncategorized;

            // Assert
            isSame.Should().BeTrue();
        }
    }

    public class UpdateTitle {
        [Fact]
        public void ShouldCorrectlyRecalculateAllFieldsFromNewRawString() {
            // Arrange
            var todo = Todo.FromRaw("Old Title @oldctx +oldproj").Value;
            string newRaw = ".* New Title @newctx +newproj #newtag ~40 .$$$";

            // Act
            todo.UpdateTitle(newRaw);

            // Assert
            todo.IsImportant.Should().BeTrue();
            todo.IsUrgent.Should().BeFalse();
            todo.Title.Trim().Should().Be("New Title");
            todo.Context.Should().Be("newctx");
            todo.Project.Should().Be("newproj");
            todo.Tag.Should().Be("newtag");
            todo.Time.Should().Be(40);
            todo.Energy.Should().Be(EnergyLevel.High);
        }
    }

    public class Create {
        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("    ")]
        public void ShouldReturnError_WhenTitleIsInvalid(string? invalidTitle) {
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
        public void ShouldCreateTodo_WhenTitleIsValid() {
            // Arrange
            const string providedTitle = "Buy milk!";
            const string expectedTitle = providedTitle;

            // Act
            var todo = CreateTodo(title: providedTitle);

            // Assert
            todo.Title.Should().Be(expectedTitle);
        }

        [Fact]
        public void ShouldGenerateNewId_WhenIdIsNull() {
            // Arrange
            Guid? providedId = null;

            // Act
            var todo = CreateTodo(id: providedId);

            // Assert
            todo.Id.Should().NotBe(Guid.Empty);
        }

        [Fact]
        public void ShouldUseProvidedId_WhenIdIsProvided() {
            // Arrange
            Guid providedId = Guid.NewGuid();
            Guid expectedId = providedId;

            // Act
            var todo = CreateTodo(id: providedId);

            // Assert
            todo.Id.Should().Be(expectedId);
        }

        [Fact]
        public void ShouldDefaultBucketToUncategorized_WhenBucketIsNull() {
            // Arrange
            TodoBucket? selectedBucket = null;
            TodoBucket defaultBucket = TodoBucket.Uncategorized;

            // Act
            var todoResult = Todo.Create(
                id: null,
                isArchived: null,
                isDone: null,
                isUrgent: null,
                isImportant: null,
                bucket: selectedBucket,
                energy: null,
                tag: null,
                time: null,
                project: null,
                context: null,
                title: "Sth"
            );
            var todo = todoResult.Value;

            // Assert
            todoResult.IsError.Should().BeFalse();
            todo.Bucket.Should().Be(defaultBucket);
        }

        [Fact]
        public void ShouldDefaultIsArchivedToFalse_WhenNull() {
            // Arrange
            bool? providedIsArchived = null;
            bool expectedIsArchived = false;

            // Act
            var todoResult = Todo.Create(
                id: null,
                isArchived: providedIsArchived,
                isDone: null,
                isUrgent: null,
                isImportant: null,
                bucket: null,
                energy: null,
                tag: null,
                time: null,
                project: null,
                context: null,
                title: "Sth"
            );
            var todo = todoResult.Value;

            // Assert
            todoResult.IsError.Should().BeFalse();
            todo.IsArchived.Should().Be(expectedIsArchived);
        }

        [Fact]
        public void ShouldDefaultIsDoneToFalse_WhenNull() {
            // Arrange
            bool? providedIsDone = null;
            bool expectedIsDone = false;

            // Act
            var todoResult = Todo.Create(
                id: null,
                isArchived: null,
                isDone: providedIsDone,
                isUrgent: null,
                isImportant: null,
                bucket: null,
                energy: null,
                tag: null,
                time: null,
                project: null,
                context: null,
                title: "Sth"
            );
            var todo = todoResult.Value;

            // Assert
            todoResult.IsError.Should().BeFalse();
            todo.IsDone.Should().Be(expectedIsDone);
        }

        [Fact]
        public void ShouldDefaultIsImportantToFalse_WhenNull() {
            // Arrange
            bool? providedIsImportant = null;
            bool expectedIsImportant = false;

            // Act
            var todoResult = Todo.Create(
                id: null,
                isArchived: null,
                isDone: null,
                isUrgent: null,
                isImportant: providedIsImportant,
                bucket: null,
                energy: null,
                tag: null,
                time: null,
                project: null,
                context: null,
                title: "Sth"
            );
            var todo = todoResult.Value;

            // Assert
            todoResult.IsError.Should().BeFalse();
            todo.IsImportant.Should().Be(expectedIsImportant);
        }

        [Fact]
        public void ShouldDefaultIsUrgentToFalse_WhenNull() {
            // Arrange
            bool? providedIsUrgent = null;
            bool expectedIsUrgent = false;

            // Act
            var todoResult = Todo.Create(
                id: null,
                isArchived: null,
                isDone: null,
                isUrgent: providedIsUrgent,
                isImportant: null,
                bucket: null,
                energy: null,
                tag: null,
                time: null,
                project: null,
                context: null,
                title: "Sth"
            );
            var todo = todoResult.Value;

            // Assert
            todoResult.IsError.Should().BeFalse();
            todo.IsUrgent.Should().Be(expectedIsUrgent);
        }

        [Fact]
        public void ShouldAssignContext_WhenProvided() {
            // Arrange
            string? providedContext = "SampleContext";
            string? expectedContext = providedContext;

            // Act
            var todo = CreateTodo(
                context: providedContext
            );

            // Assert
            todo.Context.Should().Be(expectedContext);
        }

        [Fact]
        public void ShouldAssignProject_WhenProvided() {
            // Arrange
            string? providedProject = "SampleProject";
            string? expectedProject = providedProject;

            // Act
            var todo = CreateTodo(
                project: providedProject
            );

            // Assert
            todo.Project.Should().Be(expectedProject);
        }

        [Fact]
        public void ShouldAssignTag_WhenProvided() {
            // Arrange
            string? providedTag = "SampleTag";
            string? expectedTag = providedTag;

            // Act
            var todo = CreateTodo(
                tag: providedTag
            );

            // Assert
            todo.Tag.Should().Be(expectedTag);
        }

        [Fact]
        public void ShouldAssignTime_WhenProvided() {
            // Arrange
            int? providedTime = 2;
            int? expectedTime = providedTime;

            // Act
            var todo = CreateTodo(
                time: providedTime
            );

            // Assert
            todo.Time.Should().Be(expectedTime);
        }

        [Fact]
        public void ShouldAssignEnergy_WhenProvided() {
            // Arrange
            EnergyLevel providedEnergy = EnergyLevel.Medium;
            EnergyLevel expectedEnergy = providedEnergy;

            // Act
            var todo = CreateTodo(
                energy: providedEnergy
            );

            // Assert
            todo.Energy.Should().Be(expectedEnergy);
        }

        private static Todo CreateTodo(
            string title = "Sth",
            string? context = null,
            string? tag = null,
            string? project = null,
            int? time = null,
            EnergyLevel? energy = null,
            Guid? id = null
        ) {
            var result = Todo.Create(
                id: id,
                isArchived: null,
                isDone: null,
                isUrgent: null,
                isImportant: null,
                bucket: null,
                energy: energy,
                tag: tag,
                time: time,
                project: project,
                context: context,
                title: title
            );

            if (result.IsError) throw new InvalidOperationException("CreateTodo result was an error!");

            return result.Value;
        }
    }
}
