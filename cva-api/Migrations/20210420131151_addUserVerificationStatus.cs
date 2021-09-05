using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addUserVerificationStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserVerificationStatus",
                table: "UserVerifications",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "284fe576-1d5e-4f5b-a008-a02750fde18c");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "ca4d59de-0040-4cf3-b6fe-8e561ad4c11d");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "53820980-79e1-459e-8809-e057814179b9", new DateTime(2021, 4, 20, 23, 11, 51, 101, DateTimeKind.Local).AddTicks(200), "AQAAAAEAACcQAAAAECmYDyzyWgc+b+8sN8GE/I3f2I1o7Q6d++c2z1Yxl9jUKnQO7ILRdeH0Wj3hyAjNBw==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserVerificationStatus",
                table: "UserVerifications");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "846a7d47-880e-4574-b793-9e68aa865215");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "928325d9-e9e2-4d4f-a595-2353994de4a7");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "31161668-1e96-405a-a57a-4f0a4bee9234", new DateTime(2021, 4, 20, 23, 0, 51, 645, DateTimeKind.Local).AddTicks(8200), "AQAAAAEAACcQAAAAEPcGNf2phUMXCLLSi4LGMgXa+AAqkSdV8dtbtImrX+iW8/2J2/YOX0GsOCJgjmxDKg==" });
        }
    }
}
