-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT,
    "senha" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMP(3) NOT NULL,
    "ultimo_login" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Telefone" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "ddd" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Telefone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Telefone" ADD CONSTRAINT "Telefone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
