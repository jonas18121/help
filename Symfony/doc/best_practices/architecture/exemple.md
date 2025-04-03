# Exemple d'architecture de dossiers et fichiers (Twig, JS, CSS)


```text
projet
    |
    -- public
        |
        -- js
            |
            -- frontend
                |
                -- pages
                    |
                    -- category
                        |
                        -- category.js
                        |
                        -- categoryClass.js
                    |
                    -- product
                        |
                        -- product.js
                        |
                        -- productClass.js
            |
            -- backend (Si les pages admin sont différentes du frontend)
                |
                -- pages
                    |
                    -- category
                        |
                        -- category.js
                        |
                        -- categoryClass.js
                    |
                    -- product
                        |
                        -- product.js
                        |
                        -- productClass.js
            |
            -- components
                |
                -- validFormClass.js
            |
            -- plugins
            |
            -- library
            |
            -- general
                |
                -- general.js
                |
                -- bootstrap.js
                |
                -- validForm.js
        |
        -- css
            |
            -- frontend
                |
                -- pages
                    |
                    -- category
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- Desktop.css
                            |
                            -- tablet.css
                            |
                            -- mobile.css
                    |
                    -- product
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- Desktop.css
                            |
                            -- tablet.css
                            |
                            -- mobile.css
            |
            -- backend (Si les pages admin sont différentes du frontend)
                |
                -- pages
                    |
                    -- category
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- Desktop.css
                            |
                            -- tablet.css
                            |
                            -- mobile.css
                    |
                    -- product
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- Desktop.css
                            |
                            -- tablet.css
                            |
                            -- mobile.css
            |
            -- components
                |
                -- searchbar
                    |
                    -- index.css
                    |
                    -- screens
                        |
                        -- Desktop.css
                        |
                        -- tablet.css
                        |
                        -- mobile.css
                |
                -- navbar
                    |
                    -- index.css
                    |
                    -- screens
                        |
                        -- Desktop.css
                        |
                        -- tablet.css
                        |
                        -- mobile.css
            |
            -- general
                |
                -- general.css
                |
                -- bootstrap.css
                |
                -- variables.css
    |
    -- src
    |
    -- templates
        |
        -- frontend
            |
            -- pages
                |
                -- category
                    |
                    -- list.html.twig
                    |
                    -- create.html.twig
                    |
                    -- update.html.twig
                    |
                    -- detail.html.twig
                    |
                    -- components
                        |
                        -- form.html.twig
                |
                -- product
                    |
                    -- list.html.twig
                    |
                    -- create.html.twig
                    |
                    -- update.html.twig
                    |
                    -- detail.html.twig
                    |
                    -- components
                        |
                        -- form.html.twig
            |
            -- components
                |
                -- form.html.twig
        |
        -- backend (Si les pages admin sont différentes du frontend)
            |
            -- pages
                |
                -- category
                    |
                    -- list.html.twig
                    |
                    -- create.html.twig
                    |
                    -- update.html.twig
                    |
                    -- detail.html.twig
                    |
                    -- components
                        |
                        -- form.html.twig
                |
                -- product
                    |
                    -- list.html.twig
                    |
                    -- create.html.twig
                    |
                    -- update.html.twig
                    |
                    -- detail.html.twig
                    |
                    -- components
                        |
                        -- form.html.twig
            |
            -- components
                |
                -- form.html.twig
        |
        -- components
            |
            -- searchbar.html.twig
            |
            -- navbar.html.twig
            |
            -- header.html.twig
            |
            -- footer.html.twig
        |
        -- plugins
        |
        -- library
        |
        -- general
            |
            -- base.html.twig
            |
            -- layout.html.twig
```