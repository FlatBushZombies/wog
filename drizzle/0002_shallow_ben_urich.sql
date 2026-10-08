ALTER TABLE "members" ADD COLUMN "church" text DEFAULT 'Word of Grace' NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "branch" text DEFAULT 'Main Branch' NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "added_by" text;