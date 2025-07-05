-- CreateTable
CREATE TABLE "estoque_itens" (
    "id" SERIAL NOT NULL,
    "estoqueId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "estoque_itens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "estoque_itens_estoqueId_itemId_key" ON "estoque_itens"("estoqueId", "itemId");

-- AddForeignKey
ALTER TABLE "estoque_itens" ADD CONSTRAINT "estoque_itens_estoqueId_fkey" FOREIGN KEY ("estoqueId") REFERENCES "estoques"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoque_itens" ADD CONSTRAINT "estoque_itens_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "equipamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
