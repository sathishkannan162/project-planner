CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"completed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
