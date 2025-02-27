import React from "react";

interface ButtonFilterProps {
  title: string;
  count?: number;
  onClick: () => void;
  isActive?: boolean;
}

const ButtonFilter: React.FC<ButtonFilterProps> = ({
  title,
  count,
  onClick,
  isActive,
}) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={onClick}
        style={{
          width: "100%",
          height: "100%",
          padding: "15px ",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "50px",
          border: "none",
          backgroundColor: isActive ? "#0051E0" : "#D0DFFF",
          color: isActive ? "white" : "#0051E0",
          cursor: "pointer",
        }}
      >
        {title}
      </button>
      {count! > 0 && title === "Pendentes" && (
        <span
          style={{
            position: "absolute",
            top: "-3px",
            right: "5px",
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            width: "18px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontWeight: "bold",
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
};

export default ButtonFilter;
