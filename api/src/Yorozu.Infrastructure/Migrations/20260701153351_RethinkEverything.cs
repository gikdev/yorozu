using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Yorozu.Infrastructure.Migrations {
    /// <inheritdoc />
    public partial class RethinkEverything : Migration {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropColumn(
                name: "IsBookmarked",
                table: "ContentItems");

            migrationBuilder.DropColumn(
                name: "IsFavorite",
                table: "ContentItems");

            migrationBuilder.DropColumn(
                name: "IsSecret",
                table: "ContentItems");

            migrationBuilder.DropColumn(
                name: "UnitSpec_IsOngoing",
                table: "ContentItems");

            migrationBuilder.RenameColumn(
                name: "UnitSpec_UnitType",
                table: "ContentItems",
                newName: "UnitType");

            migrationBuilder.RenameColumn(
                name: "UnitSpec_TotalUnits",
                table: "ContentItems",
                newName: "TotalUnits");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "ConsumptionTracks");

            migrationBuilder.AddColumn<int>(
                name: "DoSyncTotalUnits",
                table: "ConsumptionTracks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);   // or whatever default you need

            migrationBuilder.AlterColumn<string>(
                name: "UnitType",
                table: "ContentItems",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ConsumptionTrackListId",
                table: "ConsumptionTracks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "DoSyncSecret",
                table: "ConsumptionTracks",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "_tags",
                table: "ConsumptionTracks",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.CreateTable(
                name: "ConsumptionTrackLists",
                columns: table => new {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table => {
                    table.PrimaryKey("PK_ConsumptionTrackLists", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropTable(
                name: "ConsumptionTrackLists");

            migrationBuilder.DropColumn(
                name: "ConsumptionTrackListId",
                table: "ConsumptionTracks");

            migrationBuilder.DropColumn(
                name: "DoSyncSecret",
                table: "ConsumptionTracks");

            migrationBuilder.DropColumn(
                name: "_tags",
                table: "ConsumptionTracks");

            migrationBuilder.RenameColumn(
                name: "UnitType",
                table: "ContentItems",
                newName: "UnitSpec_UnitType");

            migrationBuilder.RenameColumn(
                name: "TotalUnits",
                table: "ContentItems",
                newName: "UnitSpec_TotalUnits");

            migrationBuilder.DropColumn(
                name: "DoSyncTotalUnits",
                table: "ConsumptionTracks");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "ConsumptionTracks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "UnitSpec_UnitType",
                table: "ContentItems",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<bool>(
                name: "IsBookmarked",
                table: "ContentItems",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsFavorite",
                table: "ContentItems",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSecret",
                table: "ContentItems",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "UnitSpec_IsOngoing",
                table: "ContentItems",
                type: "INTEGER",
                nullable: true);
        }
    }
}
