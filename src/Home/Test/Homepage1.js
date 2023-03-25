import React from 'react'
import './homepage.css'
const Homepage1 = () => {
    const polygons = document.querySelectorAll('.polygon');
    let currentIndex = 0;

    function swapPolygons() {
        polygons[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % polygons.length;
        polygons[currentIndex].classList.add('active');
    }

    setInterval(swapPolygons, 3000);
    return (

        <div class="container">
            <div class="polygon">
                1
            </div>
            <div class="polygon">
                2
            </div>
            <div class="polygon">
                3
            </div>
            <div class="polygon">
                4
            </div>
            <div class="polygon">
                5
            </div>
            <div class="polygon">
                6
            </div>
        </div>


    )
}

export default Homepage1