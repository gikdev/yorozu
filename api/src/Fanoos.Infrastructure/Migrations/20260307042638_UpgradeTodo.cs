using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Fanoos.Infrastructure.Migrations {
    /// <inheritdoc />
    public partial class UpgradeTodo : Migration {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.AddColumn<int>(
                name: "bucket",
                schema: "main",
                table: "todos",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.RenameColumn(
                name: "energy",
                schema: "main",
                table: "todos",
                newName: "energy_level"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropColumn(
                name: "bucket",
                schema: "main",
                table: "todos");

            migrationBuilder.RenameColumn(
                name: "energy_level",
                schema: "main",
                table: "todos",
                newName: "energy"
            );
        }
    }
}
