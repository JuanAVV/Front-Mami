import React, { useState, useEffect } from "react";
import { Button } from "antd";
import 'antd/dist/reset.css';
import { useNavigate, useLocation } from "react-router-dom"
import "../ceremonia.css";
import { LeftCircleOutlined } from '@ant-design/icons';

export default function Ceremonia() {
    const navigate = useNavigate();
    const location = useLocation();
    const { invitado } = location.state || {}

    useEffect(() => {
        if (invitado == null) {
            navigate("/linkInvalido");
        }
    }, [invitado, navigate]);

    return (
        <div className="ceremonia-fondo">
            <div className="titulo">
                <div className="encabezado">
                    <Button className="boton-regresar" onClick={() => navigate(`/invitacion?id=${invitado.idInvitado}`)}>
                        <LeftCircleOutlined />
                    </Button>
                    <h2 className="text">Ceremonía / Salón</h2>
                </div>
                
                <p className="text2">
                    <span className="salon">El Reflejo</span>
                    <span className="ceremonia1">Hora de</span>
                    <span className="ceremonia2">ceremonia:</span>
                    <span className="hora">06 : 45 pm</span>
                </p>

                <p className="boletoss">
                    <span className="bole">Boletos:</span>
                    {/* <br /> */}
                    {/* <span>Adultos: &nbsp; </span> */}
                    <span className="bole2">{invitado?.boletosAdultos}</span>
                    {/* <span>Niños: &nbsp;</span><span style={{ color: 'red' }}>{invitado?.boletosNiños}</span>
                 */}
                </p>
                <div className="ubicacion">
                    <span>Ubicación:</span>
                    <br />
                    <span>Carr. Federal México-Texcoco km. 49, Presidentes, 56370 Chicoloapan de Juárez, Méx.</span>
                    <br />
                    <a
                        href="https://maps.app.goo.gl/UScK7Pw6YSfQ1eJu8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-mapa">Cómo llegar</a>
                </div>

            </div>
        </div>

    )
}