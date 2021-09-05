using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class updateBonusSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "d503f5f2-a61d-4721-9116-7f3e528442da");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "83e61f33-ef16-4ac7-89e6-c5748a65a6e1");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "5d02b714-71b1-4d42-97cd-852c67d3a50a", new DateTime(2021, 3, 21, 16, 35, 18, 440, DateTimeKind.Local).AddTicks(230), "AQAAAAEAACcQAAAAEE43GFDsgTsuNoPTBhvECFF2fXUT6MhAiId98Y9g/XDfo8VyZgqUxluJ6UIepedleQ==" });

            migrationBuilder.UpdateData(
                table: "Configs",
                keyColumn: "Name",
                keyValue: "BONUS_LOGIC",
                column: "Value",
                value: "{\"1\":{\"1\":0.125,\"2\":0.11164},\"2\":{\"1\":0.05556,\"2\":0.125,\"3\":0.05608},\"3\":{\"1\":0.03125,\"2\":0.05556,\"3\":0.125,\"4\":0.02483},\"4\":{\"1\":0.0283,\"2\":0.02778,\"3\":0.05556,\"4\":0.125},\"5\":{\"1\":0.01563,\"2\":0.01267,\"3\":0.02778,\"4\":0.05556,\"5\":0.0125}}");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "cefaa53c-ac98-4feb-9bcc-eeba0a9279e1");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "59747504-d27d-498d-9689-daaa045f84ff");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "a2d086a1-91a2-4914-94ef-016fc3a1da86", new DateTime(2021, 3, 20, 16, 29, 56, 714, DateTimeKind.Local).AddTicks(9000), "AQAAAAEAACcQAAAAEEp2slYsuDO8oAppxOKN9iInog2bDUZ9uieVAmlu7xB0hRnYQfn4hpzZ7L7XfEcxFQ==" });

            migrationBuilder.UpdateData(
                table: "Configs",
                keyColumn: "Name",
                keyValue: "BONUS_LOGIC",
                column: "Value",
                value: "{\"1\":{\"1\":0.125,\"2\":0.11164},\"2\":{\"1\":0.5556,\"2\":0.125,\"3\":0.05608},\"3\":{\"1\":0.03125,\"2\":0.05556,\"3\":0.125,\"4\":0.02483},\"4\":{\"1\":0.0283,\"2\":0.02778,\"3\":0.05556,\"4\":0.125},\"5\":{\"1\":0.01563,\"2\":0.01267,\"3\":0.02778,\"4\":0.05556,\"5\":0.125}}");
        }
    }
}
