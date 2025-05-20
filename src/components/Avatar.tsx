export default function Avatar({
  avatar,
  selectedColor,
}: {
  avatar: string;
  selectedColor: string;
}) {
  return (
    <div>
      <div
        className="h-10 w-10 rounded-full"
        style={{
          backgroundColor: selectedColor,
        }}
      >
        <img src={avatar} alt="" className="w-full h-full" />
      </div>
    </div>
  );
}
