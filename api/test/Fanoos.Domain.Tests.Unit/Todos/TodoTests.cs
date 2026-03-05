#pragma warning disable CA1707 // Identifiers should not contain underscores

using FluentAssertions;
using ErrorOr;
using Fanoos.Domain.Todos;

namespace Fanoos.Domain.Tests.Unit.Todos;

public class TodoTests {
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
    public void UpdateTitle_ShouldCorrectlyRecalculateAllFieldsFromNewRawString() {
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
