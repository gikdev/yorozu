#pragma warning disable CA1707 // Identifiers should not contain underscores
#pragma warning disable CA1515 // Consider making public types internal
#pragma warning disable CA1034 // Nested types should not be visible

using ErrorOr;
using Fanoos.Domain.Todos;
using FluentAssertions;

namespace Fanoos.Domain.Tests.Unit.Todos;

public sealed partial class TodoTests {
    public sealed class Parsing {
        [Fact]
        public void FromRaw_ShouldReturnValidationError_WhenRawInputIsEmpty() {
            // Given
            string emptyRawInput = "";

            // When
            ErrorOr<Todo> todo = Todo.FromRaw(emptyRawInput);

            // Then
            todo.IsError.Should().BeTrue();
            todo.FirstError.Should().Be(TodoErrors.RawInputIsEmpty);
        }

        [Fact]
        public void FromRaw_ShouldExtractTitleProperly_WhenRawInputHasProperTitle() {
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
        public void FromRaw_ShouldExtractContext_WhenRawInputHasProperContext() {
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
        public void FromRaw_ShouldExtractProjectProperly_WhenRawInputHasProperProject() {
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
        public void FromRaw_ShouldExtractTimeProperly_WhenRawInputHasProperTime() {
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
        public void FromRaw_ShouldExtractTagProperly_WhenRawInputHasProperTag() {
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
        public void FromRaw_ShouldExtractEnergyProperly_WhenRawInputHasProperEnergy() {
            // Given
            string rawSampleEnergy = ".$$$";
            EnergyLevel finalSampleEnergy = EnergyLevel.High;
            string rawInput = $"Do sth {rawSampleEnergy}";

            // When
            ErrorOr<Todo> todoResult = Todo.FromRaw(rawInput);
            Todo todo = todoResult.Value;

            // Then
            todoResult.IsError.Should().BeFalse();
            todo.EnergyLevel.Should().Be(finalSampleEnergy);
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
        public void FromRaw_ShouldNotHaveExcessDollarSign_WhenRawInputHasEnergyLevel(string rawInput) {
            // Given
            // When
            ErrorOr<Todo> todoResult = Todo.FromRaw(rawInput);
            Todo todo = todoResult.Value;

            // Then
            todoResult.IsError.Should().BeFalse();
            todo.Title.Should().NotContain("$");
        }

        [Fact]
        public void FromRaw_ShouldSetIsImportant_WhenRawInputIsStarOnly() {
            // Arrange
            string raw = ".* Do task";

            // Act
            var todo = Todo.FromRaw(raw).Value;

            // Assert
            todo.IsImportant.Should().BeTrue();
        }

        [Fact]
        public void FromRaw_ShouldSetIsUrgent_WhenRawInputIsExclamationOnly() {
            // Arrange
            string raw = ".! Do task";

            // Act
            var todo = Todo.FromRaw(raw).Value;

            // Assert
            todo.IsUrgent.Should().BeTrue();
        }

        [Fact]
        public void FromRaw_ShouldSetBothUrgentAndImportant_WhenRawInputIsExclamationStar() {
            // Arrange
            string raw = ".*! Do task";

            // Act
            var todo = Todo.FromRaw(raw).Value;

            // Assert
            todo.IsImportant.Should().BeTrue();
            todo.IsUrgent.Should().BeTrue();
        }

        [Fact]
        public void FromRaw_ShouldNotMisinterpretInternalAsterisk_WhenCheckingPriority() {
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
        public void FromRaw_ShouldHandleMixedAnnotationsBeforeEnergy_WhenAllMarkersPresent(string raw) {
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
            todo.EnergyLevel.Should().Be(EnergyLevel.High);
        }

        [Fact]
        public void FromRaw_ShouldPreserveTitleText_WhenAnnotationMarkerIsNotFollowedByToken() {
            // Arrange
            string raw = "Call Mike about the @ symbol";

            // Act
            var todo = Todo.FromRaw(raw).Value;

            // Assert
            todo.Title.Should().Be("Call Mike about the @ symbol");
            todo.Context.Should().BeNull();
        }

        [Fact]
        public void FromRaw_ShouldNotStripInternalPriorityMarkersFromTitle_WhenNotAtStart() {
            // Arrange
            string raw = "Task to review the * feature";

            // Act
            var todo = Todo.FromRaw(raw).Value;

            // Assert
            todo.Title.Should().Be("Task to review the * feature");
        }

        [Fact]
        public void FromRaw_ShouldHaveBucketAsUncategorized_ByDefault() {
            // Arrange
            var todo = Todo.FromRaw("Sth").Value;

            // Act
            var isSame = todo.Bucket == TodoBucket.Uncategorized;

            // Assert
            isSame.Should().BeTrue();
        }

        [Theory]
        [InlineData(".x Sth", true)]
        [InlineData(".. Sth", false)]
        public void FromRaw_ShouldSetCompletionStateProperly(string rawInput, bool expectedCompletionState) {
            // Arrange
            // Act
            var todo = Todo.FromRaw(rawInput).Value;

            // Assert
            todo.IsDone.Should().Be(expectedCompletionState);
        }
    }
}
