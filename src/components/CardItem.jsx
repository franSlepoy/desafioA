import { useDrag } from "react-dnd";
import { Paper, Typography } from "@mui/material";

const CardItem = ({ term }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TERM",
    item: { id: term.id, category: term.category },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Paper
      ref={drag}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        padding: "12px 18px",
        height:"80px",
       
        borderRadius: "20px",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        cursor: "grab",
        fontSize: "1rem",
        boxShadow: "5px 5px 10px rgba(0,0,0,0.2)",
        transition: "transform 0.2s ease",
        "&:hover": { transform: "scale(1.05)" },
      
      }}
    >
      <Typography fontFamily={"Poppins"} pt={"10%"} width={"200px"} sx={{fontWeight:500, textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)" }} variant="body1">{term.text}</Typography>
    </Paper>
  );
};

export default CardItem;
