using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FinancialMonitoring.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Finance");

            migrationBuilder.EnsureSchema(
                name: "Security");

            migrationBuilder.CreateTable(
                name: "Users",
                schema: "Security",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    Email = table.Column<string>(maxLength: 256, nullable: false),
                    Password = table.Column<string>(maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                schema: "Finance",
                columns: table => new
                {
                    FinancialCategoryId = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(maxLength: 256, nullable: false),
                    ParentId = table.Column<Guid>(nullable: true),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.FinancialCategoryId);
                    table.ForeignKey(
                        name: "FK_Categories_Categories_ParentId",
                        column: x => x.ParentId,
                        principalSchema: "Finance",
                        principalTable: "Categories",
                        principalColumn: "FinancialCategoryId");
                    table.ForeignKey(
                        name: "FK_Categories_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                schema: "Security",
                columns: table => new
                {
                    TokenId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<Guid>(nullable: false),
                    Token = table.Column<string>(unicode: false, maxLength: 200, nullable: false),
                    ExpirationDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.TokenId);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FinancialItems",
                schema: "Finance",
                columns: table => new
                {
                    FinancialItemId = table.Column<Guid>(nullable: false),
                    CategoryId = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(maxLength: 256, nullable: false),
                    Value = table.Column<decimal>(nullable: false),
                    DueDate = table.Column<DateTime>(nullable: false),
                    OccurenceKind = table.Column<int>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinancialItems", x => x.FinancialItemId);
                    table.ForeignKey(
                        name: "FK_FinancialItems_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalSchema: "Finance",
                        principalTable: "Categories",
                        principalColumn: "FinancialCategoryId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FinancialItems_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateTable(
                name: "AttachmentItems",
                schema: "Finance",
                columns: table => new
                {
                    AttachmentItemId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FinancialItemId = table.Column<Guid>(nullable: true),
                    FinancialCategoryId = table.Column<Guid>(nullable: true),
                    Title = table.Column<string>(maxLength: 256, nullable: false),
                    Attachement = table.Column<string>(nullable: true),
                    AddedDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttachmentItems", x => x.AttachmentItemId);
                    table.ForeignKey(
                        name: "FK_AttachmentItems_Categories_FinancialCategoryId",
                        column: x => x.FinancialCategoryId,
                        principalSchema: "Finance",
                        principalTable: "Categories",
                        principalColumn: "FinancialCategoryId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AttachmentItems_FinancialItems_FinancialItemId",
                        column: x => x.FinancialItemId,
                        principalSchema: "Finance",
                        principalTable: "FinancialItems",
                        principalColumn: "FinancialItemId");
                    table.ForeignKey(
                        name: "FK_AttachmentItems_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "Security",
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AttachmentItems_FinancialCategoryId",
                schema: "Finance",
                table: "AttachmentItems",
                column: "FinancialCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_AttachmentItems_FinancialItemId",
                schema: "Finance",
                table: "AttachmentItems",
                column: "FinancialItemId");

            migrationBuilder.CreateIndex(
                name: "IX_AttachmentItems_UserId",
                schema: "Finance",
                table: "AttachmentItems",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_ParentId",
                schema: "Finance",
                table: "Categories",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_UserId",
                schema: "Finance",
                table: "Categories",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FinancialItems_CategoryId",
                schema: "Finance",
                table: "FinancialItems",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_FinancialItems_UserId",
                schema: "Finance",
                table: "FinancialItems",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId",
                schema: "Security",
                table: "RefreshTokens",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AttachmentItems",
                schema: "Finance");

            migrationBuilder.DropTable(
                name: "RefreshTokens",
                schema: "Security");

            migrationBuilder.DropTable(
                name: "FinancialItems",
                schema: "Finance");

            migrationBuilder.DropTable(
                name: "Categories",
                schema: "Finance");

            migrationBuilder.DropTable(
                name: "Users",
                schema: "Security");
        }
    }
}
