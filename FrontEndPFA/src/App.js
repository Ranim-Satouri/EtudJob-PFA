import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Acceuil from "./component/acceuil";
import Login from "./component/login";
import Inscrit from "./component/inscrit";
import AjouterOffr from "./component/AjouterOffr";
import ModifierOffre from "./component/ModifierOffre";
import ModierProfil from "./component/ModierProfil";
import HomePage from "./component/home";
import Navbaretud from "./component/navbaretud";
import Navbaremp from "./component/navbaremp";
import Etudiant from "./component/etudiant";
import Employeur from "./component/employeur";
import Me from "./component/Me";
import Mesoffres from "./component/Mesoffres";
import Modifiermdp from "./component/Modifiermdp";
import Savepage from "./component/Savepage";
import Admin from "./component/Admin";
import Utilisateur from "./component/Utilisateur";
import Categorie from "./component/categorie";
import UtilisateursOffre from "./component/UtilisateursOffre.jsx";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/acceuil" element={<Acceuil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inscrit" element={<Inscrit />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/navbaretud" element={<Navbaretud />} />
          <Route path="/navbaremp" element={<Navbaremp />} />
          <Route path="/etudiant" element={<Etudiant />} />
          <Route path="/employeur" element={<Employeur />} />
          <Route path="/AjouterOffre" element={<AjouterOffr />} />
          <Route path="/ModifierOffre" element={<ModifierOffre />} />
          <Route path="/ModierProfil" element={<ModierProfil />} />
          <Route path="/Mesoffres" element={<Mesoffres />} />
          <Route path="/Modifiermdp" element={<Modifiermdp />} />
          <Route path="/Me" element={<Me />} />
          <Route path="/Savepage" element={<Savepage />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Utilisateur" element={<Utilisateur />} />
          <Route path="/Categorie" element={<Categorie />} />
          <Route path ="/UtilisateursOffre" element={<UtilisateursOffre/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
