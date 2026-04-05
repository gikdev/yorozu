using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Fanoos.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "main");

            migrationBuilder.CreateTable(
                name: "todos",
                schema: "main",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "TEXT", nullable: false),
                    title = table.Column<string>(type: "TEXT", nullable: false),
                    why = table.Column<string>(type: "TEXT", nullable: true),
                    description = table.Column<string>(type: "TEXT", nullable: true),
                    is_done = table.Column<bool>(type: "INTEGER", nullable: false),
                    estimated_pomodoros = table.Column<byte>(type: "INTEGER", nullable: true),
                    is_urgent = table.Column<bool>(type: "INTEGER", nullable: false),
                    due_date = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    contexts = table.Column<string>(type: "TEXT", nullable: false),
                    priority = table.Column<int>(type: "INTEGER", nullable: false),
                    effort_type = table.Column<int>(type: "INTEGER", nullable: false),
                    energy_level = table.Column<int>(type: "INTEGER", nullable: false),
                    bucket = table.Column<int>(type: "INTEGER", nullable: false),
                    waiting_for_description = table.Column<string>(type: "TEXT", nullable: true),
                    waiting_for_review_at = table.Column<DateTimeOffset>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_todos", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "todos",
                schema: "main");
        }
    }
}
