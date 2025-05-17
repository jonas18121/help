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
                -- category
                    |
                    -- create
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- category_create_desktop.css
                            |
                            -- category_create_tablet.css
                            |
                            -- category_create_mobile.css
                    |
                    -- update
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- category_update_desktop.css
                            |
                            -- category_update_tablet.css
                            |
                            -- category_update_mobile.css
                    |
                    -- detail
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- category_detail_desktop.css
                            |
                            -- category_detail_tablet.css
                            |
                            -- category_detail_mobile.css
                    |
                    -- list
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- category_list_desktop.css
                            |
                            -- category_list_tablet.css
                            |
                            -- category_list_mobile.css
                |
                -- product
                    |
                    -- create
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- product_create_desktop.css
                            |
                            -- product_create_tablet.css
                            |
                            -- product_create_mobile.css
                    |
                    -- update
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- product_update_desktop.css
                            |
                            -- product_update_tablet.css
                            |
                            -- product_update_mobile.css
                    |
                    -- detail
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- product_detail_desktop.css
                            |
                            -- product_detail_tablet.css
                            |
                            -- product_detail_mobile.css
                    |
                    -- list
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- product_list_desktop.css
                            |
                            -- product_list_tablet.css
                            |
                            -- product_list_mobile.css
            |
            -- backend (Si les pages admin sont différentes du frontend)
                |
                -- category
                    |
                    -- create
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- backend_category_create_desktop.css
                            |
                            -- backend_category_create_tablet.css
                            |
                            -- backend_category_create_mobile.css
                    |
                    -- update
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- backend_category_update_desktop.css
                            |
                            -- backend_category_update_tablet.css
                            |
                            -- backend_category_update_mobile.css
                    |
                    -- detail
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- backend_category_detail_desktop.css
                            |
                            -- backend_category_detail_tablet.css
                            |
                            -- backend_category_detail_mobile.css
                    |
                    -- list
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- backend_category_list_desktop.css
                            |
                            -- backend_category_list_tablet.css
                            |
                            -- backend_category_list_mobile.css
                |
                -- product
                    |
                    -- create
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- backend_product_create_desktop.css
                            |
                            -- backend_product_create_tablet.css
                            |
                            -- backend_product_create_mobile.css
                    |
                    -- update
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- backend_product_update_desktop.css
                            |
                            -- backend_product_update_tablet.css
                            |
                            -- backend_product_update_mobile.css
                    |
                    -- detail
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- backend_product_detail_desktop.css
                            |
                            -- backend_product_detail_tablet.css
                            |
                            -- backend_product_detail_mobile.css
                    |
                    -- list
                        |
                        -- index.css
                        |
                        -- screens
                            |
                            -- backend_product_list_desktop.css
                            |
                            -- backend_product_list_tablet.css
                            |
                            -- backend_product_list_mobile.css
            |
            -- components
                |
                -- searchbar
                    |
                    -- index.css
                    |
                    -- screens
                        |
                        -- searchebar_desktop.css
                        |
                        -- searchebar_tablet.css
                        |
                        -- searchebar_mobile.css
                |
                -- navbar
                    |
                    -- index.css
                    |
                    -- screens
                        |
                        -- navbar_desktop.css
                        |
                        -- navbar_tablet.css
                        |
                        -- navbar_mobile.css
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
            -- category
                |
                -- category_list.html.twig
                |
                -- category_create.html.twig
                |
                -- category_update.html.twig
                |
                -- category_detail.html.twig
                |
                -- components
                    |
                    -- form.html.twig
            |
            -- product
                |
                -- product_list.html.twig
                |
                -- product_create.html.twig
                |
                -- product_update.html.twig
                |
                -- product_detail.html.twig
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
            -- category
                |
                -- backend_category_list.html.twig
                |
                -- backend_category_create.html.twig
                |
                -- backend_category_update.html.twig
                |
                -- backend_category_detail.html.twig
                |
                -- components
                    |
                    -- form.html.twig
            |
            -- product
                |
                -- backend_product_list.html.twig
                |
                -- backend_product_create.html.twig
                |
                -- backend_product_update.html.twig
                |
                -- _backend_product_detail.html.twig
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