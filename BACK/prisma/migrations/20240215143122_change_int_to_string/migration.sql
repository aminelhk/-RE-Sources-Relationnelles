-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "idUser" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isPrivet" BOOLEAN NOT NULL DEFAULT true,
    "vitalCardNumber" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("idRole") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "firstName", "idUser", "isActive", "isPrivet", "lastName", "password", "phone", "pseudo", "roleId", "vitalCardNumber") SELECT "email", "firstName", "idUser", "isActive", "isPrivet", "lastName", "password", "phone", "pseudo", "roleId", "vitalCardNumber" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
CREATE UNIQUE INDEX "User_vitalCardNumber_key" ON "User"("vitalCardNumber");
CREATE UNIQUE INDEX "User_roleId_key" ON "User"("roleId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
