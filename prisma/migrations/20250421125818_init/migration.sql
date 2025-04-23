-- CreateTable
CREATE TABLE "usermarkdown" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "markdown" TEXT NOT NULL,
    "crticalID" VARCHAR(10) NOT NULL,

    CONSTRAINT "usermarkdown_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usermarkdown_crticalID_key" ON "usermarkdown"("crticalID");
