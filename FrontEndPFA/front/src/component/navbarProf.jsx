import React from 'react';
import { Link } from 'react-router-dom';
import Save from '../component/img/save.png';
import styles from'./navbarProf.module.css';
import Image1 from '../component/img/etud.png';
import bloque from '../component/img/bloquer.png';
import utilisateur from '../component/img/utilisateur.png';
import maison from '../component/img/maison.png';

const NavbarProf= () => {
  return (
      <header className={styles.header}>
      <img src={Image1} alt='' className={styles.logo}></img>
      <ul className={styles.navlist}>
        
        <li className={styles.navitem} >
          <Link to="/etudiant" className={styles.link}>
            <img src={maison} alt="Acceuil" className={styles.icon} />
            <p className={styles.picon}>Acceuil</p>
          </Link>
        </li>
        
         
        <li className={styles.navitem}>
          <Link to="/acceuil" className={styles.link}>
            <img src={bloque} alt="Log Out" className={styles.icon} />
            <p className={styles.picon}>Deconnexion</p>
          </Link>
        </li>
      </ul>

  </header>
     
  );
}

export default NavbarProf;

