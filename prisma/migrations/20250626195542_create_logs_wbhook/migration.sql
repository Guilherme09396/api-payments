-- CreateTable
CREATE TABLE "logs_webhook" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event" TEXT NOT NULL,
    "charge_id" TEXT NOT NULL,

    CONSTRAINT "logs_webhook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "logs_webhook" ADD CONSTRAINT "logs_webhook_charge_id_fkey" FOREIGN KEY ("charge_id") REFERENCES "charges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
