/*
  Warnings:

  - You are about to drop the column `labelCategorieRessource` on the `CategoryResource` table. All the data in the column will be lost.
  - Added the required column `labelCategoryResource` to the `CategoryResource` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CategoryResource" (
    "idCategoryResource" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "labelCategoryResource" TEXT NOT NULL
);
INSERT INTO "new_CategoryResource" ("idCategoryResource") SELECT "idCategoryResource" FROM "CategoryResource";
DROP TABLE "CategoryResource";
ALTER TABLE "new_CategoryResource" RENAME TO "CategoryResource";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
