import React, { useContext } from 'react'
import './Topcategory.css';
import myContext from '../../context/data/myContexr';
import birthday from './birthday.png';
import anniversary from './anniverasry.jpg';
import kidsparty from './kidsparty.jpg';
import babyshower from './babyshower.png';
import balloon from './balloon.png';
import entry from './entry.png';
import party from './party.jpg';
import weddingdecore from './weddingdecore.jpg';
function Topcategory() {
    const context = useContext(myContext);
    const { mode} = context;
  return (
    <div className="container px-5 py-8 md:py-16 mx-auto">

    <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 " style={{color: '#042159'}}>
                        Our Top
                    </h1>
                    <div className="h-1 w-20 bg-pink-600 rounded" style={{backgroundColor: '#ff2768'}}></div>
                </div>
    <div className='topcategory'>
      <div class="Container">
        
        <article class="card">
          <img
            class="card__background"
            src={birthday}
            alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
            width="1920"
            height="2193"
          />
          <div class="card__content | flow">
            <div class="card__content--container | flow">
            </div>
            </div>
            <h2 class="card__title">Birthday's</h2>
        </article>
        <article class="card">
          <img
            class="card__background"
            src={anniversary}
            alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
            width="1920"
            height="2193"
          />
          <div class="card__content | flow">
            <div class="card__content--container | flow">
            </div>
            </div>
            <h2 class="card__title">Anniversary's</h2>
        </article>
   

        <article class="card">
          <img
            class="card__background"
            src={kidsparty}
            alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
            width="1920"
            height="2193"
          />
          <div class="card__content | flow">
            <div class="card__content--container | flow">
            </div>
            </div>
            <h2 class="card__title">Kid's Party</h2>
        </article>
        <article class="card">
          <img
            class="card__background"
            src={babyshower}
            alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
            width="1920"
            height="2193"
          />
          <div class="card__content | flow">
            <div class="card__content--container | flow">
              
            </div>
            </div>
            <h2 class="card__title">Baby Shower</h2>
        </article>
  
      </div>
      <div class="Container">

      <article class="card">
          <img
            class="card__background"
            src={balloon}
            alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
            width="1920"
            height="2193"
          />
          <div class="card__content | flow">
            <div class="card__content--container | flow">
            </div>
            </div>
            <h2 class="card__title">Balloon Decoration</h2>
        </article>
        <article class="card">
          <img
            class="card__background"
            src={entry}
            alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
            width="1920"
            height="2193"
          />
          <div class="card__content | flow">
            <div class="card__content--container | flow">
             </div>
            </div>
            <h2 class="card__title">Bridal Entry</h2>
        </article>
      
        <article class="card">
          <img
            class="card__background"
            src={weddingdecore}
            alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
            width="1920"
            height="2193"
          />
          <div class="card__content | flow">
            <div class="card__content--container | flow">
              </div>
            </div>
            <h2 class="card__title">Wedding Decors</h2>
        </article>
        
        <article class="card">
          <img
            class="card__background"
            src={party}
            alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
            width="1920"
            height="2193"
          />
          <div class="card__content | flow">
            <div class="card__content--container | flow">
              </div>
            </div>
            <h2 class="card__title">Party</h2>
        </article>
      </div>
      </div>  
    </div>
  )
}

export default Topcategory
