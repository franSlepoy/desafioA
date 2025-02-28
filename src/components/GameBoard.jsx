import { useState, useEffect } from "react";
import { Container, Grid, Button, Typography, Box, Modal, Paper } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CardItem from "./CardItem";
import CategoryZone from "./CategoryZone";
import { categories } from "../data/categories";
import { terms as initialTerms } from "../data/terms";

const GameBoard = () => {
  const [terms, setTerms] = useState(initialTerms);
  const [score, setScore] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);

  // Mostrar el cartel después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDrop = (item, targetCategory) => {
    if (item.category === targetCategory) {
      setTerms((prev) => prev.filter((term) => term.id !== item.id));
      setScore((prev) => Math.min(10, prev + 1));
    } else {
      setScore((prev) => Math.max(0, prev - 1));
    }
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
      <Container sx={{ maxWidth: "100vw", height: "100vh", overflow: "hidden", padding: 2 }}>
        <Typography variant="h3" align="center" sx={{ marginBottom: 3 }}>
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
            <Typography variant="h5" align="center" gutterBottom>
              Bienvenid@
            </Typography>
            <Typography variant="body1" paragraph>
              Tu objetivo es arrastrar los términos a sus respectivas categorías. 
            </Typography>
            <Typography variant="body1" paragraph>
            Si arrastras la tarjeta a la categoría correcta, desaparece. Si la arrastras a una categoría incorrecta, vuelve a su lugar.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Puntaje:</strong> Cada acierto suma 1 y cada error resta 1.
            </Typography>
            <Typography variant="body2">
              ⭐ Si al finalizar el juego obtienes una estrella <strong>dorada (10)</strong>, estás completamente listo para el próximo nivel! 🚀
            </Typography>
            <Typography variant="body2">
              🥈 Si obtienes una estrella <strong>plateada (mayor a 6)</strong>, estas listo para el próximo nivel, pero te recomendamos repasar tus dudas para disfrutarlo al máximo! 🚀
            </Typography>
            <Typography variant="body2">
              🔴 Si obtienes una estrella <strong>roja (menor a 6)</strong>, te recomendamos repasar tus dudas y vuelver a intentarlo para mejorar tu puntaje y disfrutar del próximo nivel! 🚀
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ marginTop: 2 }}
              onClick={() => setShowWelcome(false)}
            >
              ¡Empezar!
            </Button>
          </Box>
        </Modal>

        {/* Puntaje y reinicio */}
        <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item>
            <Box
              sx={{
                width: 60,
                height: 60,
                backgroundColor: getStarColor(),
                clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
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
            <Button variant="contained" color="primary" onClick={resetGame}>
              Reiniciar Juego
            </Button>
          </Grid>
        </Grid>

        {/* Zona de términos */}
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2, height: "55vh", overflow: "auto" }}>
          {terms.map((term) => (
            <CardItem key={term.id} term={term} />
          ))}
        </Box>

        {/* Categorías */}
        <Grid container spacing={8} sx={{ marginTop: 0 }}>
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
