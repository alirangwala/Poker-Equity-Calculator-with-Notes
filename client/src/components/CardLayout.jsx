import React, { useState, useEffect } from 'react';
import SoloCard from './SoloCard.jsx'
const CardLayout = ({ clickCard }) => {

  return (
    <div >
      <ul className="cards">
        <SoloCard
          clickCard={clickCard}
          value='As'
          cssClass="ace card"
          label="🂡"
        />
        <SoloCard
          clickCard={clickCard}
          value='Ks'
          cssClass="king card"
          label="🂮"
        />
        <SoloCard
          clickCard={clickCard}
          value='Qs'
          cssClass="queen card"
          label="🂭"
        />
        <SoloCard
          clickCard={clickCard}
          value='Js'
          cssClass="jack card"
          label="🂫"
        />
        <SoloCard
          clickCard={clickCard}
          value='Ts'
          cssClass="ten card"
          label="🂪"
        />
        <SoloCard
          clickCard={clickCard}
          value='9s'
          cssClass="nine card"
          label="🂩"
        />
        <SoloCard
          clickCard={clickCard}
          value='8s'
          cssClass="eight card"
          label="🂨"
        />
        <SoloCard
          clickCard={clickCard}
          value='7s'
          cssClass="seven card"
          label="🂧"
        />
        <SoloCard
          clickCard={clickCard}
          value='6s'
          cssClass="six card"
          label="🂦"
        />
        <SoloCard
          clickCard={clickCard}
          value='5s'
          cssClass="five card"
          label="🂥"
        />
        <SoloCard
          clickCard={clickCard}
          value='4s'
          cssClass="four card"
          label="🂤"
        />
        <SoloCard
          clickCard={clickCard}
          value='3s'
          cssClass="three card"
          label="🂣"
        />
        <SoloCard
          clickCard={clickCard}
          value='2s'
          cssClass="two card"
          label="🂢"
        />
      </ul>
      <ul className="cards">
        <SoloCard
          clickCard={clickCard}
          value='Ah'
          cssClass="ace hearts card"
          label="🂱"
        />
        <SoloCard
          clickCard={clickCard}
          value='Kh'
          cssClass="king hearts card"
          label="🂾"
        />
        <SoloCard
          clickCard={clickCard}
          value='Qh'
          cssClass="queen hearts card"
          label="🂽"
        />
        <SoloCard
          clickCard={clickCard}
          value='Jh'
          cssClass="jack hearts card"
          label="🂻"
        />
        <SoloCard
          clickCard={clickCard}
          value='Th'
          cssClass="ten hearts card"
          label="🂺"
        />
        <SoloCard
          clickCard={clickCard}
          value='9h'
          cssClass="nine hearts card"
          label="🂹"
        />
        <SoloCard
          clickCard={clickCard}
          value='8h'
          cssClass="eight hearts card"
          label="🂸"
        />
        <SoloCard
          clickCard={clickCard}
          value='7h'
          cssClass="seven hearts card"
          label="🂷"
        />
        <SoloCard
          clickCard={clickCard}
          value='6h'
          cssClass="six hearts card"
          label="🂶"
        />
        <SoloCard
          clickCard={clickCard}
          value='5h'
          cssClass="five hearts card"
          label="🂵"
        />
        <SoloCard
          clickCard={clickCard}
          value='4h'
          cssClass="four hearts card"
          label="🂴"
        />
        <SoloCard
          clickCard={clickCard}
          value='3h'
          cssClass="three hearts card"
          label="🂳"
        />
        <SoloCard
          clickCard={clickCard}
          value='2h'
          cssClass="two hearts card"
          label="🂲"
        />
      </ul>
      <ul className="cards">
        <SoloCard
          clickCard={clickCard}
          value='Ad'
          cssClass="ace diamonds card"
          label="🃁"
        />
        <SoloCard
          clickCard={clickCard}
          value='Kd'
          cssClass="king diamonds card"
          label="🃎"
        />
        <SoloCard
          clickCard={clickCard}
          value='Qd'
          cssClass="queen diamonds card"
          label="🃍"
        />
        <SoloCard
          clickCard={clickCard}
          value='Jd'
          cssClass="jack diamonds card"
          label="🃋"
        />
        <SoloCard
          clickCard={clickCard}
          value='Td'
          cssClass="ten diamonds card"
          label="🃊"
        />
        <SoloCard
          clickCard={clickCard}
          value='9d'
          cssClass="nine diamonds card"
          label="🃉"
        />
        <SoloCard
          clickCard={clickCard}
          value='8d'
          cssClass="eight diamonds card"
          label="🃉"
        />
        <SoloCard
          clickCard={clickCard}
          value='7d'
          cssClass="seven diamonds card"
          label="🃇"
        />
        <SoloCard
          clickCard={clickCard}
          value='6d'
          cssClass="six diamonds card"
          label="🃆"
        />
        <SoloCard
          clickCard={clickCard}
          value='5d'
          cssClass="five diamonds card"
          label="🃅"
        />
        <SoloCard
          clickCard={clickCard}
          value='4d'
          cssClass="four diamonds card"
          label="🃄"
        />
        <SoloCard
          clickCard={clickCard}
          value='3d'
          cssClass="three diamonds card"
          label="🃃"
        />
        <SoloCard
          clickCard={clickCard}
          value='2d'
          cssClass="two diamonds card"
          label="🃂"
        />
      </ul>
      <ul className="cards">
        <SoloCard
          clickCard={clickCard}
          value='Ac'
          cssClass="ace card"
          label="🃑"
        />
        <SoloCard
          clickCard={clickCard}
          value='Kc'
          cssClass="king card"
          label="🃞"
        />
        <SoloCard
          clickCard={clickCard}
          value='Qc'
          cssClass="queen card"
          label="🃝"
        />
        <SoloCard
          clickCard={clickCard}
          value='Jc'
          cssClass="jack card"
          label="🃛"
        />
        <SoloCard
          clickCard={clickCard}
          value='Tc'
          cssClass="ten card"
          label="🃚"
        />
        <SoloCard
          clickCard={clickCard}
          value='9c'
          cssClass="nine card"
          label="🃙"
        />
        <SoloCard
          clickCard={clickCard}
          value='8c'
          cssClass="eight card"
          label="🃘"
        />
        <SoloCard
          clickCard={clickCard}
          value='7c'
          cssClass="seven card"
          label="🃗"
        />
        <SoloCard
          clickCard={clickCard}
          value='6c'
          cssClass="six card"
          label="🃖"
        />
        <SoloCard
          clickCard={clickCard}
          value='5c'
          cssClass="five card"
          label="🃕"
        />
        <SoloCard
          clickCard={clickCard}
          value='4c'
          cssClass="four card"
          label="🃔"
        />
        <SoloCard
          clickCard={clickCard}
          value='3c'
          cssClass="three card"
          label="🃓"
        />
        <SoloCard
          clickCard={clickCard}
          value='2c'
          cssClass="two card"
          label="🃒"
        />
      </ul>
    </div>
  );
}

export default CardLayout;