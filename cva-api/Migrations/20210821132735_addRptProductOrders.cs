using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addRptProductOrders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Cost",
                table: "RptProducts",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "CostCurrency",
                table: "RptProducts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "RptProducts",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "RptProductOrders",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(nullable: true),
                    UserName = table.Column<string>(nullable: true),
                    SellerId = table.Column<string>(nullable: true),
                    SellerName = table.Column<string>(nullable: true),
                    Price = table.Column<double>(nullable: false),
                    Currency = table.Column<string>(nullable: true),
                    PaymentMethod = table.Column<string>(nullable: true),
                    PaymentToken = table.Column<string>(nullable: true),
                    RptOrderProducts = table.Column<string>(type: "text", nullable: true),
                    OrderDetail = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    RptProductOrderStatus = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RptProductOrders", x => x.ID);
                    table.ForeignKey(
                        name: "FK_RptProductOrders_AspNetUsers_SellerId",
                        column: x => x.SellerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RptProductOrders_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "a712a5a0-afc7-4af8-ad2a-bb88b44cf6ff");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "a5e7b9cb-e653-4599-9f5c-db3d7cfe82a8");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "41ab8e17-b6f9-4c00-b76d-2e05638fd616", new DateTime(2021, 8, 21, 23, 27, 35, 59, DateTimeKind.Local).AddTicks(7750), "AQAAAAEAACcQAAAAEGxnON2bxCpXEEZRKFl9uaxOKcvKAv+Iy+CWn5vIW5iKqBvJvl7P71lwGgmtcc+zTA==" });

            migrationBuilder.CreateIndex(
                name: "IX_RptProductOrders_SellerId",
                table: "RptProductOrders",
                column: "SellerId");

            migrationBuilder.CreateIndex(
                name: "IX_RptProductOrders_UserId",
                table: "RptProductOrders",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RptProductOrders");

            migrationBuilder.DropColumn(
                name: "Cost",
                table: "RptProducts");

            migrationBuilder.DropColumn(
                name: "CostCurrency",
                table: "RptProducts");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "RptProducts");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "3290e81f-8f88-4c39-b270-cfb6df781f2d");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "baf14b15-66a5-40eb-8b5e-aa756c20d80c");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "cef3245f-01af-4ea1-8b8e-0706f983c69e", new DateTime(2021, 8, 21, 17, 38, 18, 825, DateTimeKind.Local).AddTicks(5930), "AQAAAAEAACcQAAAAEEFRdbv9qqR1Ko9DPNeVasI3P1dsMfkq5OZ5K0FW8ZXcp74J68hTEDQ9Q8+EyBzsJg==" });
        }
    }
}
