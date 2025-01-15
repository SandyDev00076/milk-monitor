import InfoIcon from "../assets/info.svg";

export default function Tip() {
  return (
    <section className=" bg-gray-50 px-8 py-4 rounded-none lg:rounded-xl text-sm text-gray-600 flex items-center gap-4 mb-6">
      <img width={50} height={50} src={InfoIcon} alt="a tip for the user" />
      Add daily collections of milk readings, each showing total milk consumed.
    </section>
  );
}
