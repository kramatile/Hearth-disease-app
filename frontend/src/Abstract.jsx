import React from "react";
import "./Abstract.css";
function Abstract() {
  return (
    <div className="abstract">
      <h2>Abstract</h2>
      <p>
        Ce projet vise à développer un système de prédiction des{" "}
        <span style={{ color: "green" }}> maladies cardiovasculaires</span>, en
        utilisant <span> Flask</span> pour le backend et <span>ReactJS </span>{" "}
        pour le frontend. L'objectif est de permettre une évaluation précise du
        risque de maladie cardiovasculaire en fonction de caractéristiques
        individuelles. Nous avons étudié et analysé le jeu de données extrait de
        la platforme <span style={{ color: "green" }}>kaggle </span>dans un
        <span> notebook Jupyter </span> pour comprendre les variables clés et
        établir des corrélations pertinentes. Ensuite, les modèles prédictifs
        ont été intégrés dans l’application Flask pour offrir des prédictions en
        temps réel à travers une interface utilisateur réactive développée en
        ReactJS. Ce système pourrait servir d’outil d’aide à la décision pour
        les professionnels de santé, en facilitant l’identification précoce des
        patients à haut risque et en améliorant ainsi la prévention des maladies
        cardiovasculaires.
      </p>
    </div>
  );
}

export default Abstract;
