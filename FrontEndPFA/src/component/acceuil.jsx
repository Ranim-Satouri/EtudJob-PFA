import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Image from "../component/img/EtudJob.png";
import Image1 from "../component/img/etud.png";
import Image2 from "../component/img/im3 (2).png";
import acceuil from "./acceuil.module.css";
import image1 from "../component/home/job6.jpg";
import image2 from "../component/home/job3.jpg";
import image3 from "../component/home/job9.png";
import image4 from "../component/home/job10.jpg";
import facebook from "../component/img/facebook.png";
import instagram from "../component/img/instagram.png";
import email from "../component/img/enveloppe.png";
function Acceuil() {
  return (
    <div className={acceuil.backgrounddiv}>
      <header className={acceuil.header}>
        <img src={Image1} alt="" className={acceuil.logo}></img>
        <ul className={acceuil.navlist}>
          <li className={acceuil.navitem}>
            <Link to="/login" className={acceuil.link1}>
              Login
            </Link>
          </li>
          <li className={acceuil.navitem}>
            <Link to="/inscrit" className={acceuil.link2}>
              Inscription
            </Link>
          </li>
        </ul>
      </header>
      <div className={acceuil.backgroundimg}>
        <h1 className={acceuil.h1}>Welcome to EtudJob</h1>
      </div>
      <div className={acceuil.description}>
        <p className={acceuil.pdisc}>
          Explorez notre plateforme interactive conçue pour faciliter la
          connexion entre les étudiants à la recherche de travail à temps
          partiel flexible pour augmenter leurs revenus et les employeurs à la
          recherche de talents. Bienvenue dans votre nouvel espace pour trouver
          le job parfait.
        </p>
      </div>
      <div className={acceuil.boxim}>
        <div className={acceuil.blocim}>
          <div className={acceuil.para}>
            <div className={acceuil.parainterne}>
              <h2 className={acceuil.parah2}>Opportunités sur mesure</h2>
              <p className={acceuil.parap}>
                Des offres adaptées à votre emploi du temps d'étudiant. Trouvez
                le job qui s'adapte à votre rythme et vos besoins.
              </p>
            </div>
          </div>
          <div className={acceuil.image1}>
            <img src={image1} alt="image1" className={acceuil.image} />
          </div>
        </div>
        <div className={acceuil.blocim1}>
          <div className={acceuil.para}>
            <div className={acceuil.parainterne}>
              <h2 className={acceuil.parah2}>L'avenir est à portée de clic</h2>
              <p className={acceuil.parap}>
                Votre prochain job vous attend. Découvrez les opportunités qui
                vous permettront de vous épanouir tout en conciliant études et
                travail.
              </p>
            </div>
          </div>
          <div className={acceuil.image2}>
            <img src={image2} alt="image2" className={acceuil.image} />
          </div>
        </div>
        <div className={acceuil.blocim}>
          <div className={acceuil.para}>
            <div className={acceuil.parainterne}>
              <h2 className={acceuil.parah2}>Trouvez votre opportunité</h2>
              <p className={acceuil.parap}>
                Explorez les offres qui vous correspondent et contactez les
                employeurs en un clic pour exprimer votre intérêt.
              </p>
            </div>
          </div>
          <div className={acceuil.image3}>
            <img src={image3} alt="image3" className={acceuil.image} />
          </div>
        </div>
        <div className={acceuil.blocim1}>
          <div className={acceuil.para}>
            <div className={acceuil.parainterne}>
              <h2 className={acceuil.parah2}>
                Opportunités pour les employeurs
              </h2>
              <p className={acceuil.parap}>
                Découvrez dès maintenant comment trouver les étudiants parfaits
                pour vos projets et missions spécifiques.
              </p>
            </div>
          </div>
          <div className={acceuil.image4}>
            <img src={image4} alt="image4" className={acceuil.image} />
          </div>
        </div>
      </div>

      <footer className={acceuil.footer}>
          <div className={acceuil.contact}>
            <a href="https://www.facebook.com/" target="_blank" className={acceuil.link}>
              <img src={facebook} alt="Facebook" className={acceuil.icon} />
              {/* <p className={acceuil.picon}>Facebook</p> */}
            </a>
            <a href="https://www.instagram.com/" target="_blank" className={acceuil.link}>
              <img src={instagram} alt="Instagram" className={acceuil.icon} />
              {/* <p className={acceuil.picon}>Instagram</p> */}
            </a>
            <a href="https://www.google.com/intl/fr/gmail/about/" target="_blank" className={acceuil.link}>
              <img src={email} alt="Email" className={acceuil.icon} />
              {/* <p className={acceuil.picon}>Email</p> */}
            </a>

          </div>
          <div className={acceuil.labels}>
            <p className={acceuil.labelspara}>Home</p>
            <p className={acceuil.labelspara}>News</p>
            <p className={acceuil.labelspara}>About</p>
            <p className={acceuil.labelspara}>Contact Us</p>
            <p className={acceuil.labelspara}>Our Team</p>
          </div>
          <div class={acceuil.copyright}>
            <p className={acceuil.copyrightp}>INFERNO Copyright © 2021 Inferno - All rights reserved || Designed By: Mahesh</p>
          </div>
      </footer>
      {/* <img src={Image} alt='' className={acceuil.background}></img>
    <div className={acceuil.text}>
      <p className={acceuil.qu1}><span className={acceuil.span}>Envie de gagner un peu d'argent tout en jonglant avec vos cours ? </span><br /> Bienvenue chez nous,</p>
      <p className={acceuil.p2}> <strong>Etudiants !</strong> </p>
      <p id={acceuil.p1}>EtudJob est là pour vous simplifier la vie !</p>
      <p className={acceuil.p3}><strong>EtudJob</strong> est une plateforme en ligne dédiée aux étudiants, offrant 
    des opportunités  <br /> de travail à temps partiel pour générer un revenu d'appoint,
    adaptées à leurs <br /> horaires chargés et à leurs besoins financiers.</p>
    </div> */}
    </div>

    /* <p> </p>
      <div id={acceuil.acc2}>
        <div id={acceuil.link1}>
        <Link to="/inscrit">Inscrire</Link>
        <Link to="" id={acceuil.l2}>Login in </Link>
        </div>
        <div id={acceuil.pic}>
          <img src={Image} alt='' id={acceuil.im1}></img>
        </div>
        <div id={acceuil.p1} style={{textAlign:'justify',marginLeft:'430px'}}><p id={acceuil.qu1}>Envie de gagner un peu d'argent tout en jonglant avec vos cours ? EtudJob est là pour vous simplifier la vie !</p></div>
        <p id={acceuil.p2} style={{textAlign:'justify'}}><strong>EtudJob</strong> est une plateforme en ligne dédiée aux étudiants, offrant 
        des opportunités de travail à temps partiel pour générer un revenu d'appoint,
        adaptées à leurs horaires chargés et à leurs besoins financiers."</p>
       <div id={acceuil.pic2}>
        <img src={Image2} alt='' id={acceuil.im2}></img>
        </div>
      </div> */
  );
}

export default Acceuil;
