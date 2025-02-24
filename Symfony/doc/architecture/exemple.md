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
                        -- categoryFunction.js
                    |
                    -- product
                        |
                        -- product.js
                        |
                        -- productFunction.js
            |
            -- admin (Si les pages admin sont différentes du frontend)
                |
                -- pages
                    |
                    -- category
                        |
                        -- category.js
                        |
                        -- categoryFunction.js
                    |
                    -- product
                        |
                        -- product.js
                        |
                        -- productFunction.js
            |
            -- components
                |
                -- validFormFunction.js
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
            -- admin (Si les pages admin sont différentes du frontend)
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
                    -- components
                        |
                        -- form.html.twig
            |
            -- components
                |
                -- form.html.twig
        |
        -- admin (Si les pages admin sont différentes du frontend)
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