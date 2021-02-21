import React, { Component } from 'react';
import './impressum.scss';

export default class Impressum extends Component {

    render() {
        return (
            <div id="containerImpressum" className="container-fluid hidden">
                <h2>Impressum</h2>
                <p >Informationspflicht laut §5
                E-Commerce Gesetz, §14 Unternehmensgesetzbuch, §63
                Gewerbeordnung und Offenlegungspflicht laut §25
                Mediengesetz.</p>
                <p>Nikolai Riedel</p>
                <p>Christies gate 36C, <br />0557
                Oslo, <br />Norwegen</p>
                <p>
                <strong>E-Mail:</strong> <a href="mailto:nikolai.riedel@gmail.com">nikolai.riedel@gmail.com</a>
                </p>
                <p style={{marginTop: '15px'}}>Quelle: Erstellt mit dem <a title="Impressum Generator von firmenwebseiten.at" href="https://www.firmenwebseiten.at/impressum-generator/" target="_blank" rel="noreferrer"  style={{textDecoration: 'none'}}>Impressum Generator
                    von firmenwebseiten.at</a> in Kooperation mit <a href="https://www.servusmode.at" target="_blank" rel="noreferrer"  title style={{textDecoration: 'none'}}>servusmode.at</a>
                </p>
                <h3 className>EU-Streitschlichtung</h3>
                <p>Gemäß Verordnung über Online-Streitbeilegung in
                Verbraucherangelegenheiten (ODR-Verordnung) möchten wir
                Sie über die Online-Streitbeilegungsplattform
                (OS-Plattform) informieren.<br />
                Verbraucher haben die Möglichkeit, Beschwerden an die
                Online Streitbeilegungsplattform der Europäischen
                Kommission unter <a className href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=DE" target="_blank" rel="noreferrer" >http://ec.europa.eu/odr?tid=221085760</a>
                zu richten. Die dafür notwendigen Kontaktdaten finden
                Sie oberhalb in unserem Impressum.</p>
                <p>Wir möchten Sie jedoch darauf hinweisen, dass wir nicht
                bereit oder verpflichtet sind, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.</p>
                <h3 className>Haftung für Inhalte dieser
                Webseite</h3>
                <p>Wir entwickeln die Inhalte dieser Webseite ständig weiter
                und bemühen uns korrekte und aktuelle Informationen
                bereitzustellen. Leider können wir keine Haftung für die
                Korrektheit aller Inhalte auf dieser Webseite
                übernehmen, speziell für jene die seitens Dritter
                bereitgestellt wurden.</p>
                <p>Sollten Ihnen problematische oder rechtswidrige Inhalte
                auffallen, bitten wir Sie uns umgehend zu kontaktieren,
                Sie finden die Kontaktdaten im Impressum.</p>
                <h3 className>Haftung für Links auf dieser
                Webseite</h3>
                <p>Unsere Webseite enthält Links zu anderen Webseiten für
                deren Inhalt wir nicht verantwortlich sind. Haftung für
                verlinkte Websites besteht laut <a className href="https://www.ris.bka.gv.at/Dokument.wxe?Abfrage=Bundesnormen&Dokumentnummer=NOR40025813&tid=221085760" target="_blank" rel="noreferrer">§ 17 ECG</a> für uns nicht, da wir
                keine Kenntnis rechtswidriger Tätigkeiten hatten und
                haben, uns solche Rechtswidrigkeiten auch bisher nicht
                aufgefallen sind und wir Links sofort entfernen würden,
                wenn uns Rechtswidrigkeiten bekannt werden.</p>
                <p>Wenn Ihnen rechtswidrige Links auf unserer Website
                auffallen, bitten wir Sie uns zu kontaktieren, Sie
                finden die Kontaktdaten im Impressum.</p>
                <h3 className>Urheberrechtshinweis</h3>
                <p>Alle Inhalte dieser Webseite (Bilder, Fotos, Texte,
                Videos) unterliegen dem Urheberrecht. Falls notwendig,
                werden wir die unerlaubte Nutzung von Teilen der Inhalte
                unserer Seite rechtlich verfolgen.</p>
                <h3 className>Bildernachweis</h3>
                <p>Die Bilder, Fotos und Grafiken auf dieser Webseite sind
                urheberrechtlich geschützt.</p>
                <p>Die Bilderrechte liegen, falls nicht anders vermerkt, bei
                den folgenden Fotografen und
                Unternehmen:</p>
                <ul className>
                <li className>Nikolai Riedel</li>
                </ul>
                <p style={{marginTop: '15px'}}>Quelle: Erstellt mit dem <a title="Datenschutz Generator von firmenwebseiten.at" href="https://www.firmenwebseiten.at/datenschutz-generator/" target="_blank" rel="noreferrer"  style={{textDecoration: 'none'}}>Datenschutz Generator
                    von firmenwebseiten.at</a> in Kooperation mit <a href="https://www.elektroautos.co.at" target="_blank" rel="noreferrer"  title style={{textDecoration: 'none'}}>elektroautos.co.at</a>
                </p>
            </div>
        );
    }
}