import React, { Component } from 'react'

import styles from 'styles/contrats.styl'

const PreciousObjects = function () {
  return <div>
    <h2>Objets précieux</h2>

    <p>
    La MAIF ou Filia-MAIF vous demande de déclarer si vous possédez des objets précieux d'une valeur dépassant un certain seuil, pour vous assurer la protection la plus large en cas de sinistre. Ce guide vous aide à identifier vos objets précieux et à estimer leur valeur.

    <h3>Concrètement, que considérer comme précieux ?</h3>

    Entrent dans l’inventaire des objets précieux :
    <ul>
      <li>Les bijoux et objets en métal précieux</li>
      <li>Les pierres précieuses et perles</li>
      <li>Les bijoux et montres de marque</li>
      <li>Les peintures, dessins, sculptures et photographies</li>
      <li>Les tapis, les tapisseries faits main</li>
      <li>Les objets d'art</li>
      <li>Les collections</li>
      <li>Les meubles d'art et de décoration</li>
      <li>Les instruments de musique de valeur</li>
    </ul>

    <h3>Comment puis-je évaluer mes objets précieux ?</h3>

    <ul>
      <li>Tous les objets précieux doivent être évalués sur la base de leur valeur marchande, y compris les bijoux et les objets en argent massif.</li>
      <li>La valeur marchande (ou valeur vénale) est le prix qu'il en coûterait pour les remplacer au jour de l’évaluation (prix pratiqué pour des objets équivalents, dans un état semblable sur le marché de la revente : ventes publiques, antiquaires, brocanteurs...).</li>
    </ul>

    Quel document fournir pour l’indemnisation ?

    Objet précieux hérité ou reçu en don : une photo pourra fournir la
    </p>
  </div>
}

const HelpTooltip = function () {
  return <span>?</span>
}

class Contrats extends Component {
  render () {
    return <div className={ styles.contrats }>
      <h2>Contrats</h2>
      <div className={ styles.contrat }>
        <dl>
          <dt>
            Type
          </dt>
          <dd>
            2 pièces
          </dd>

          <dt>
            Statut
          </dt>
          <dd>
            Locataire
          </dd>

          <dt>
            Garantie
          </dt>
          <dd>
            Bien mobiliés estimés entre <strong>3501€</strong> et <strong>6800€</strong> dont moins de 6000€ d'objets précieux
            <HelpTooltip modal={ <PreciousObjects /> }/>
          </dd>

          <dt>
            Formule
          </dt>
          <dd>
            RAQVM Arbitrage
          </dd>

          <dt>
            Date de souscription
          </dt>
          <dd>
            18/05/2013
          </dd>

          <dt>
            Cotisation
          </dt>
          <dd>
            <strong>346.91€</strong>
          </dd>
        </dl>
      </div>

    </div>
  }
}

export default Contrats
