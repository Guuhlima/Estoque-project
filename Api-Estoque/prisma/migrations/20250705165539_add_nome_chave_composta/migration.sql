/*
  Warnings:

  - A unique constraint covering the columns `[itemId,estoqueId]` on the table `estoque_itens` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "estoque_itens_estoqueId_itemId_key";

-- CreateIndex
CREATE UNIQUE INDEX "estoque_itens_itemId_estoqueId_key" ON "estoque_itens"("itemId", "estoqueId");
