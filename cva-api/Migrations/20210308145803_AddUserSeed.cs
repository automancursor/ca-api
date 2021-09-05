using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class AddUserSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "2301D884-221A-4E7D-B509-0113DCC043E1", "df1fe128-3d39-42b3-a9b7-9edb7fa5753c", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "78A7570F-3CE5-48BA-9461-80283ED1D94D", "d5ebff28-8b88-4666-9cb2-c9075a245daf", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "IsNewMember", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PayPasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "ReferCode", "ReferrerId", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "B22698B8-42A2-4115-9631-1C2D1E2AC5F7", 0, "a5cac7c4-102e-4949-81fe-e63705e611a1", null, false, true, false, null, null, "BBW", "AQAAAAEAACcQAAAAEBH7bODVPC+XjdbwqPiNpblpwy0bc3DQdp1wiZLrr9d1wc4OfTahhFp6nUpfkOScLw==", "123123", null, false, "00000000", null, "00000000-0000-0000-0000-000000000000", false, "BBW" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "UserId", "RoleId" },
                values: new object[] { "B22698B8-42A2-4115-9631-1C2D1E2AC5F7", "2301D884-221A-4E7D-B509-0113DCC043E1" });

            migrationBuilder.InsertData(
                table: "Wallet",
                columns: new[] { "Id", "Abg", "Cva", "Cvt", "CvtCredit", "UserId" },
                values: new object[] { "7D9B7113-A8F8-4035-99A7-A20DD400F6A3", 0f, 10000f, 0f, 0f, "B22698B8-42A2-4115-9631-1C2D1E2AC5F7" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "B22698B8-42A2-4115-9631-1C2D1E2AC5F7", "2301D884-221A-4E7D-B509-0113DCC043E1" });

            migrationBuilder.DeleteData(
                table: "Wallet",
                keyColumn: "Id",
                keyValue: "7D9B7113-A8F8-4035-99A7-A20DD400F6A3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7");
        }
    }
}
