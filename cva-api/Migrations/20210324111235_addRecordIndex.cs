using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addRecordIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RecordIndex",
                table: "AreaRecords",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "ec6c65a4-e0b0-4f69-97bf-fa0f0ed2e907");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "068b68a9-6175-49cf-8cb9-45f9f51801ac");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "62006d6b-5364-4678-9ec1-8a054b7b21cf", new DateTime(2021, 3, 24, 22, 12, 35, 14, DateTimeKind.Local).AddTicks(7560), "AQAAAAEAACcQAAAAENZoEXZqR71pWcWO83jAUbvMKPMMjGti/w0ZMjBII1M6nhfju+B5Exa8fn97ZJetQg==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RecordIndex",
                table: "AreaRecords");

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
        }
    }
}
