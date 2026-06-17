using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Yorozu.Infrastructure.Migrations {
    /// <inheritdoc />
    public partial class RethinkTracks : Migration {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropTable(
                name: "ConsumptionTrack");

            migrationBuilder.CreateTable(
                name: "ConsumptionTracks",
                columns: table => new {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ContentItemId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    CurrentUnit = table.Column<int>(type: "INTEGER", nullable: false),
                    TotalUnits = table.Column<int>(type: "INTEGER", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    StartedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    CompletedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    DroppedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    PausedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: true)
                },
                constraints: table => {
                    table.PrimaryKey("PK_ConsumptionTracks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConsumptionTracks_ContentItems_ContentItemId",
                        column: x => x.ContentItemId,
                        principalTable: "ContentItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConsumptionTracks_ContentItemId",
                table: "ConsumptionTracks",
                column: "ContentItemId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropTable(
                name: "ConsumptionTracks");

            migrationBuilder.CreateTable(
                name: "ConsumptionTrack",
                columns: table => new {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    CompletedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    ContentItemId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CurrentUnit = table.Column<int>(type: "INTEGER", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    DroppedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    PausedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    StartedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false)
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
    }
}
