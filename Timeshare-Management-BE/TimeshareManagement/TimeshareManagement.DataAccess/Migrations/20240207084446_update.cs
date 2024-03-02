using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeshareManagement.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "AspNetUsers",
                newName: "Name");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "Timeshares",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Timeshares_Id",
                table: "Timeshares",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Timeshares_AspNetUsers_Id",
                table: "Timeshares",
                column: "Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Timeshares_AspNetUsers_Id",
                table: "Timeshares");

            migrationBuilder.DropIndex(
                name: "IX_Timeshares_Id",
                table: "Timeshares");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Timeshares");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "AspNetUsers",
                newName: "LastName");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
