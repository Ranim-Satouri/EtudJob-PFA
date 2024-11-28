import page from "./Admin.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";

const Donut = () => {
  const [chartData, setChartData] = useState({ series: [], labels: [] });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .all([
        axios.get("http://localhost:8091/getNumberOfEtudiants"),
        axios.get("http://localhost:8091/getNumberOfEmployeur"),
      ])
      .then(
        axios.spread((res1, res2) => {
          const seriesData = [res1.data, res2.data];
          const labelsData = ["Étudiants", "Employeurs"];
          setChartData({ series: seriesData, labels: labelsData });
        })
      )
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const options = {
    labels: chartData.labels,
  };

  return (
    <div className={page.adminbody}>
      <div className={page.donutWrapper}>
      <div className={page.donut}>
        <Chart
          options={options}
          series={chartData.series}
          type="donut"
          width={500} // Adjust width as needed
          height={500} 
          
        
        />
      </div>
      <figcaption className={page.donutLabel}>Graphique des étudiants et des employeurs</figcaption>
      <div className={page.buttons}>
      <div className={page.buttonGroup}>
        <Link to="/Utilisateur">
          <button type="button" className={page.butUser}>Utilisateur</button>
        </Link>
        <Link to="/categorie">
          <button type="button"  className={page.butCat}>Catégorie</button>
        </Link>
      </div>
    </div>
  </div>
</div>

  );
};

export default Donut;
