using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhongPerfume.Migrations
{
    /// <inheritdoc />
    public partial class updateperfume : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Perfume_For",
                table: "Perfumes",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Perfume_For",
                table: "Perfumes");
        }
    }
}
