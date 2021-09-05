using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class changeFloatToDouble : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "BeforeValue",
                table: "WalletHistories",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "AfterValue",
                table: "WalletHistories",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "CvtCredit",
                table: "Wallet",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "Cvt",
                table: "Wallet",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "Cva",
                table: "Wallet",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "Abg",
                table: "Wallet",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "Amount",
                table: "Transactions",
                nullable: true,
                oldClrType: typeof(float),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "CvtCredit",
                table: "Orders",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "Cvt",
                table: "Orders",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "Cva",
                table: "Orders",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "Abg",
                table: "Orders",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "ChangedValue",
                table: "AreaHistories",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "BeforeValue",
                table: "AreaHistories",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "AfterValue",
                table: "AreaHistories",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "TargetBonus",
                table: "AreaClaims",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "Cvt",
                table: "AreaClaims",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "Cva",
                table: "AreaClaims",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "AccumulatedBonusCredit",
                table: "AreaClaims",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "AccumulatedBonus",
                table: "AreaClaims",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "Abg",
                table: "AreaClaims",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 5.0, 0.0, 0.0, 500.0, 50000.0, 500.0 });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 10.0, 0.0, 0.0, 1000.0, 100000.0, 1000.0 });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 3,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 20.0, 0.0, 0.0, 2000.0, 200000.0, 2000.0 });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 4,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 40.0, 0.0, 0.0, 4000.0, 400000.0, 4000.0 });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 5,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 80.0, 0.0, 0.0, 8000.0, 800000.0, 8000.0 });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 6,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 1.0, 0.0, 0.0, 100.0, 10000.0, 100.0 });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 7,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 2.0, 0.0, 0.0, 200.0, 20000.0, 200.0 });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 8,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 180.0, 0.0, 0.0, 18000.0, 1550000.0, 18000.0 });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 9,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 360.0, 0.0, 0.0, 36000.0, 3100000.0, 36000.0 });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 10,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 720.0, 0.0, 0.0, 72000.0, 6200000.0, 72000.0 });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 11,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 1500.0, 0.0, 0.0, 150000.0, 12400000.0, 150000.0 });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 12,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 3000.0, 0.0, 0.0, 300000.0, 24800000.0, 300000.0 });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 13,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 6000.0, 0.0, 0.0, 600000.0, 49600000.0, 600000.0 });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "d6ac83c0-6e27-42a1-a952-37239386c006");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "9b9e49bb-53e9-499c-89a2-3ca1fab206c1");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "0913a199-299d-4c6f-82de-6c9ce561a537", new DateTime(2021, 4, 22, 19, 27, 19, 553, DateTimeKind.Local).AddTicks(3860), "AQAAAAEAACcQAAAAEAdTSKvE2rhL6eTqkY4wmCnZYayuSVOpyRyxfOKkH1dlemTr3FxIVjczjTIawYJ8Zg==" });

            migrationBuilder.UpdateData(
                table: "Wallet",
                keyColumn: "Id",
                keyValue: "7D9B7113-A8F8-4035-99A7-A20DD400F6A3",
                columns: new[] { "Abg", "Cva", "Cvt", "CvtCredit" },
                values: new object[] { 0.0, 15800.0, 0.0, 0.0 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "BeforeValue",
                table: "WalletHistories",
                type: "float",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "AfterValue",
                table: "WalletHistories",
                type: "float",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "CvtCredit",
                table: "Wallet",
                type: "float",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "Cvt",
                table: "Wallet",
                type: "float",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "Cva",
                table: "Wallet",
                type: "float",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "Abg",
                table: "Wallet",
                type: "float",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "Amount",
                table: "Transactions",
                type: "float",
                nullable: true,
                oldClrType: typeof(double),
                oldNullable: true);

            migrationBuilder.AlterColumn<float>(
                name: "CvtCredit",
                table: "Orders",
                type: "float",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "Cvt",
                table: "Orders",
                type: "float",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "Cva",
                table: "Orders",
                type: "float",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "Abg",
                table: "Orders",
                type: "float",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "ChangedValue",
                table: "AreaHistories",
                type: "float",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "BeforeValue",
                table: "AreaHistories",
                type: "float",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "AfterValue",
                table: "AreaHistories",
                type: "float",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "TargetBonus",
                table: "AreaClaims",
                type: "float",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "Cvt",
                table: "AreaClaims",
                type: "float",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "Cva",
                table: "AreaClaims",
                type: "float",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "AccumulatedBonusCredit",
                table: "AreaClaims",
                type: "float",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "AccumulatedBonus",
                table: "AreaClaims",
                type: "float",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<float>(
                name: "Abg",
                table: "AreaClaims",
                type: "float",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 5f, 0f, 0f, 500f, 50000f, 500f });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 10f, 0f, 0f, 1000f, 100000f, 1000f });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 3,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 20f, 0f, 0f, 2000f, 200000f, 2000f });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 4,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 40f, 0f, 0f, 4000f, 400000f, 4000f });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 5,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 80f, 0f, 0f, 8000f, 800000f, 8000f });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 6,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 1f, 0f, 0f, 100f, 10000f, 100f });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 7,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 2f, 0f, 0f, 200f, 20000f, 200f });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 8,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 180f, 0f, 0f, 18000f, 1550000f, 18000f });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 9,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 360f, 0f, 0f, 36000f, 3100000f, 36000f });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 10,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 720f, 0f, 0f, 72000f, 6200000f, 72000f });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 11,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 1500f, 0f, 0f, 150000f, 12400000f, 150000f });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 12,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 3000f, 0f, 0f, 300000f, 24800000f, 300000f });

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 13,
                columns: new[] { "Abg", "AccumulatedBonus", "AccumulatedBonusCredit", "Cva", "Cvt", "TargetBonus" },
                values: new object[] { 6000f, 0f, 0f, 600000f, 49600000f, 600000f });

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

            migrationBuilder.UpdateData(
                table: "Wallet",
                keyColumn: "Id",
                keyValue: "7D9B7113-A8F8-4035-99A7-A20DD400F6A3",
                columns: new[] { "Abg", "Cva", "Cvt", "CvtCredit" },
                values: new object[] { 0f, 15800f, 0f, 0f });
        }
    }
}
