-- Blog SEO + FAQ Json (idempotent)
ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "metaTitle" TEXT;
ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "metaDescription" TEXT;
ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "faqs" JSONB;
ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "publishedAt" TIMESTAMP(3);

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'Blog' AND column_name = 'faqs' AND data_type = 'text'
  ) THEN
    ALTER TABLE "Blog"
      ALTER COLUMN "faqs" TYPE JSONB
      USING CASE
        WHEN "faqs" IS NULL OR btrim("faqs") = '' THEN NULL
        ELSE "faqs"::jsonb
      END;
  END IF;
END $$;
