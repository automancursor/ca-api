using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class changeDecimalPrecision2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Amount",
                table: "Transactions",
                type: "decimal(20, 3)",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "double",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "276563b5-1cf7-423d-84a2-a952112dec84");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "85c06d5e-4182-4aef-b42c-5280ae5eadf2");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "b448186d-a201-4afd-8172-9bcf1f949929", new DateTime(2021, 4, 22, 21, 41, 27, 869, DateTimeKind.Local).AddTicks(4170), "AQAAAAEAACcQAAAAELzelH0KKVHkknR16F8JdOKSkhMxxis2ZVUpdjo3uuUsvCeXOgI5tQfEvqr45ANHeQ==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Amount",
                table: "Transactions",
                type: "double",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(20, 3)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "198b0990-99b6-4199-9c5f-bdb364b20a90");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "ee77ea87-4f98-4f4a-afa7-008f92c07971");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "63ce92b5-92d9-462e-a122-c18d25963a40", new DateTime(2021, 4, 22, 21, 36, 10, 53, DateTimeKind.Local).AddTicks(6260), "AQAAAAEAACcQAAAAEHfgw0quLmQB4p7NJcjG3pEqfWoEgSnqBd28WkbMhzqvWq6Mh4i5wOLkm+QNJz70ow==" });
        }
    }
}
