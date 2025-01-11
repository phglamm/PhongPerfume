using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhongPerfume.Migrations
{
    /// <inheritdoc />
    public partial class updateeventonproduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Perfumes_Events_Event_Id",
                table: "Perfumes");

            migrationBuilder.AlterColumn<int>(
                name: "Event_Id",
                table: "Perfumes",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Perfumes_Events_Event_Id",
                table: "Perfumes",
                column: "Event_Id",
                principalTable: "Events",
                principalColumn: "Event_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Perfumes_Events_Event_Id",
                table: "Perfumes");

            migrationBuilder.AlterColumn<int>(
                name: "Event_Id",
                table: "Perfumes",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Perfumes_Events_Event_Id",
                table: "Perfumes",
                column: "Event_Id",
                principalTable: "Events",
                principalColumn: "Event_Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
