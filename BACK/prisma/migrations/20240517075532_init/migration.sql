-- CreateTable
CREATE TABLE "Share" (
    "idShare" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Share_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Share_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource" ("idResource") ON DELETE RESTRICT ON UPDATE CASCADE
);