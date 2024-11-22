interface Props {
  children: string;
  color?: "primary" | "secondary" | "danger"; // ?: for optional Parameter
  onClick: () => void;
}

const Button = ({ children, color = "primary", onClick }: Props) => {
  return (
    <div>
      <button className={"btn btn-" + color} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
