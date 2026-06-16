using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Yorozu.Infrastructure.Migrations {
    /// <inheritdoc />
    public partial class RemoveGenres : Migration {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropColumn(
                name: "Genres",
                table: "ContentItems");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.AddColumn<string>(
                name: "Genres",
                table: "ContentItems",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
