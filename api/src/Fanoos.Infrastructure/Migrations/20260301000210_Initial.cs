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
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    title = table.Column<string>(type: "text", nullable: false),
                    context = table.Column<string>(type: "text", nullable: true),
                    project = table.Column<string>(type: "text", nullable: true),
                    time = table.Column<int>(type: "integer", nullable: true),
                    tag = table.Column<string>(type: "text", nullable: true),
                    energy = table.Column<string>(type: "text", nullable: true),
                    is_important = table.Column<bool>(type: "boolean", nullable: false),
                    is_urgent = table.Column<bool>(type: "boolean", nullable: false),
                    is_done = table.Column<bool>(type: "boolean", nullable: false),
                    is_archived = table.Column<bool>(type: "boolean", nullable: false)
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
