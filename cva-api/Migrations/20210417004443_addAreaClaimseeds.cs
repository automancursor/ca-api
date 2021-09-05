using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addAreaClaimseeds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AreaClaims",
                columns: new[] { "ID", "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Active", "AreaType", "Cva", "Cvt", "Description", "LastRewardedBlockNum", "Name", "Round", "TargetBonus" },
                values: new object[,]
                {
                    { 8, 180f, 0f, 0f, true, "VIP", 18000f, 1550000f, null, 0, "VIP", 20, 18000f },
                    { 9, 360f, 0f, 0f, true, "县代表", 36000f, 3100000f, null, 0, "F区", 40, 36000f },
                    { 10, 720f, 0f, 0f, true, "市代表", 72000f, 6200000f, null, 0, "G区", 80, 72000f },
                    { 11, 1500f, 0f, 0f, true, "省代表", 150000f, 12400000f, null, 0, "H区", 160, 150000f },
                    { 12, 3000f, 0f, 0f, true, "国家代表", 300000f, 24800000f, null, 0, "I区", 320, 300000f },
                    { 13, 6000f, 0f, 0f, true, "洲域代表(全球七大洲)", 600000f, 49600000f, null, 0, "K区", 640, 600000f }
                });

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 13);

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
        }
    }
}
