using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addAreaClaimCredit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "AccumulatedBonusCredit",
                table: "AreaClaims",
                nullable: false,
                defaultValue: 0f);

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

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Name", "Description", "Value" },
                values: new object[] { "CLAIM_SURCHARGE", "报销手续费", "0.1" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Name",
                keyValue: "CLAIM_SURCHARGE");

            migrationBuilder.DropColumn(
                name: "AccumulatedBonusCredit",
                table: "AreaClaims");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "887b2740-080c-4ad9-a16f-12267a4da6f5");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "48476f2a-64e0-4bcf-b6d4-7b338bd91d7a");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "b709bc8e-4efa-4485-adcc-ec98807fe4bd", new DateTime(2021, 4, 8, 15, 21, 8, 966, DateTimeKind.Local).AddTicks(8880), "AQAAAAEAACcQAAAAEK6HNQ7AeZjg5EdkIFhcWhA4deoz1iOI/sDGfXVxoPzTXn3SnQtED6jcz/lG6Wy3qA==" });
        }
    }
}
