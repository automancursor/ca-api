using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addTrasactionPaymentLink : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PaymentLink",
                table: "Transactions",
                nullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentLink",
                table: "Transactions");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "d53cd7df-29ad-425b-8fe1-4bc6865fb438");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "b178098a-e801-4902-9b9c-a9ab22175378");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "41455a18-d8ef-430b-91c3-d55b5c7dc72a", new DateTime(2021, 4, 9, 22, 28, 34, 434, DateTimeKind.Local).AddTicks(5550), "AQAAAAEAACcQAAAAEAURkms9kiAhNK2jVn6Z2hMRBSfyGbVKV/+gh/vi/B6vtd35626zC/u4fKcZMueGrA==" });
        }
    }
}
