const cards = document.querySelectorAll(".glass-card");

cards.forEach(card=>{

    const btn = card.querySelector(".glass-header");

    btn.addEventListener("click",()=>{

        // Close every other card
        cards.forEach(other=>{

            if(other!==card){

                other.classList.remove("active");

            }

        });

        // Toggle current card
        card.classList.toggle("active");

    });

});