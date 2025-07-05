-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255),
    "email" VARCHAR(255),
    "matricula" INTEGER,
    "senha" VARCHAR(255),

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipamentos" (
    "id" SERIAL NOT NULL,
    "equipamento" VARCHAR(255),
    "quantidade" INTEGER,
    "data" DATE,

    CONSTRAINT "equipamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estoques" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transferencias" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "estoque_origem_id" INTEGER NOT NULL,
    "estoque_destino_id" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "data_transferencia" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transferencias_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transferencias" ADD CONSTRAINT "transferencias_estoque_destino_id_fkey" FOREIGN KEY ("estoque_destino_id") REFERENCES "estoques"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transferencias" ADD CONSTRAINT "transferencias_estoque_origem_id_fkey" FOREIGN KEY ("estoque_origem_id") REFERENCES "estoques"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transferencias" ADD CONSTRAINT "transferencias_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "equipamentos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
