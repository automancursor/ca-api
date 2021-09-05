using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addPasswordIdcardNumber : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IdCardNumber",
                table: "UserVerifications",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PassportNumber",
                table: "UserVerifications",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "ProductOrders",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "54a24b91-239f-4294-8c04-07f496c86ac3");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "e1059c7a-9c8c-4f5b-98ab-f6d1dc5969eb");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "ec0ec0d9-0d0f-43dd-9e43-6853acebc29a", new DateTime(2021, 7, 9, 0, 46, 54, 465, DateTimeKind.Local).AddTicks(690), "AQAAAAEAACcQAAAAEDq0Jr05PXZgYoHoZpul6kdt2QJh0auDaQnxCvky2H4+3ZoGK6VXXUzulvw6J0tT/g==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdCardNumber",
                table: "UserVerifications");

            migrationBuilder.DropColumn(
                name: "PassportNumber",
                table: "UserVerifications");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "ProductOrders",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "e5008732-fa27-48c8-8562-9ffcd76704c1");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "a7db95c9-702f-4456-9604-9b321306472f");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "6ec8ee67-7847-4728-b38f-9cd93e0f3d63", new DateTime(2021, 7, 3, 17, 45, 35, 389, DateTimeKind.Local).AddTicks(5540), "AQAAAAEAACcQAAAAEPIz0KyIRah8ubbwL35mCmxA9HJ/UVB1Q8aGbyIiw5EyA8zrCP4NK+AsfOh2qF/3hA==" });
        }
    }
}
