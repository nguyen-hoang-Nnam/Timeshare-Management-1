using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeshareManagement.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class roomdetail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RoomDetail",
                columns: table => new
                {
                    roomDetailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Detail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    roomID = table.Column<int>(type: "int", nullable: true),
                    roomAmenitiesId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomDetail", x => x.roomDetailId);
                    table.ForeignKey(
                        name: "FK_RoomDetail_RoomAmenities_roomAmenitiesId",
                        column: x => x.roomAmenitiesId,
                        principalTable: "RoomAmenities",
                        principalColumn: "roomAmenitiesId");
                    table.ForeignKey(
                        name: "FK_RoomDetail_Rooms_roomID",
                        column: x => x.roomID,
                        principalTable: "Rooms",
                        principalColumn: "roomID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_RoomDetail_roomAmenitiesId",
                table: "RoomDetail",
                column: "roomAmenitiesId");

            migrationBuilder.CreateIndex(
                name: "IX_RoomDetail_roomID",
                table: "RoomDetail",
                column: "roomID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoomDetail");
        }
    }
}
