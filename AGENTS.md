# HIMAFURI site

Follow these rules when changing the HIMAFURI site.

## Check Astro and EmDash changes

Before changing EmDash schemas or calls to EmDash, read the relevant guides from the [EmDash documentation index](https://docs.emdashcms.com/llms.txt). When the documentation differs from the installed package, verify the interfaces against `node_modules/emdash/src/`.

The owner registers the first administrator account and passkey. Local EmDash command-line content, schema, media, site, and types commands create a Dev Admin through authentication bypass. Use the direct SQLite seed command for initial local content. Leave owner account registration to the human.
