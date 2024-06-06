-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resource" (
    "idResource" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isValidated" BOOLEAN NOT NULL DEFAULT false,
    "isExploited" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    "categoryResourceId" INTEGER NOT NULL,
    "typeResourceId" INTEGER NOT NULL,
    CONSTRAINT "Resource_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resource_categoryResourceId_fkey" FOREIGN KEY ("categoryResourceId") REFERENCES "CategoryResource" ("idCategoryResource") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resource_typeResourceId_fkey" FOREIGN KEY ("typeResourceId") REFERENCES "TypeResource" ("idTypeResource") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resource" ("authorId", "categoryResourceId", "content", "idResource", "isArchived", "isFavorite", "isValidated", "title", "typeResourceId") SELECT "authorId", "categoryResourceId", "content", "idResource", "isArchived", "isFavorite", "isValidated", "title", "typeResourceId" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
PRAGMA foreign_key_check("Resource");
PRAGMA foreign_keys=ON;
