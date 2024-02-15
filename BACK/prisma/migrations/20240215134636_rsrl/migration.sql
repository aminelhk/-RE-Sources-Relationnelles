-- CreateTable
CREATE TABLE "User" (
    "idUser" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isPrivet" BOOLEAN NOT NULL DEFAULT true,
    "vitalCardNumber" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("idRole") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Resource" (
    "idResource" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isValidated" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    "categoryResourceId" INTEGER NOT NULL,
    "typeResourceId" INTEGER NOT NULL,
    CONSTRAINT "Resource_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resource_categoryResourceId_fkey" FOREIGN KEY ("categoryResourceId") REFERENCES "CategoryResource" ("idCategoryResource") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resource_typeResourceId_fkey" FOREIGN KEY ("typeResourceId") REFERENCES "TypeResource" ("idTypeResource") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Role" (
    "idRole" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "labelRole" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TypeRelation" (
    "idTypeRelation" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "labelTypeRelation" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "StateTypeRelation" (
    "idStateTypeRelation" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "labelStateTypeRelation" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CategoryResource" (
    "idCategoryResource" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "labelCategorieRessource" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TypeResource" (
    "idTypeResource" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "labelTypeResource" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ResourceToTypeRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ResourceToTypeRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Resource" ("idResource") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ResourceToTypeRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "TypeRelation" ("idTypeRelation") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ResourceToStateTypeRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ResourceToStateTypeRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Resource" ("idResource") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ResourceToStateTypeRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "StateTypeRelation" ("idStateTypeRelation") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TypeRelationToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TypeRelationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "TypeRelation" ("idTypeRelation") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TypeRelationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_StateTypeRelationToTypeRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_StateTypeRelationToTypeRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "StateTypeRelation" ("idStateTypeRelation") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StateTypeRelationToTypeRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "TypeRelation" ("idTypeRelation") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_vitalCardNumber_key" ON "User"("vitalCardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_roleId_key" ON "User"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_authorId_key" ON "Resource"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_categoryResourceId_key" ON "Resource"("categoryResourceId");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_typeResourceId_key" ON "Resource"("typeResourceId");

-- CreateIndex
CREATE UNIQUE INDEX "_ResourceToTypeRelation_AB_unique" ON "_ResourceToTypeRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_ResourceToTypeRelation_B_index" ON "_ResourceToTypeRelation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ResourceToStateTypeRelation_AB_unique" ON "_ResourceToStateTypeRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_ResourceToStateTypeRelation_B_index" ON "_ResourceToStateTypeRelation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TypeRelationToUser_AB_unique" ON "_TypeRelationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TypeRelationToUser_B_index" ON "_TypeRelationToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StateTypeRelationToTypeRelation_AB_unique" ON "_StateTypeRelationToTypeRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_StateTypeRelationToTypeRelation_B_index" ON "_StateTypeRelationToTypeRelation"("B");
