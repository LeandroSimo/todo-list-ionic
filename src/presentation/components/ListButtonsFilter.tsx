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
    <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
      {buttons.map((button) => (
        <ButtonFilter
          key={button.filterKey}
          title={button.title}
          count={button.filterKey === "pendentes" ? listSizePending : 0}
          onClick={() => setFilter(button.filterKey)}
          isActive={filter === button.filterKey}
        />
      ))}
    </div>
  );
};

export default ListButtonsFilter;
