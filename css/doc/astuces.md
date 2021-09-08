# Astuces en CSS

### Ajuster la hauteur de la couleur du background d'une balise HTML

HTML

    <p class="my_para">Mon paragraphe</p>


CSS

    .my_para {
        background: linear-gradient(to right, rgb(28, 169, 28), rgb(28, 169, 28)) left bottom no-repeat;
        background-size: 100% 47px;
    }

#### Avoir les images à la même hauteur dans une liste carte composer de textes au dessus et d'images en bas  

On donne une hauteur à la balise div qui contient le texte, exemple : .card_text { height: 590px; }

CSS

    .list_card {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding: 80px;
    }

    .card {
        background-color:#C8C8C8;
        width: 340px;
    }   

    .card_text {
        padding: 20px 20px 0 20px ;
        height: 590px;
    } 

    .card_img {
        height: 150px;
    }



HTML

    <section class="list_card">

        <div class="card">

            <div class="card_text">

                <h3> El titro <h3>

                <p>
                    blabla blabla blabla blabla blabla blabla blabla blabla

                    blabla blabla blabla blabla blabla blabla blabla blabla

                    blabla blabla blabla blabla blabla blabla blabla blabla 
                </p>
            </div>

            <img src="public/img/my_image.png" alt="my_image" class="card_img">
        </div>

        <div class="card">

            <div class="card_text">

                <h3> El titro <h3>

                <p>
                    blabla blabla blabla blabla blabla blabla blabla blabla

                    blabla blabla blabla blabla blabla blabla blabla blabla

                    blabla blabla blabla blabla blabla blabla blabla blabla 

                    blabla blabla blabla blabla blabla blabla blabla blabla
                </p>
            </div>

            <img src="public/img/my_image.png" alt="my_image" class="card_img">
        </div>

        <div class="card">

            <div class="card_text">

                <h3> El titro <h3>

                <p>
                    blabla blabla blabla blabla blabla blabla blabla blabla

                    blabla blabla blabla blabla blabla blabla blabla blabla

                    blabla blabla blabla blabla blabla blabla blabla blabla 

                    blabla blabla blabla blabla blabla blabla blabla blabla

                    blabla blabla blabla blabla blabla blabla blabla blabla
                </p>
            </div>

            <img src="public/img/my_image.png" alt="my_image" class="card_img">
        </div>
    </section>