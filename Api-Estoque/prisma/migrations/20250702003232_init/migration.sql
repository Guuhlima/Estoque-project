/*
  Warnings:

  - You are about to drop the column `data_transferencia` on the `transferencias` table. All the data in the column will be lost.
  - You are about to drop the column `estoque_destino_id` on the `transferencias` table. All the data in the column will be lost.
  - You are about to drop the column `estoque_origem_id` on the `transferencias` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `transferencias` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `estoqueDestinoId` to the `transferencias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estoqueOrigemId` to the `transferencias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `transferencias` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transferencias" DROP CONSTRAINT "transferencias_estoque_destino_id_fkey";

-- DropForeignKey
ALTER TABLE "transferencias" DROP CONSTRAINT "transferencias_estoque_origem_id_fkey";

-- DropForeignKey
ALTER TABLE "transferencias" DROP CONSTRAINT "transferencias_item_id_fkey";

-- AlterTable
ALTER TABLE "estoques" RENAME CONSTRAINT "estoque_pkey" TO "estoques_pkey";

-- AlterTable
ALTER TABLE "transferencias" DROP COLUMN "data_transferencia",
DROP COLUMN "estoque_destino_id",
DROP COLUMN "estoque_origem_id",
DROP COLUMN "item_id",
ADD COLUMN     "dataTransferencia" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "estoqueDestinoId" INTEGER NOT NULL,
ADD COLUMN     "estoqueOrigemId" INTEGER NOT NULL,
ADD COLUMN     "itemId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "transferencias" ADD CONSTRAINT "transferencias_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "equipamentos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transferencias" ADD CONSTRAINT "transferencias_estoqueOrigemId_fkey" FOREIGN KEY ("estoqueOrigemId") REFERENCES "estoques"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transferencias" ADD CONSTRAINT "transferencias_estoqueDestinoId_fkey" FOREIGN KEY ("estoqueDestinoId") REFERENCES "estoques"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
