import { TaskStatus } from "../../core/entities/Task";
import ButtonFilter from "./ButtonFilter";

interface ListButtonsFilterProps {
  filter: TaskStatus;
  setFilter: (filter: TaskStatus) => void;
  listSizePending?: number;
}

const ListButtonsFilter: React.FC<ListButtonsFilterProps> = ({
  filter,
  setFilter,
  listSizePending,
}) => {
  const buttons = [
    { title: "Pendentes", filterKey: TaskStatus.OPEN },
    { title: "Fazendo", filterKey: TaskStatus.IN_PROGRESS },
    { title: "Concluídas", filterKey: TaskStatus.DONE },
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
            count={button.filterKey === TaskStatus.OPEN ? listSizePending : 0}
            onClick={() => setFilter(button.filterKey)}
            isActive={filter === button.filterKey}
          />
        </div>
      ))}
    </div>
  );
};

export default ListButtonsFilter;
