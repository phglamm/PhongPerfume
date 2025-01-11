using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhongPerfume.Migrations
{
    /// <inheritdoc />
    public partial class updteeventtoperfume : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Events_Event_Id",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_Event_Id",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Event_Id",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "Event_Id",
                table: "Perfumes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "OrderItems_price",
                table: "OrderItems",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.CreateIndex(
                name: "IX_Perfumes_Event_Id",
                table: "Perfumes",
                column: "Event_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Perfumes_Events_Event_Id",
                table: "Perfumes",
                column: "Event_Id",
                principalTable: "Events",
                principalColumn: "Event_Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Perfumes_Events_Event_Id",
                table: "Perfumes");

            migrationBuilder.DropIndex(
                name: "IX_Perfumes_Event_Id",
                table: "Perfumes");

            migrationBuilder.DropColumn(
                name: "Event_Id",
                table: "Perfumes");

            migrationBuilder.DropColumn(
                name: "OrderItems_price",
                table: "OrderItems");

            migrationBuilder.AddColumn<int>(
                name: "Event_Id",
                table: "Orders",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_Event_Id",
                table: "Orders",
                column: "Event_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Events_Event_Id",
                table: "Orders",
                column: "Event_Id",
                principalTable: "Events",
                principalColumn: "Event_Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
