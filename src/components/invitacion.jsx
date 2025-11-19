import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import "../invitacion.css";
import 'antd/dist/reset.css';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { obtieneInvitado } from "../utils/functions/functions.js";
import axios from "axios";
import Confirmacion from "../assets/img/confirmacion.svg"
import Carita from "../assets/img/carita.svg"

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Invitacion() {
  const query = useQuery();
  const id = query.get('id');
  const navigate = useNavigate();

  const [invitado, setInvitado] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isModalConfirmado, setIsModalConfirmado] = useState(false);
  const [mensaje, setMensaje] = useState('Muchas gracias por confirmar tu asistencia');
  const [modalNoAsistir, setModalNoAsistir] = useState(false);
  
  const whatsMami = "525580220719";
  const mensajeWhats = `Hola, soy ${invitado?.nombre || "invitado"}. Quiero confirmar que asistiré a la fiesta de los 80 años de Esther. ¡Muchas gracias por la invitación, nos vemos pronto!`


  useEffect(() => {
    if (!id) {
      navigate("/linkInvalido");
      return;
    }

    axios.get(`https://boda-back-jfmt.onrender.com/api/invitadosMami/${id}`)
      .then(res => {
        if (!res.data) {
          // Si la respuesta es null o vacía
          navigate("/linkInvalido");
        } else {
          setInvitado(res.data);
        }
      })
      .catch(err => {
        console.error(err);
        navigate("/linkInvalido");
      })
      .finally(() => setLoading(false));

  }, [id, navigate]);


    useEffect(() => {
        if (isModalConfirmado || modalNoAsistir) {
            const timer = setTimeout(() => {
                setIsModalConfirmado(false);
                setModalNoAsistir(false);
                //navigate(`/invitacion?id=${invitado.idInvitado}`);
            }, 10000); // se cierra en 2 segundos
            return () => clearTimeout(timer);
        }
    }, [isModalConfirmado, modalNoAsistir]);

    const guardarAsistencia = async (asistira) => {
  try {
    await axios.put(
      `https://boda-back-jfmt.onrender.com/api/invitadosMami/${invitado.idInvitado}/asistencia`,
      null,
      { params: { asistira } }
    );
    if(asistira){
            mandarWhats();
            setIsModalConfirmado(true)
        }else{
       setModalNoAsistir(true);}
    console.log("✅ Asistencia actualizada:", asistira);
  } catch (err) {
    console.error("❌ Error al actualizar asistencia:", err);
  }
};

    const mandarWhats = () => {
        const  url = `https://wa.me/${whatsMami}?text=${encodeURIComponent(mensajeWhats)}`;
        window.open(url, "blank");
    }

  return (
    <div className="invitacion-fondo">
      <div className="invitacion-contenido">

        {/* Nombres */}
        <div className="nombres">
          <h2 className="nombre">Esther</h2>
        </div>

        {/* Texto de invitación */}
        <p className="mensaje">
          Celebremos juntos ocho décadas <br /> de una vida plena y maravillosa.
        </p>

        {/* Fecha */}
        <p className="fecha">
          <span className="dia">16</span>
          <span className="mes" >diciembre</span>
          <span className="anio">2025</span>
        </p>

        {/* Botones de Ceremonia y Salón */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-10px"
        }}>
          <Button className="inv-ceremony" onClickCapture={() => navigate("/Ceremonia", { state: { invitado } })}>
            Ceremonia / Salón
          </Button>
        </div>

        <div className="botones-asistir">
          <Button className="inv-ceremony" onClick={() => guardarAsistencia(1)}>
            Asistiré
          </Button>
          <Button className="inv-ceremony" onClick={() => guardarAsistencia(0)}>
            No Asistiré
          </Button>
        </div>
      </div>

      <Modal
                open={isModalConfirmado}
                footer={null}
                closable={false}
                centered
                className="modal-brillante"
            >
                <div className="titulo-modal">
                    <img src={Confirmacion} alt="confir" style={{ scale: '1.5', marginTop: '20px', marginBottom: '20px' }} />
                </div>
                <div className="titulo-modal">
                    <span>¡Gracias!</span>
                </div>
                <div className="modal-confirmado">
                    <span>{mensaje}</span>
                </div>
            </Modal>

            <Modal
                open={modalNoAsistir}
                footer={null}
                closable={false}
                centered
                className="modal-brillante"
            >
                <div className="titulo-modal">
                    <img src={Carita} alt="confir" style={{ scale: '1.5', marginTop: '20px', marginBottom: '20px' }} />
                </div>
                <div className="titulo-modal">
                    <span>Lamentamos que no puedas acompañarnos</span>
                </div>
                <div className="modal-confirmado">
                    <span>¡Gracias por avisarnos!</span>
                </div>
            </Modal>

    </div>
  );
}
