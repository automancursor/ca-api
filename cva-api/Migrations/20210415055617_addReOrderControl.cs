using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addReOrderControl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "4b395f29-26a2-4eec-95e4-d2c1a071cad9");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "cedc8985-c226-44eb-91b7-6546b975d6b6");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "435af1fe-c232-4187-9563-a9427b9cb3c4", new DateTime(2021, 4, 15, 15, 56, 16, 904, DateTimeKind.Local).AddTicks(5380), "AQAAAAEAACcQAAAAEF7HN76f8r9uVq1PPqlR6vqiQx5scYbmT3eTCR80sAj1JY8t+OxG9BzYuS3godlyLQ==" });

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Name", "Description", "Value" },
                values: new object[] { "REORDER_CONTROL", "重复购买开关", "off" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Name",
                keyValue: "REORDER_CONTROL");

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
    }
}
