import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Button,
  Typography,
  Box,
  Modal,
  Paper,
} from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CardItem from "./CardItem";
import CategoryZone from "./CategoryZone";
import { categories } from "../data/categories";
import { terms as initialTerms } from "../data/terms";
import confetti from "canvas-confetti";

const correctSound = new Audio("/sounds/correct.mp3");
const wrongSound = new Audio("/sounds/wrong.mp3");
const applauseSound = new Audio("/sounds/applause.mp3");

const GameBoard = () => {
  const [terms, setTerms] = useState(initialTerms);
  const [score, setScore] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);

 
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDrop = (item, targetCategory) => {
    if (item.category === targetCategory) {
      correctSound.play();
      setTerms((prev) => prev.filter((term) => term.id !== item.id));
      setScore((prev) => {
        const newScore = Math.min(10, prev + 1);
        if (newScore === 10) {
          triggerCelebration(); // 🎉 Activar confeti y aplausos
        }
        return newScore;
      });
    } else {
      wrongSound.play();
      setScore((prev) => Math.max(0, prev - 1));
    }
  };

  const triggerCelebration = () => {
    applauseSound.play(); // 🔊 Reproducir aplausos

    confetti({
      particleCount: 250,
      spread: 220,
      origin: { y: 0.6 }, 
      ticks: 200,
    });
  };

  const resetGame = () => {
    setTerms(initialTerms);
    setScore(0);
  };

  const getStarColor = () => {
    if (score === 10) return "gold";
    if (score > 6) return "silver";
    return "red";
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container
        sx={{
          maxWidth: "100vw",
          height: "100vh",
          overflow: "hidden",
          padding: 2,
        }}
      >
        <Typography
          fontFamily={"poppins"}
          variant="h3"
          align="center"
          sx={{ marginBottom: 3 }}
        >
          Clasificación de Conceptos
        </Typography>

        {/* Cartel de Bienvenida */}
        <Modal open={showWelcome} onClose={() => setShowWelcome(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 3,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              fontFamily={"poppins"}
              variant="h5"
              align="center"
              gutterBottom
            >
              Bienvenid@
            </Typography>
            <Typography fontFamily={"poppins"} variant="body1" paragraph>
              Tu objetivo es arrastrar los términos (tarjetas en el centro de la
              pantalla) a sus respectivas categorías (las 4 tajetas que estan en el
              borde inferior).
            </Typography>

            <Typography fontFamily={"poppins"} variant="body2" paragraph>
              <strong>Puntaje:</strong> Cada acierto suma 1 y cada error resta
              1.
            </Typography>
            <Typography mt={1} fontFamily={"poppins"} variant="body2">
              ⭐ Si al finalizar el juego obtienes una estrella{" "}
              <strong>dorada (10)</strong>, estás completamente listo para el
              próximo nivel y obtendras aplausos y confeti! 🚀
            </Typography>
            <Typography mt={1} fontFamily={"poppins"} variant="body2">
              🥈 Si obtienes una estrella <strong>plateada (mayor a 6)</strong>,
              estas listo para el próximo nivel, pero te recomendamos repasar
              tus dudas para disfrutarlo al máximo! 🚀
            </Typography>
            <Typography mt={1} fontFamily={"poppins"} variant="body2" pb={2}>
              🔴 Si obtienes una estrella <strong>roja (menor a 6)</strong>, te
              recomendamos repasar tus dudas y vuelver a intentarlo para mejorar
              tu puntaje y disfrutar del próximo nivel! 🚀
            </Typography>
            <Button
              onClick={() => setShowWelcome(false)}
              sx={{
                display: "block",
                margin: "auto",
                background: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
                color: "white",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "30px",
                boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #27ae60 0%, #219150 100%)",
                  transform: "scale(1.05)",
                },
              }}
            >
              ¡Empezar!
            </Button>
          </Box>
        </Modal>

        {/* Puntaje y reinicio */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ marginBottom: 3 }}
        >
          <Grid Item>
            <Typography fontFamily={"poppins"} mt={1} variant="h5">
              Puntaje:
            </Typography>
          </Grid>
          <Grid item>
            <Box
              fontFamily={"poppins"}
              sx={{
                width: 60,
                height: 60,
                backgroundColor: getStarColor(),
                clipPath:
                  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              {score}
            </Box>
          </Grid>
          <Grid item>
            <Button
              sx={{
                ml: 5,
                background: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
                color: "white",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "30px",
                boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #27ae60 0%, #219150 100%)",
                  transform: "scale(1.05)",
                },
              }}
              variant="contained"
              color="primary"
              onClick={resetGame}
            >
              <Typography fontFamily={"poppins"}>Reiniciar Juego</Typography>
            </Button>
          </Grid>
        </Grid>

        {/* Zona de términos */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            height: "45vh",
            p: 2,
            gap: 2,
            overflow: "auto",
          }}
        >
          {terms.map((term) => (
            <CardItem key={term.id} term={term} />
          ))}
        </Box>

        {/* Categorías */}
        <Grid container spacing={8} mt={1}>
          {categories.map((category) => (
            <Grid item xs={3} key={category.id}>
              <CategoryZone category={category} onDrop={handleDrop} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </DndProvider>
  );
};

export default GameBoard;
