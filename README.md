# SvelteKit

Example project using SvelteKit with the Supabase (Email and password) authentication.

Authentication is performed on the client side, but allows once authenticated to perform requests server side for SSR (each user request being authenticated through the supabase jwt).

The authentication flow:
- Authentication with supabase-js library client side
- onAuthStateChange method in the root routes __layout will post to the `
auth.json` when the `SIGNED_IN` event is being processed (and same for `SIGNED_OUT`)
- `auth.json` sets the jwt as a cookie in the response, allowing future requests to be authenticated (deletes the cookie in the case of sign out)
- `hooks.js` will authenticate teh server side supabase client instance for each request and set the user detail in the `session`.

## Developing

You must create a `.env` file with your supabase credentials containing the following variables. You can find these two information in your supabase project dashboard.

```
VITE_SUPABASE_ANON_KEY="****"
VITE_SUPABASE_URL="****"

```
Once you've created a project and installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```
