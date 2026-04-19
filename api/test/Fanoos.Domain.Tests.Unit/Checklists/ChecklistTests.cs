using ErrorOr;
using Fanoos.Domain.Checklists;
using FluentAssertions;

namespace Fanoos.Domain.Tests.Unit.Checklists;

public class ChecklistTests {
    [Fact]
    public void ChecklistItem_ShouldBePending_WhenChecklistBecomesATemplate() {
        Checklist checklist = new() { Title = "Groceries" };
        Guid itemId = checklist.AddItem("Milk");
        checklist.SetItemState(itemId, ChecklistItemState.Skipped);

        checklist.ConvertToTemplate();

        checklist.Items[0].State.Should().Be(ChecklistItemState.Pending);
    }

    [Fact]
    public void InstantiatedChecklist_ShouldNotBeATemplate() {
        // Arrange
        var template = new Checklist { };

        // Act
        var instance = template.Instantiate(null);

        // Assert
        instance.IsTemplate.Should().BeFalse();
    }

    [Fact]
    public void Instantiate_ShouldCopyItemsInsteadOfReferencingThem() {
        // Arrange
        var template = new Checklist { };
        template.AddItem("Something");

        // Act
        var instance = template.Instantiate(null);

        // Assert
        instance.Items.Should().NotBeSameAs(template.Items);
        instance.Items.Count.Should().Be(template.Items.Count);
        instance.Items[0].Should().NotBeSameAs(template.Items[0]);
    }

    [Fact]
    public void Instantiate_ShouldUseNewTitle_WhenProvided() {
        // Arrange
        var template = new Checklist { };
        var newTitle = "Daily Tasks";

        // Act
        var instance = template.Instantiate(newTitle);

        // Assert
        instance.Title.Should().Be(newTitle);
    }

    [Fact]
    public void Instantiate_ShouldUseOriginalName_WhenNewNameIsNull() {
        // Arrange
        var title = "Original Title";
        var template = new Checklist { Title = title };

        // Act
        var instance = template.Instantiate(null);

        // Assert
        instance.Title.Should().Be(title);
    }

    [Fact]
    public void ConvertToTemplate_ResetsItemStates() {
        // Arrange
        var checklist = new Checklist { };
        Guid itemId = checklist.AddItem("ASP.NET Core");
        checklist.SetItemState(itemId, ChecklistItemState.Completed);

        // Act
        checklist.ConvertToTemplate();

        // Assert
        checklist.Items[0].State.Should().Be(ChecklistItemState.Pending);
    }

    [Fact]
    public void SetItemState_ShouldError_WhenIsTemplate() {
        // Arrange
        var checklist = new Checklist { };
        Guid itemId = checklist.AddItem("ASP.NET Core");
        checklist.ConvertToTemplate();

        // Act
        ErrorOr<Updated> result = checklist.SetItemState(itemId, ChecklistItemState.Completed);

        // Assert
        result.IsError.Should().BeTrue();
        result.FirstError.Should().Be(ChecklistErrors.TemplateItemStateIsImmutable);
    }
}
