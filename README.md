# Barceló Guatemala City — Formulario público

Web independiente donde el huésped deja su correo y recibe un cupón.
Escribe en la base de datos de Supabase mediante un backend seguro.

## Puesta en marcha
1. `npm install`
2. Copia `.env.example` a `.env.local` y pon la URL y la **service_role key**
   de Supabase (el mismo proyecto que usa la web de consultas).
3. `npm run dev` → http://localhost:3000

## Notas
- La `service_role key` es secreta y solo se usa en el servidor. Nunca se
  expone al navegador.
- El código de cupón lo genera la base de datos automáticamente.
- La base de datos y su esquema (`schema.sql`) están en el proyecto
  `barcelo-consultas`. Ejecuta ese esquema una sola vez en Supabase.
