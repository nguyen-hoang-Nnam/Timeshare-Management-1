using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeshareManagement.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class room : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Checkin",
                table: "Timeshares");

            migrationBuilder.DropColumn(
                name: "Checkout",
                table: "Timeshares");

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    roomID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Checkin = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Checkout = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Nights = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Rooms = table.Column<int>(type: "int", nullable: false),
                    Sleeps = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.roomID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.AddColumn<DateTime>(
                name: "Checkin",
                table: "Timeshares",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Checkout",
                table: "Timeshares",
                type: "datetime2",
                nullable: true);
        }
    }
}
