#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace Fanoos.Infrastructure.Migrations;

/// <inheritdoc />
public partial class Initial : Migration {
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder) {
        migrationBuilder.EnsureSchema(
            name: "main"
        );

        migrationBuilder.CreateTable(
            name: "todos",
            schema: "main",
            columns: table => new {
                id = table.Column<Guid>(type: "uuid", nullable: false),
                title = table.Column<string>(type: "text", nullable: false),
                why = table.Column<string>(type: "text", nullable: true),
                description = table.Column<string>(type: "text", nullable: true),
                is_done = table.Column<bool>(type: "boolean", nullable: false),
                estimated_pomodoros = table.Column<byte>(type: "smallint", nullable: true),
                is_urgent = table.Column<bool>(type: "boolean", nullable: false),
                due_date = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                contexts = table.Column<string>(type: "text", nullable: false),
                priority = table.Column<int>(type: "integer", nullable: false),
                effort_type = table.Column<int>(type: "integer", nullable: false),
                energy_level = table.Column<int>(type: "integer", nullable: false),
                bucket = table.Column<int>(type: "integer", nullable: false),
                waiting_for_description = table.Column<string>(type: "text", nullable: true),
                waiting_for_review_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
            },
            constraints: table => {
                table.PrimaryKey("pk_todos", x => x.id);
            }
        );
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder) {
        migrationBuilder.DropTable(
            name: "todos",
            schema: "main"
        );
    }
}
