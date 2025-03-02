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
        padding: "1px",
        height: "150px",
        width: "100%",
        backgroundImage: isOver
          ? "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)"
          : "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
        textAlign: "center",
        borderRadius: "20px",
        boxShadow: "5px 5px 10px rgba(0,0,0,0.2)",
        transition: "transform 0.2s ease",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <Typography
        sx={{
          fontFamily: "poppins",
          fontSize: "20px",
          p: "10%",
          fontWeight: 600,
          textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)",
        }}
      >
        {category.name}
      </Typography>
    </Paper>
  );
};

export default CategoryZone;
