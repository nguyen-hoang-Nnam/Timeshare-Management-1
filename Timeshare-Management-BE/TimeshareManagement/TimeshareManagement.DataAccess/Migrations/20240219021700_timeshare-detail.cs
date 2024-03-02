using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeshareManagement.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class timesharedetail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TimesharesDetail",
                columns: table => new
                {
                    timeshareDetailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Detail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    roomID = table.Column<int>(type: "int", nullable: true),
                    timeshareId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimesharesDetail", x => x.timeshareDetailId);
                    table.ForeignKey(
                        name: "FK_TimesharesDetail_Rooms_roomID",
                        column: x => x.roomID,
                        principalTable: "Rooms",
                        principalColumn: "roomID");
                    table.ForeignKey(
                        name: "FK_TimesharesDetail_Timeshares_timeshareId",
                        column: x => x.timeshareId,
                        principalTable: "Timeshares",
                        principalColumn: "timeshareId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TimesharesDetail_roomID",
                table: "TimesharesDetail",
                column: "roomID");

            migrationBuilder.CreateIndex(
                name: "IX_TimesharesDetail_timeshareId",
                table: "TimesharesDetail",
                column: "timeshareId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TimesharesDetail");
        }
    }
}
