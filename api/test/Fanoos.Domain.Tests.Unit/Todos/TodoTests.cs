#pragma warning disable CA1707 // Identifiers should not contain underscores

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
        Assert.True(todo.IsError);
        Assert.Equal(todo.FirstError, TodoErrors.RawInputIsEmpty);
    }

    [Fact]
    public void ShouldExtractTitleProperly_WhenRawInputHasProperTitle() {
        // Given
        string rawTitle = "Do sth";

        // When
        ErrorOr<Todo> todoResult = Todo.FromRaw(rawTitle);
        Todo todo = todoResult.Value;

        // Then
        Assert.False(todoResult.IsError);
        Assert.Equal(todo.Title, rawTitle);
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
        Assert.False(todoResult.IsError);
        Assert.Equal(todo.Context, sampleContext);
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
        Assert.False(todoResult.IsError);
        Assert.Equal(todo.Project, sampleProject);
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
        Assert.False(todoResult.IsError);
        Assert.Equal(todo.Time, sampleTime);
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
        Assert.False(todoResult.IsError);
        Assert.Equal(todo.Tag, sampleTag);
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
        Assert.False(todoResult.IsError);
        Assert.Equal(todo.Energy, finalSampleEnergy);
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
        Assert.False(todoResult.IsError);
        Assert.DoesNotContain("$", todo.Title, StringComparison.InvariantCultureIgnoreCase);
    }

    [Fact]
    public void ShouldSetIsImportant_WhenRawInputIsStarOnly() {
        // Arrange
        string raw = ".* Do task";

        // Act
        var todo = Todo.FromRaw(raw).Value;

        // Assert
        Assert.True(todo.IsImportant);
    }

    [Fact]
    public void ShouldSetIsUrgent_WhenRawInputIsExclamationOnly() {
        // Arrange
        string raw = ".! Do task";

        // Act
        var todo = Todo.FromRaw(raw).Value;

        // Assert
        Assert.True(todo.IsUrgent);
    }

    [Fact]
    public void ShouldSetBothUrgentAndImportant_WhenRawInputIsExclamationStar() {
        // Arrange
        string raw = ".*! Do task";

        // Act
        var todo = Todo.FromRaw(raw).Value;

        // Assert
        Assert.True(todo.IsImportant);
        Assert.True(todo.IsUrgent);
    }

    [Fact]
    public void ShouldNotMisinterpretInternalAsterisk_WhenCheckingPriority() {
        // Arrange
        string raw = "Task with * inside title";

        // Act
        var todo = Todo.FromRaw(raw).Value;

        // Assert
        Assert.False(todo.IsImportant);
        Assert.Equal(todo.Title, raw);
    }

    [Theory]
    [InlineData(".!* Do sth @ctx +proj #tag ~10 .$$$")]
    [InlineData(".*! Do sth @ctx +proj #tag ~10 .$$$")]
    public void ShouldHandleMixedAnnotationsBeforeEnergy_WhenAllMarkersPresent(string raw) {
        // Arrange
        // Act
        var todo = Todo.FromRaw(raw).Value;

        // Assert
        Assert.True(todo.IsImportant);
        Assert.True(todo.IsUrgent);
        Assert.Equal("ctx", todo.Context);
        Assert.Equal("proj", todo.Project);
        Assert.Equal("tag", todo.Tag);
        Assert.Equal(10, todo.Time);
        Assert.Equal(EnergyLevel.High, todo.Energy);
    }

    [Fact]
    public void ShouldPreserveTitleText_WhenAnnotationMarkerIsNotFollowedByToken() {
        // Arrange
        string raw = "Call Mike about the @ symbol";

        // Act
        var todo = Todo.FromRaw(raw).Value;

        // Assert
        Assert.Equal("Call Mike about the @ symbol", todo.Title);
        Assert.Null(todo.Context);
    }

    [Fact]
    public void ShouldNotStripInternalPriorityMarkersFromTitle_WhenNotAtStart() {
        // Arrange
        string raw = "Task to review the * feature";

        // Act
        var todo = Todo.FromRaw(raw).Value;

        // Assert
        Assert.Equal("Task to review the * feature", todo.Title);
    }

    [Fact]
    public void ShouldNotIncludeEmptyOrFalseMarkersInRawString_WhenItemIsNotDoneOrArchived() {
        // Arrange
        var todo = Todo.FromRaw("Clean slate task").Value;

        // Act
        string raw = todo.ToRawString();

        // Assert
        Assert.Equal("Clean slate task", raw);
    }

    [Fact]
    public void UpdateTitle_ShouldCorrectlyRecalculateAllFieldsFromNewRawString() {
        // Arrange
        var todo = Todo.FromRaw("Old Title @oldctx +oldproj").Value;
        string newRaw = ".* New Title @newctx +newproj #newtag ~40 .$$$";

        // Act
        todo.UpdateTitle(newRaw);

        // Assert
        Assert.True(todo.IsImportant);
        Assert.False(todo.IsUrgent);
        Assert.Equal("New Title", todo.Title.Trim());
        Assert.Equal("newctx", todo.Context);
        Assert.Equal("newproj", todo.Project);
        Assert.Equal("newtag", todo.Tag);
        Assert.Equal(40, todo.Time);
        Assert.Equal(EnergyLevel.High, todo.Energy);
    }
}
