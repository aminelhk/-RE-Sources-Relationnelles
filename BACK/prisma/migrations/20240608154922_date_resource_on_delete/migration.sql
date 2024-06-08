-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Share" (
    "idShare" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Share_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Share_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource" ("idResource") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Share" ("createdAt", "idShare", "resourceId", "userId") SELECT "createdAt", "idShare", "resourceId", "userId" FROM "Share";
DROP TABLE "Share";
ALTER TABLE "new_Share" RENAME TO "Share";
CREATE TABLE "new_Resource" (
    "idResource" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isValidated" BOOLEAN NOT NULL DEFAULT false,
    "isExploited" BOOLEAN NOT NULL DEFAULT false,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    "categoryResourceId" INTEGER NOT NULL,
    "typeResourceId" INTEGER NOT NULL,
    CONSTRAINT "Resource_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resource_categoryResourceId_fkey" FOREIGN KEY ("categoryResourceId") REFERENCES "CategoryResource" ("idCategoryResource") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Resource_typeResourceId_fkey" FOREIGN KEY ("typeResourceId") REFERENCES "TypeResource" ("idTypeResource") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Resource" ("authorId", "categoryResourceId", "content", "idResource", "isArchived", "isExploited", "isFavorite", "isPrivate", "isValidated", "title", "typeResourceId") SELECT "authorId", "categoryResourceId", "content", "idResource", "isArchived", "isExploited", "isFavorite", "isPrivate", "isValidated", "title", "typeResourceId" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
CREATE TABLE "new_Comment" (
    "idComment" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,
    "parentId" INTEGER,
    CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource" ("idResource") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment" ("idComment") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("authorId", "content", "createdAt", "idComment", "parentId", "resourceId") SELECT "authorId", "content", "createdAt", "idComment", "parentId", "resourceId" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE TABLE "new_User" (
    "idUser" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isPrivate" BOOLEAN NOT NULL DEFAULT true,
    "vitalCardNumber" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("idRole") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "firstName", "idUser", "isActive", "isPrivate", "lastName", "password", "phone", "pseudo", "roleId", "vitalCardNumber") SELECT "email", "firstName", "idUser", "isActive", "isPrivate", "lastName", "password", "phone", "pseudo", "roleId", "vitalCardNumber" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
CREATE UNIQUE INDEX "User_vitalCardNumber_key" ON "User"("vitalCardNumber");
PRAGMA foreign_key_check("Share");
PRAGMA foreign_key_check("Resource");
PRAGMA foreign_key_check("Comment");
PRAGMA foreign_key_check("User");
PRAGMA foreign_keys=ON;
