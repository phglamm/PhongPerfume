using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhongPerfume.Migrations
{
    /// <inheritdoc />
    public partial class updateimage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "User_avatar",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Event_Poster",
                table: "Events",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Brand_Images",
                table: "Brands",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "User_avatar",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Event_Poster",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Brand_Images",
                table: "Brands");
        }
    }
}
