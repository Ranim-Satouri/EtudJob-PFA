import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import hi from '../component/mp4/hi.gif';
import Styles from "./loading.module.css"; 
function Hi(){
    return(
        <div id={Styles.loading1}>
        <img src={hi} alt='' id={Styles.loading} />
      </div>
    )
}

export default Hi;