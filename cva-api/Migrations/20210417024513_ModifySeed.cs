using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class ModifySeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 9,
                column: "Name",
                value: "F区 / 县代表");

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 10,
                column: "Name",
                value: "G区 / 市代表");

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 11,
                column: "Name",
                value: "H区 / 省代表");

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 12,
                column: "Name",
                value: "I区 / 国家代表");

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 13,
                column: "Name",
                value: "K区 / 洲域代表(全球七大洲)");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "f30496ab-bbd4-4298-985e-97492c1149f0");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "45719a43-e0e1-474a-b5c4-a79dfb35401c");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "02cbe43d-6fb5-4e1b-9718-6ccd3bd38c22", new DateTime(2021, 4, 17, 12, 45, 12, 668, DateTimeKind.Local).AddTicks(2360), "AQAAAAEAACcQAAAAECIiBqU2wOmqkRRqQee7VibewYmHL7nvOi/bND/WwD4tf1apZG3GLnIiq/PJIik6pw==" });

            migrationBuilder.UpdateData(
                table: "Configs",
                keyColumn: "Name",
                keyValue: "REWARD_SURCHARGE",
                column: "Description",
                value: "CVA转帐手续费");

            migrationBuilder.UpdateData(
                table: "Configs",
                keyColumn: "Name",
                keyValue: "TRANSACTION_SURCHARGE",
                column: "Description",
                value: "CVT转帐手续费");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 9,
                column: "Name",
                value: "F区");

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 10,
                column: "Name",
                value: "G区");

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 11,
                column: "Name",
                value: "H区");

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 12,
                column: "Name",
                value: "I区");

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 13,
                column: "Name",
                value: "K区");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "c2902ad5-04ed-431f-bfcb-455a6352bd4e");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "4f2c6d09-edb5-4b94-b3cd-0eebc6f3624a");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "bf6d9a87-7a55-411f-b504-acd6752bf041", new DateTime(2021, 4, 17, 10, 44, 42, 998, DateTimeKind.Local).AddTicks(1870), "AQAAAAEAACcQAAAAEL4whJScVeYG+sgi9dIO9mY668ce7E00pK91cKVfUbO02umavqLBkcidOzFipCbEMg==" });

            migrationBuilder.UpdateData(
                table: "Configs",
                keyColumn: "Name",
                keyValue: "REWARD_SURCHARGE",
                column: "Description",
                value: "奖励手续费");

            migrationBuilder.UpdateData(
                table: "Configs",
                keyColumn: "Name",
                keyValue: "TRANSACTION_SURCHARGE",
                column: "Description",
                value: "转账手续费");
        }
    }
}
