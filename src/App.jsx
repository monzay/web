import "./app.css";
import "animate.css";
import fondoSpiderMan from "./img-spider-man-web-obtimizadas/fondo-spider-man-max.png";
import spiderManPng from "./img-spider-man-web-obtimizadas/spider-man-max.png";
import { useEffect, useState, useRef } from "react";
import { history } from "./info";
import araña from "./img-spider-man-web-obtimizadas/araña-spider-man.png";


export const App = () => {
  const [movimiento, setMovimiento] = useState(0);
  const [obtenerID, setObtenerID] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [descripcionID, setdescripcionID] = useState([]);
  const [wordObtenidas, setWordObtenidas] = useState([]);

  useEffect(() => {
    let evScroll = () => {
      let scroll = window.scrollY;
      setMovimiento(scroll);
    };
    window.addEventListener("scroll", evScroll);
    return () => {
      window.removeEventListener("scroll", evScroll);
    };
  }, [movimiento]);

  useEffect(() => {
    let descripcion = history.find((img) => img.id === obtenerID);
    if (descripcion) {
      setdescripcionID(descripcion.descripcion.split(""));
    }
  }, [obtenerID]);

  useEffect(() => {
    let word = 0;
    let interval = setInterval(() => {
      if (word < descripcionID.length || word === undefined) {
        setWordObtenidas((prevWord) => ([...prevWord, descripcionID[word]]));
        word++;
      }
    }, 60);

    return () => clearInterval(interval);
  }, [descripcionID]);


  useEffect(() => {
    setWordObtenidas([])

  }, [descripcionID]);


   const secInfoConteinerText =useRef()
   useEffect(()=>{
     let elementReferent =  secInfoConteinerText.current.offsetTop;
    
     if(movimiento >= elementReferent - 20){
      setShowAnimation(true)
     }else setShowAnimation(false)
   },[showAnimation]
   )


  return (
    <div>
      <main>
        <section className="sec-portada">
          <img
            className="sec-portada-fondo"
            src={fondoSpiderMan}
            style={{ transform: `translateY(${movimiento * -0.12}px)` }}
            alt=""
          />
          <img
            className="sec-portada-personaje"
            src={spiderManPng}
            alt=""
            style={{ transform: `translateY(${movimiento * 0.2}px)` }}
          />
          <h1 className="sec-portada-title animate__animated animate__zoomIn ">
            Spider man
          </h1>
        </section>

        <section className="sec-info">
          <div ref={secInfoConteinerText} className={`sec-info-conteiner-text ${showAnimation ? "isActiveAnimation" :""} `}>
            <h2 className="sec-info-title">Mais Morales</h2>
            <span className="sec-info-descripcion">
              Mais morales es un chico latinoamericano que le gusta la fisica
              cuantica pero como como a cual adolecente hace las cosas que no
              <br /> le gusta por la culpa de sus padre,pero todo iba cambiar un
              dia...
            </span>
          </div>
          <img
            className="sec-info-img"
            style={{ transform: `translateY(${movimiento * 0.1}px)` }}
            src={araña}
            alt=""
          />
        </section>

        <section className="sec-img">
          <div className="conteiner">
            <div className="conteiner-img">
              {history.map((img) => {
                return (
                  <div key={img.id} className="img">
                    <img
                      onClick={() => setObtenerID(img.id)}
                      className="img-spider-man"
                      src={img.img}
                    />
                  </div>
                );
              })}
              
            </div>
            <div className="conteiner-show">
              <div className="show">
                {history.map((img) => {
                  if (img.id === obtenerID) {
                    return (
                      <img key={img.id} className="show-imgID" src={img.img} />
                    );
                  }
                })}
              </div>
              <div className="info">
                <span className="descripcion-imgID">
                  <span className="descripcion-imgID">{wordObtenidas}</span>
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="contacto">
          <h3 className="contacto-text">Contacto</h3>
          <a
            className="contacto-instagram"
            href="https://www.instagram.com/yoel.gds/"
          >
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
};
