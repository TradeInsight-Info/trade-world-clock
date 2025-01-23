const TwoLines = ({ line1, line2 }: { line1: string; line2: string }) => {
  return (
    <div>
      <p className={"text-xl my-2 font-medium"}>{line1}</p>
      <p>{line2}</p>
    </div>
  );
};

export default TwoLines;
