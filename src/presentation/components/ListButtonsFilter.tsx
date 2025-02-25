import ButtonFilter from "./ButtonFilter";

interface ListButtonsFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
  listSizePending?: number;
}

const ListButtonsFilter: React.FC<ListButtonsFilterProps> = ({
  filter,
  setFilter,
  listSizePending,
}) => {
  const buttons = [
    { title: "Pendentes", filterKey: "pendentes" },
    { title: "Fazendo", filterKey: "fazendo" },
    { title: "Concluídas", filterKey: "concluidas" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {buttons.map((button) => (
        <div
          key={button.filterKey}
          style={{
            display: "flex",
            alignItems: "stretch",
            minWidth: "100px",
            maxWidth: "200px",
          }}
        >
          <ButtonFilter
            title={button.title}
            count={button.filterKey === "pendentes" ? listSizePending : 0}
            onClick={() => setFilter(button.filterKey)}
            isActive={filter === button.filterKey}
          />
        </div>
      ))}
    </div>
  );
};

export default ListButtonsFilter;
