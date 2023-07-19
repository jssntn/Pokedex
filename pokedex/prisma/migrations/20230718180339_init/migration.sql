-- CreateTable
CREATE TABLE "User" (
    "idUser" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "favPokemon" (
    "idPokemon" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,

    PRIMARY KEY ("idPokemon", "idUser"),
    CONSTRAINT "favPokemon_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_idUser_key" ON "User"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
