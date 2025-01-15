import EmptyIcon from "../assets/empty.svg";

export default function EmptyUI() {
  return (
    <section className=" flex flex-col gap-4 items-center p-12">
      <img src={EmptyIcon} alt="empty icon" width={50} height={50} />
      <span className="text-gray-300">Waiting for you to add something.</span>
    </section>
  );
}
