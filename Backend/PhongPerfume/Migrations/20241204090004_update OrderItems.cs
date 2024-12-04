using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PhongPerfume.Migrations
{
    /// <inheritdoc />
    public partial class updateOrderItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderDetailPerfumes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderDetails",
                table: "OrderDetails");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetails_Order_Id",
                table: "OrderDetails");

            migrationBuilder.RenameColumn(
                name: "OrderDetail_Id",
                table: "OrderDetails",
                newName: "Perfume_Id");

            migrationBuilder.AddColumn<string>(
                name: "Order_customerName",
                table: "Orders",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "Perfume_Id",
                table: "OrderDetails",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderDetails",
                table: "OrderDetails",
                columns: new[] { "Order_Id", "Perfume_Id" });

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_Perfume_Id",
                table: "OrderDetails",
                column: "Perfume_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_Perfumes_Perfume_Id",
                table: "OrderDetails",
                column: "Perfume_Id",
                principalTable: "Perfumes",
                principalColumn: "Perfume_Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_Perfumes_Perfume_Id",
                table: "OrderDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderDetails",
                table: "OrderDetails");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetails_Perfume_Id",
                table: "OrderDetails");

            migrationBuilder.DropColumn(
                name: "Order_customerName",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "Perfume_Id",
                table: "OrderDetails",
                newName: "OrderDetail_Id");

            migrationBuilder.AlterColumn<int>(
                name: "OrderDetail_Id",
                table: "OrderDetails",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderDetails",
                table: "OrderDetails",
                column: "OrderDetail_Id");

            migrationBuilder.CreateTable(
                name: "OrderDetailPerfumes",
                columns: table => new
                {
                    OrderDetailPerfume_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderDetail_Id = table.Column<int>(type: "integer", nullable: false),
                    Perfume_Id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDetailPerfumes", x => x.OrderDetailPerfume_Id);
                    table.ForeignKey(
                        name: "FK_OrderDetailPerfumes_OrderDetails_OrderDetail_Id",
                        column: x => x.OrderDetail_Id,
                        principalTable: "OrderDetails",
                        principalColumn: "OrderDetail_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderDetailPerfumes_Perfumes_Perfume_Id",
                        column: x => x.Perfume_Id,
                        principalTable: "Perfumes",
                        principalColumn: "Perfume_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_Order_Id",
                table: "OrderDetails",
                column: "Order_Id");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetailPerfumes_OrderDetail_Id",
                table: "OrderDetailPerfumes",
                column: "OrderDetail_Id");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetailPerfumes_Perfume_Id",
                table: "OrderDetailPerfumes",
                column: "Perfume_Id");
        }
    }
}
