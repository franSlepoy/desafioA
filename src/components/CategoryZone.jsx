import { useDrop } from "react-dnd";
import { Paper, Typography } from "@mui/material";

const CategoryZone = ({ category, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TERM",
    drop: (item) => onDrop(item, category.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Paper
      ref={drop}
      sx={{
        padding: "20px",
        height: "500px",
        width: "100%",
        backgroundColor: isOver ? "#cce5ff" : "#f5f5f5",
        textAlign: "center",
        fontSize: "1.2rem",
      }}
    >
      <Typography variant="h6">{category.name}</Typography>
    </Paper>
  );
};

export default CategoryZone;
