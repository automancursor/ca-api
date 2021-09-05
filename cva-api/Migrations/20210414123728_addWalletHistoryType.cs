using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addWalletHistoryType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WalletHistoryType",
                table: "WalletHistories",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "0ebe96bb-f2e7-46a8-beb2-16554335df7f");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "729e0dc9-3950-4cdd-8e3b-d651f551bd06");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "51826848-8c85-4fb1-a503-1e4e7463241b", new DateTime(2021, 4, 14, 22, 37, 28, 70, DateTimeKind.Local).AddTicks(9380), "AQAAAAEAACcQAAAAEL68axFaWxGYjCIYDlMrrdgdq9qx4jZT6yPQ7bdNJ1rcyfBqdN+n9p4DGG4pHV+/Rw==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WalletHistoryType",
                table: "WalletHistories");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "7d9987f4-6168-4526-8587-9ee69e348062");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "796e0643-6943-41df-9d36-eac4524b8523");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "4ab708f2-8e34-4983-a43d-b1686afba743", new DateTime(2021, 4, 11, 14, 18, 32, 7, DateTimeKind.Local).AddTicks(7450), "AQAAAAEAACcQAAAAEKD3LwteXBEgp7w4uO02xh+QKmihEyNu0ycI6jcd2/60+s76MR5GMxolwfG3zPg+8w==" });
        }
    }
}
