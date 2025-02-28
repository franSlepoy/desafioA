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
        padding: "8px 16px",
        borderRadius: "16px",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        cursor: "grab",
        fontSize: "1rem",
      
      }}
    >
      <Typography variant="body1">{term.text}</Typography>
    </Paper>
  );
};

export default CardItem;
