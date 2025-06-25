-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "charges_id" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_charges_id_fkey" FOREIGN KEY ("charges_id") REFERENCES "charges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
