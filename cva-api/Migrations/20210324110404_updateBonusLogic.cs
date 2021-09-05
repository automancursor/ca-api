using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class updateBonusLogic : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "263cdeed-27bf-4297-bfd6-0edaf48b1b7d");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "30617592-2524-4e0d-a401-21ba80da4e85");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "c7a4bb69-16bd-40b9-8da6-006aaa9ebf74", new DateTime(2021, 3, 24, 22, 4, 3, 964, DateTimeKind.Local).AddTicks(230), "AQAAAAEAACcQAAAAEIyBf5w7W4La8vi5JWAobApigq0DW1i1ZDT9oEfBMviRXnHIFMQYVFufxcd/Xk7EFQ==" });

            migrationBuilder.UpdateData(
                table: "Configs",
                keyColumn: "Name",
                keyValue: "BONUS_LOGIC",
                column: "Value",
                value: "{\"1\":{\"1\":0.125,\"2\":0.03166,\"6\":0.04,\"7\":0.05},\"2\":{\"1\":0.0417,\"2\":0.125,\"3\":0.03216,\"6\":0.0143,\"7\":0.0335},\"3\":{\"1\":0.0278,\"2\":0.0417,\"3\":0.125,\"4\":0.02786,\"6\":0.01,\"7\":0.0143},\"4\":{\"1\":0.0179,\"2\":0.025,\"3\":0.0358,\"4\":0.125,\"5\":0.03156,\"6\":0.042,\"7\":0.072},\"5\":{\"1\":0.01066,\"2\":0.018,\"3\":0.0359,\"4\":0.05,\"5\":0.125,\"6\":0.021,\"7\":0.05},\"6\":{\"6\":0.125,\"7\":0.121666},\"7\":{\"1\":0.0383,\"6\":0.125,\"7\":0.08336}}");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "18e67d64-6917-4529-a417-b72ed0dca604");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "dbe035ab-9aa6-4820-b553-f4633bbd14f4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "7741a0f3-359e-4093-8a29-3cba4dc1c6d6", new DateTime(2021, 3, 21, 16, 42, 4, 12, DateTimeKind.Local).AddTicks(9610), "AQAAAAEAACcQAAAAEGg1H1QFaUXFPOL0mSoSWcUKDzvb4rDS6UgOwGMuDWX5GLukXz0i3TeV2xs8I4ormQ==" });

            migrationBuilder.UpdateData(
                table: "Configs",
                keyColumn: "Name",
                keyValue: "BONUS_LOGIC",
                column: "Value",
                value: "{\"1\":{\"1\":0.125,\"2\":0.11164},\"2\":{\"1\":0.05556,\"2\":0.125,\"3\":0.05608},\"3\":{\"1\":0.03125,\"2\":0.05556,\"3\":0.125,\"4\":0.02483},\"4\":{\"1\":0.0283,\"2\":0.02778,\"3\":0.05556,\"4\":0.125},\"5\":{\"1\":0.01563,\"2\":0.01267,\"3\":0.02778,\"4\":0.05556,\"5\":0.0125}}");
        }
    }
}
