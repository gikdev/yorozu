using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Yorozu.Infrastructure.Migrations {
    /// <inheritdoc />
    public partial class Initial : Migration {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.CreateTable(
                name: "ContentItems",
                columns: table => new {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    FullTitle = table.Column<string>(type: "TEXT", nullable: false),
                    NickName = table.Column<string>(type: "TEXT", nullable: true),
                    Format = table.Column<int>(type: "INTEGER", nullable: false),
                    Genres = table.Column<string>(type: "TEXT", nullable: false),
                    IsSecret = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsBookmarked = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsFavorite = table.Column<bool>(type: "INTEGER", nullable: false),
                    Location_Type = table.Column<int>(type: "INTEGER", nullable: true),
                    Location_Value = table.Column<string>(type: "TEXT", nullable: true),
                    UnitSpec_UnitType = table.Column<int>(type: "INTEGER", nullable: true),
                    UnitSpec_TotalUnits = table.Column<int>(type: "INTEGER", nullable: true),
                    UnitSpec_IsOngoing = table.Column<bool>(type: "INTEGER", nullable: true),
                    CoverImageUrl = table.Column<string>(type: "TEXT", nullable: true),
                    PlaceholderColor = table.Column<string>(type: "TEXT", nullable: false),
                    _tags = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_ContentItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ConsumptionTrack",
                columns: table => new {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    CurrentUnit = table.Column<int>(type: "INTEGER", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    StartedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    CompletedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    DroppedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    PausedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    ContentItemId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_ConsumptionTrack", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConsumptionTrack_ContentItems_ContentItemId",
                        column: x => x.ContentItemId,
                        principalTable: "ContentItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConsumptionTrack_ContentItemId",
                table: "ConsumptionTrack",
                column: "ContentItemId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropTable(
                name: "ConsumptionTrack");

            migrationBuilder.DropTable(
                name: "ContentItems");
        }
    }
}
