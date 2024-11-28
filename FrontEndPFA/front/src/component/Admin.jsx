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
        axios.get("http://localhost:8090/getNumberOfEtudiants"),
        axios.get("http://localhost:8090/getNumberOfEmployeur"),
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
    <div className="donut">
      <div>
        <Chart
          options={options}
          series={chartData.series}
          type="donut"
          width="380"
        />
      </div>
      <div>
        <Link to="/Utilisateur">
          <button type="button">Utilisateur</button>
        </Link>
        <Link to="/Catégorie">
          <button type="button">Catégorie</button>
        </Link>
      </div>
    </div>
  );
};

export default Donut;
