-- CreateTable
CREATE TABLE "CommentsOnResources" (
    "userId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,
    "contentComment" TEXT NOT NULL,

    PRIMARY KEY ("userId", "resourceId"),
    CONSTRAINT "CommentsOnResources_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CommentsOnResources_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource" ("idResource") ON DELETE RESTRICT ON UPDATE CASCADE
);
