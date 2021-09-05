using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addWalletHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WalletHistory",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CoinType = table.Column<string>(nullable: true),
                    WalletId = table.Column<string>(nullable: true),
                    FromValue = table.Column<float>(nullable: false),
                    ToValue = table.Column<float>(nullable: false),
                    Message = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WalletHistory", x => x.ID);
                    table.ForeignKey(
                        name: "FK_WalletHistory_Wallet_WalletId",
                        column: x => x.WalletId,
                        principalTable: "Wallet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "32543896-c0af-4494-a309-4948455d905c");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "8a872337-4c2c-4bf3-9ed9-a02514e08fd2");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "c6c278ff-e217-486c-a20d-1890da5b415a", new DateTime(2021, 3, 20, 15, 8, 47, 977, DateTimeKind.Local).AddTicks(6060), "AQAAAAEAACcQAAAAEFCFxBEyeecLRzQepRgoiKGxcwoRtLdKjQ6XOr3+O0W3BPxXV26DoGKKSwe9Wo2QWw==" });

            migrationBuilder.CreateIndex(
                name: "IX_WalletHistory_WalletId",
                table: "WalletHistory",
                column: "WalletId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WalletHistory");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "4e3cfa64-5189-4a56-adc5-e328b627f012");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "0e6ef874-406f-4c97-baed-e6b18548e1e0");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "09953c0a-68cc-43df-9f97-eab6903a0bf4", new DateTime(2021, 3, 20, 13, 25, 57, 199, DateTimeKind.Local).AddTicks(3380), "AQAAAAEAACcQAAAAEFZUqu9e2gnw1xR7s4sQp0dHZX598YgNQ0//QHEt4jVgjONFu0p4KoJIebPgM/vLBg==" });
        }
    }
}
