#pragma warning disable CA1707 // Identifiers should not contain underscores
#pragma warning disable CA1034 // Nested types should not be visible
#pragma warning disable CA1515 // Consider making public types internal

using Fanoos.Domain.Habits;
using FluentAssertions;

namespace Fanoos.Domain.Tests.Unit.Habits;

public sealed partial class HabitTests {
    public sealed class Completions {
        private readonly static DateOnly _today = new(2026, 3, 8);

        [Fact]
        public void CycleCompletionStatus_ShouldCreateCompletionIfNotExists() {
            // Arrange
            Habit habit = HabitTestUtils.CreateHabit().Value;

            // Act
            habit.CycleCompletionStatus(_today);

            // Assert
            habit.Completions.Count.Should().Be(1);
        }

        [Fact]
        public void CycleCompletionStatus_ShouldCreateDoneStatusCompletionIfNotExists() {
            // Arrange
            Habit habit = HabitTestUtils.CreateHabit().Value;

            // Act
            var completion = habit.CycleCompletionStatus(_today).Value;

            // Assert
            completion.Status.Should().Be(HabitCompletionStatus.Done);
        }

        [Fact]
        public void CycleCompletionStatus_ShouldMoveToSkippedStatus_WhenCurrentStatusIsDone() {
            // Arrange
            Habit habit = HabitTestUtils.CreateHabit().Value;

            // Act
            habit.CycleCompletionStatus(_today);
            HabitCompletion completion = habit.CycleCompletionStatus(_today).Value;

            // Assert
            completion.Status.Should().Be(HabitCompletionStatus.Skipped);
        }

        [Fact]
        public void CycleCompletionStatus_ShouldMoveToNoneStatus_WhenCurrentStatusIsSkipped() {
            // Arrange
            Habit habit = HabitTestUtils.CreateHabit().Value;

            // Act
            habit.CycleCompletionStatus(_today); // _______ -> done
            habit.CycleCompletionStatus(_today); // done    -> skipped
            habit.CycleCompletionStatus(_today); // skipped -> none    

            // Assert
            habit.GetCompletionByDate(_today)!.Status
                .Should().Be(HabitCompletionStatus.None);
            habit.Completions.Count.Should().Be(1);
        }
    }
}
